import glob
import os
import uuid

import chromadb
from dotenv import load_dotenv
from openai import OpenAI
from pypdf import PdfReader
import tiktoken


load_dotenv()

DATA_DIR = os.getenv("RAG_DATA_DIR", "./rag/data")
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./rag/chroma")
CHROMA_COLLECTION = os.getenv("CHROMA_COLLECTION", "morn-knowledge")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
EMBEDDING_MODEL = os.getenv("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small")
CHUNK_SIZE = int(os.getenv("RAG_CHUNK_SIZE", "800"))
CHUNK_OVERLAP = int(os.getenv("RAG_CHUNK_OVERLAP", "100"))
RESET_COLLECTION = os.getenv("RAG_RESET", "false").lower() == "true"


def load_documents():
    documents = []
    for path in glob.glob(os.path.join(DATA_DIR, "**/*"), recursive=True):
        if os.path.isdir(path):
            continue
        ext = os.path.splitext(path)[1].lower()
        if ext in [".md", ".txt"]:
            with open(path, "r", encoding="utf-8") as file:
                documents.append(
                    {
                        "text": file.read(),
                        "source": os.path.relpath(path, DATA_DIR),
                        "page": None,
                    }
                )
        elif ext == ".pdf":
            reader = PdfReader(path)
            for index, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                if text.strip():
                    documents.append(
                        {
                            "text": text,
                            "source": os.path.relpath(path, DATA_DIR),
                            "page": index + 1,
                        }
                    )
    return documents


def chunk_text(text, encoder):
    tokens = encoder.encode(text)
    step = max(CHUNK_SIZE - CHUNK_OVERLAP, 1)
    for start in range(0, len(tokens), step):
        chunk_tokens = tokens[start : start + CHUNK_SIZE]
        if not chunk_tokens:
            continue
        yield encoder.decode(chunk_tokens)


def embed_texts(client, texts):
    embeddings = []
    batch_size = 64
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        response = client.embeddings.create(model=EMBEDDING_MODEL, input=batch)
        embeddings.extend([item.embedding for item in response.data])
    return embeddings


def main():
    if not OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY is required for embeddings.")

    raw_documents = load_documents()
    if not raw_documents:
        print("No documents found to ingest.")
        return

    encoder = tiktoken.get_encoding("cl100k_base")
    client = OpenAI(api_key=OPENAI_API_KEY)

    chroma_client = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR)
    if RESET_COLLECTION:
        try:
            chroma_client.delete_collection(CHROMA_COLLECTION)
        except Exception:
            pass
    collection = chroma_client.get_or_create_collection(name=CHROMA_COLLECTION)

    all_chunks = []
    all_metadatas = []
    for doc in raw_documents:
        for chunk in chunk_text(doc["text"], encoder):
            all_chunks.append(chunk)
            all_metadatas.append(
                {
                    "source": doc["source"],
                    "page": doc["page"],
                }
            )

    embeddings = embed_texts(client, all_chunks)
    ids = [str(uuid.uuid4()) for _ in all_chunks]
    collection.add(ids=ids, documents=all_chunks, embeddings=embeddings, metadatas=all_metadatas)

    print(f"Ingested {len(all_chunks)} chunks into {CHROMA_COLLECTION}.")


if __name__ == "__main__":
    main()

import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

const STATIC_ROOT_FILES = new Set([
  "404.html",
  "about.html",
  "blog.html",
  "certificates.css",
  "certificates.html",
  "chatbot.css",
  "chatbot.js",
  "index.html",
  "manifest.json",
  "mediaQueries.css",
  "Muntasir Al Mamun (2).pdf",
  "projects.html",
  "Resume_Muntasir_Al_Mamun.pdf",
  "robots.txt",
  "script.js",
  "skills.html",
  "sitemap.xml",
  "style.css",
  "tools.html",
  "translator.css",
  "translator.js",
]);

const STATIC_TOP_LEVEL_DIRS = new Set(["Images", "assets"]);

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

// Prevent Turbopack from treating the project root as a fully static build-time path.
function fromProjectRoot(...segments: string[]) {
  return path.join(/*turbopackIgnore: true*/ process.cwd(), ...segments);
}

function resolveStaticFile(slug: string[]) {
  let decodedSegments: string[];

  try {
    decodedSegments = slug.map((segment) => decodeURIComponent(segment));
  } catch {
    return null;
  }

  const relativePath = path.posix.normalize(decodedSegments.join("/"));

  if (
    !relativePath ||
    relativePath === "." ||
    path.posix.isAbsolute(relativePath) ||
    relativePath.startsWith("../")
  ) {
    return null;
  }

  const segments = relativePath.split("/");
  let resolvedPath: string | null = null;

  if (segments.length === 1) {
    if (STATIC_ROOT_FILES.has(segments[0])) {
      resolvedPath = fromProjectRoot(segments[0]);
    }
    else {
      const htmlFallback = `${segments[0]}.html`;

      if (STATIC_ROOT_FILES.has(htmlFallback)) {
        resolvedPath = fromProjectRoot(htmlFallback);
      }
    }
  }
  else if (STATIC_TOP_LEVEL_DIRS.has(segments[0])) {
    resolvedPath = fromProjectRoot(...segments);
  }

  if (!resolvedPath) {
    return null;
  }

  const projectRoot = fromProjectRoot();
  const normalizedRoot = `${projectRoot}${path.sep}`;
  const normalizedResolvedPath = path.resolve(resolvedPath);

  if (
    normalizedResolvedPath !== projectRoot &&
    !normalizedResolvedPath.startsWith(normalizedRoot)
  ) {
    return null;
  }

  return normalizedResolvedPath;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const filePath = resolveStaticFile(slug);

  if (!filePath) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = CONTENT_TYPES[extension];

  if (!contentType) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }

  try {
    const fileStats = await stat(filePath);

    if (!fileStats.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Length": String(fileBuffer.byteLength),
        "Content-Type": contentType,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

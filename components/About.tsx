"use client";

import { motion } from "framer-motion";

const summaryCards = [
  { label: "Education", value: "B.Eng. Computer Science", detail: "NJUPT | GPA 4.23/5.0" },
  {
    label: "Research Focus",
    value: "Blockchain & UAV Systems",
    detail: "Spectrum security and decentralized networking",
  },
  {
    label: "Leadership",
    value: "President, ISU at NJUPT",
    detail: "Managing student events and cross-cultural engagement",
  },
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">About</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">Background & Academic Profile</h2>
        <p className="max-w-4xl text-slate-300">
          I am a Computer Science &amp; Technology researcher at Nanjing University of
          Posts and Telecommunications (NJUPT), focused on blockchain-enabled UAV
          systems. My work spans UAV authentication via Proof-of-History, spectrum
          security in 6G settings, and smart contract-driven communications.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {summaryCards.map((card, index) => (
          <motion.article
            key={card.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{card.label}</p>
            <h3 className="mt-3 text-lg font-semibold">{card.value}</h3>
            <p className="mt-2 text-sm text-slate-400">{card.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

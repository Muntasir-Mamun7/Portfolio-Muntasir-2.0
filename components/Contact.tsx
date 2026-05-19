"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const socialLinks = [
  { label: "Email", href: "mailto:munmamun9@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muntasirmamun7/" },
  { label: "GitHub", href: "https://github.com/Muntasir-Mamun7" },
  { label: "ORCID", href: "https://orcid.org/0009-0008-5640-5193" },
];

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer id="contact" className="section-shell border-t border-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Contact</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">Let&apos;s Collaborate</h2>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full border border-emerald-500/50 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:border-emerald-300"
          >
            WeChat QR
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="text-lg font-semibold">Connect on WeChat</h3>
              <p className="mt-2 text-sm text-slate-400">Scan the QR code to add me instantly.</p>
              <Image
                src="/images/wechat-qr.jpg"
                alt="WeChat QR code for Muntasir Al Mamun"
                width={600}
                height={600}
                className="mt-4 h-auto w-full rounded-xl border border-emerald-400/40"
              />
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </footer>
  );
}

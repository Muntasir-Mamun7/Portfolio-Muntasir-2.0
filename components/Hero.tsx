"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="section-shell min-h-screen flex items-center">
      <div className="max-w-3xl space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-[0.24em] text-cyan-300"
        >
          Hello, I&apos;m
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        >
          Muntasir Al Mamun
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-300"
        >
          Blockchain &amp; UAV Researcher | Computer Science Student at NJUPT
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400"
        >
          Driving secure next-generation aerial networks with Proof-of-History
          blockchain, smart contracts, and AirSim-based swarm simulation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  );
}

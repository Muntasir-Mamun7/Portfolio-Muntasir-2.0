"use client";

import { motion } from "framer-motion";

const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Blockchain",
    items: ["Solidity", "Smart Contracts", "Web3.js / Ethers.js", "Hardhat"],
  },
  {
    title: "Simulation & UAV",
    items: ["AirSim", "PX4 Autopilot", "Unreal Engine", "Drone Programming"],
  },
  {
    title: "Languages",
    items: ["Java", "C/C++", "Python", "JavaScript"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Skills</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">Technical Stack</h2>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h3 className="text-lg font-semibold text-cyan-300">{group.title}</h3>
            <ul className="mt-4 space-y-2 text-slate-300">
              {group.items.map((item) => (
                <li key={item} className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

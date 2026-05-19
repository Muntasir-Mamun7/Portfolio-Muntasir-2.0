"use client";

import { motion } from "framer-motion";

type ProjectItem = {
  title: string;
  venueOrStack: string;
  description: string;
  links: { label: string; href: string }[];
};

const projects: { section: string; items: ProjectItem[] }[] = [
  {
    section: "Academic Research",
    items: [
      {
        title: "UAVSpectrumChain",
        venueOrStack: "Springer Nature | Solidity | Hardhat | UAV Communications",
        description:
          "Blockchain-based framework for credible UAV spectrum trading with on-chain auction, settlement, and audit workflows.",
        links: [
          { label: "DOI", href: "https://doi.org/10.1007/978-981-95-4142-3_3" },
          {
            label: "Blockchain Journal",
            href: "https://doi.org/10.55092/blockchain20250014",
          },
          {
            label: "GitHub",
            href: "https://github.com/Muntasir-Mamun7?tab=repositories",
          },
        ],
      },
      {
        title: "UAV Authentication via Proof-of-History",
        venueOrStack: "NJUPT Thesis | AirSim | Blockchain",
        description:
          "Design and implementation of secure UAV authentication for low-altitude intelligent networking using PoH blockchain mechanisms.",
        links: [
          { label: "Primary DOI", href: "https://doi.org/10.1007/978-981-95-4142-3_3" },
        ],
      },
    ],
  },
  {
    section: "Software Projects",
    items: [
      {
        title: "Baymax 2.3",
        venueOrStack: "HTML | CSS | JavaScript",
        description:
          "Modern responsive web experience with interaction-focused UI and deployable static architecture.",
        links: [
          { label: "GitHub", href: "https://github.com/Muntasir-Mamun7/baymax-2.3" },
        ],
      },
      {
        title: "Beat Chimp - Memory Test Game",
        venueOrStack: "Java | Swing GUI",
        description:
          "Event-driven desktop memory game with progressive levels, score tracking, and packaged releases.",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/Muntasir-Mamun7/BeatChimp-MemoryTest/releases/tag/v1.0",
          },
        ],
      },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Projects</p>
        <h2 className="text-3xl font-semibold sm:text-4xl">Research & Software Portfolio</h2>
      </motion.div>

      <div className="mt-10 space-y-12">
        {projects.map((group) => (
          <div key={group.section} className="space-y-5">
            <h3 className="text-xl font-semibold text-slate-200">{group.section}</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {group.items.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
                >
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <p className="mt-2 text-sm text-cyan-300">{project.venueOrStack}</p>
                  <p className="mt-4 text-sm text-slate-300">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <a
                        key={`${project.title}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

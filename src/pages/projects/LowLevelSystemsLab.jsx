import React from "react";
import { Link } from "react-router-dom";

export default function LowLevelSystemsLab() {
  const projects = [
    {
      id: "redix",
      name: "Redix - High-Performance Key-Value Store",
      description:
        "A high-performance, Redis-compatible key-value store built in Go with AOF persistence and pub/sub messaging.",
    },
    {
      id: "bmos-shell",
      name: "BMOS Shell - Rust powered custom Unix shell",
      description:
        "A custom Unix-like shell built from scratch in Rust, supporting command execution, piping, and I/O redirection",
    },
    {
      id: "kaos",
      name: "KaOS - Educational Operating System",
      description:
        "A minimal RISC-V operating system built from scratch in C, featuring paged virtual memory, multiprocessing, and a persistent file system",
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(120,113,108,0.12),_transparent_26%),linear-gradient(180deg,#fcfaf0_0%,#f3ecdd_100%)] text-[#1d1a16]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between gap-4 border-b border-black/10 pb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-black/60 transition hover:text-black"
          >
            <span className="text-lg leading-none">←</span>
            Back home
          </Link>

          <span className="text-xs uppercase tracking-[0.35em] text-black/35">
            Low-level systems lab
          </span>
        </header>

        <section className="grid flex-1 gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">
              Project file
            </p>

            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Low-Level Systems Lab
            </h1>

            <p className="max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
              Click a project to view its complete documentation, architecture,
              benchmarks, and implementation details.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-16">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group block rounded-[2rem] border border-black/10 bg-[#f5eddd] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03)] transition hover:border-black/15 hover:bg-[#efe3cc] sm:p-8"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.32em] text-black/35">
                    Personal Project
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {project.name}
                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-black/65 sm:text-base">
                    {project.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-black/10 bg-white/50 px-4 py-2 text-xs uppercase tracking-[0.28em] text-black/55 transition group-hover:bg-white group-hover:text-black">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
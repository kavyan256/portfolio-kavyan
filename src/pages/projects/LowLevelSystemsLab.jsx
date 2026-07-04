import React from "react";
import { Link } from "react-router-dom";

export default function LowLevelSystemsLab() {
  const projects = [
    {
      id: "kernel-traces",
      name: "Kernel Traces",
      description:
        "Inspecting system events and timing patterns to understand low-level behavior.",
      detail:
        "A dummy study of event traces, scheduler timing, and how small runtime changes affect the system path.",
    },
    {
      id: "cache-paths",
      name: "Cache Paths",
      description:
        "A focused look at memory access patterns, latency, and cache-aware design.",
      detail:
        "A dummy experiment exploring memory locality, cache misses, and ways to make data access predictable.",
    },
    {
      id: "perf-profiles",
      name: "Perf Profiles",
      description:
        "Profiling tools and quick benchmarks used to compare performance tradeoffs.",
      detail:
        "A dummy toolkit for collecting benchmark snapshots and comparing hotspots across builds.",
    },
    {
      id: "runtime-hooks",
      name: "Runtime Hooks",
      description:
        "Lightweight hooks for observing execution without changing the core flow.",
      detail:
        "A dummy prototype for instrumentation points, logging, and tracing that stays out of the way.",
    },
    {
      id: "allocator-notes",
      name: "Allocator Notes",
      description:
        "Explorations around allocation patterns, fragmentation, and memory pressure.",
      detail:
        "A dummy research log for allocator behavior, fragmentation patterns, and tuning ideas.",
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
            <h1 className="text-5xl font-semibold tracking-tight text-[#1d1a16] sm:text-6xl lg:text-7xl">
              Low-Level Systems Lab
            </h1>
            <p className="max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
              A set of dummy experiments presented as broad clickable cards. Each card opens to a short detail panel on the page.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-16">
          {projects.map((project) => (
            <details
              key={project.id}
              className="group rounded-[2rem] border border-black/10 bg-[#f5eddd] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03)] transition hover:border-black/15 hover:bg-[#efe3cc] sm:p-8"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 outline-none">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.32em] text-black/35">
                    Dummy project
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1a16] sm:text-3xl">
                    {project.name}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-black/65 sm:text-base">
                    {project.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-black/10 bg-white/50 px-4 py-2 text-xs uppercase tracking-[0.28em] text-black/55 transition group-open:bg-white/70 group-open:text-black">
                  Click
                </span>
              </summary>

              <div className="mt-6 border-t border-black/10 pt-6 text-sm leading-7 text-black/70 sm:text-base">
                {project.detail}
              </div>
            </details>
          ))}
        </section>
      </div>
    </main>
  );
}

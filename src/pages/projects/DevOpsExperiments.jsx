import React from "react";
import { Link } from "react-router-dom";

export default function DevOpsExperiments() {
  const projects = [
    {
      id: "pipeline-ops",
      name: "Pipeline Ops",
      description:
        "A dummy project about build stages, automated checks, and predictable delivery paths.",
      detail:
        "A short mock study of CI configuration, deployment gates, and release reliability.",
    },
    {
      id: "infra-notes",
      name: "Infra Notes",
      description:
        "A lightweight project for documenting infrastructure patterns and repeatable setup steps.",
      detail:
        "A dummy notes workspace covering environments, provisioning, and maintenance decisions.",
    },
    {
      id: "deploy-scripts",
      name: "Deploy Scripts",
      description:
        "Small scripts that automate release tasks and reduce manual repetition.",
      detail:
        "A dummy bundle of scripts for service rollout, validation, and rollback safety.",
    },
    {
      id: "monitoring-view",
      name: "Monitoring View",
      description:
        "A simple monitoring concept for watching service health and alert signals.",
      detail:
        "A dummy dashboard idea for metrics, logs, and incident awareness during releases.",
    },
    {
      id: "release-checklist",
      name: "Release Checklist",
      description:
        "A checklist-driven approach to ship work with fewer surprises.",
      detail:
        "A dummy checklist for approvals, versioning, and final verification before shipping.",
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
            DevOps experiments
          </span>
        </header>

        <section className="grid flex-1 gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">
              Project file
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-[#1d1a16] sm:text-6xl lg:text-7xl">
              DevOps Experiments
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

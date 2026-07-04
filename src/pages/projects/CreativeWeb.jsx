import React from "react";
import { Link } from "react-router-dom";

export default function CreativeWeb() {
  const projects = [
    {
      id: "motion-study",
      name: "Motion Study",
      description:
        "A dummy project about animation timing, transitions, and visual rhythm on the web.",
      detail:
        "A short mock breakdown of easing, motion pacing, and how interface movement shapes perception.",
    },
    {
      id: "type-systems",
      name: "Type Systems",
      description:
        "Exploring typography hierarchy and layout balance in a creative interface.",
      detail:
        "A dummy study of font pairing, spacing, and readable structure across responsive views.",
    },
    {
      id: "interaction-lab",
      name: "Interaction Lab",
      description:
        "Small interaction experiments that make a page feel responsive and tactile.",
      detail:
        "A dummy concept for hover states, scroll behavior, and subtle feedback layers.",
    },
    {
      id: "visual-frames",
      name: "Visual Frames",
      description:
        "A gallery-style look at composition, spacing, and image-led storytelling.",
      detail:
        "A dummy frame system for balancing imagery, whitespace, and content rhythm.",
    },
    {
      id: "story-flow",
      name: "Story Flow",
      description:
        "A page flow concept built to guide attention and keep sections moving cleanly.",
      detail:
        "A dummy narrative structure for sequencing ideas, transitions, and content beats.",
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
            Creative web
          </span>
        </header>

        <section className="grid flex-1 gap-10 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-black/40">
              Project file
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-[#1d1a16] sm:text-6xl lg:text-7xl">
              Creative Web
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

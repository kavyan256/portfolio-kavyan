import React from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(252,250,240,0.08),_transparent_34%),linear-gradient(180deg,#090909_0%,#111111_100%)] text-[#fcfaf0]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
          >
            <span className="text-lg leading-none">←</span>
            Back home
          </Link>
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">
            Selected projects
          </span>
        </header>

        <section className="grid flex-1 gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-white/45">
              Projects page
            </p>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              A closer look at the work behind the cards.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              The cards on the homepage now lead here. This page collects the
              work in one place so each project can be viewed with a little more
              context.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Format
                </p>
                <p className="mt-2 text-lg text-white/85">
                  Visual gallery with short project notes.
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Navigation
                </p>
                <p className="mt-2 text-lg text-white/85">
                  Tap any homepage card to land here.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 pb-16 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} linkTo={null} />
          ))}
        </section>
      </div>
    </main>
  );
}
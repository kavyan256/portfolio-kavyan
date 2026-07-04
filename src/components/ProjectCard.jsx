import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, linkTo }) {
  const destination = linkTo ?? project.path;
  const cardContent = (
    <article className="group overflow-hidden rounded-[2rem] border border-white/8 bg-[#0d0d0d] transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      </div>

      <div className="space-y-5 p-6 sm:p-8 text-[#fcfaf0]">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/35">
            {project.subtitle}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-7 text-white/65 sm:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  if (!destination) {
    return cardContent;
  }

  return (
    <Link to={destination} className="block outline-none" aria-label={`Open project page for ${project.title}`}>
      {cardContent}
    </Link>
  );
}

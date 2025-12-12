import React from "react";

const projects = [
  {
    image: "/assets/images/project1.png",
    title: "Low-Level Systems Lab",
    subtitle: "Memory, performance, and internals",
  },
  {
    image: "/assets/images/project2.png",
    title: "AI / ML Experiments",
    subtitle: "Learning systems that adapt",
  },
  {
    image: "/assets/images/project3.png",
    title: "Creative Web",
    subtitle: "Motion, interaction, and feel",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="flex flex-col gap-24 bg-[#fcfaf0] py-64">

      {/* Heading */}
      <div className="max-w-6xl px-12 md:px-24 font-inter">
        <p className="text-6xl font-semibold leading-tight text-gray-800 md:text-7xl">
          Discover my latest works that bring ideas to life
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid w-full max-w-full mx-auto px-24 gap-8 md:grid-cols-2 auto-rows-[420px]">
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            {...project}
            featured={i === 0}
          />
        ))}
      </div>

    </section>
  );
}

/* ---------------------------------------------------- */

function ProjectCard({ image, title, subtitle, featured }) {
  return (
    <div
      className={`group relative w-full rounded-sm overflow-hidden bg-gray-200
        ${featured ? "md:row-span-2" : ""}
      `}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-end bg-black/40">
        <div className="p-10 md:p-12">
          <p className="text-3xl font-medium text-white md:text-4xl">
            {title}
          </p>
          <p className="max-w-md mt-3 text-lg text-gray-300">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

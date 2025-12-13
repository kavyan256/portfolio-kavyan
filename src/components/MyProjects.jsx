import React from "react";
import redisImage from "../assets/images/redis_mockup.png";
import orangeRedis from "../assets/images/orange_redis.png";
import project3 from "../assets/images/project3.png";
import project4 from "../assets/images/project4.png";

const projects = [
  {
    image: redisImage,
    title: "Low-Level Systems Lab",
    subtitle: "Memory, performance, and internals",
  },
  {
    image: orangeRedis,
    title: "AI / ML Experiments",
    subtitle: "Learning systems that adapt",
  },
  {
    image: project3,
    title: "Creative Web",
    subtitle: "Motion, interaction, and feel",
  },
  {
    image: project4,
    title: "Experimental Projects",
    subtitle: "Ideas, prototypes, and research",
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
      <div className="grid w-full gap-8 px-12 mx-auto md:px-24 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>

    </section>
  );
}

/* ---------------------------------------------------- */

function ProjectCard({ image, title, subtitle }) {
  return (
    <div className="flex flex-col gap-4">

      {/* Subtitle / label (outside) */}
      <p className="text-sm tracking-wide text-gray-500 uppercase">
        {subtitle}
      </p>

      {/* Image container */}
      <div
        className="relative w-full overflow-hidden bg-gray-200 cursor-pointer group"
        style={{ height: "620px" }} // 👈 adjustable height
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-colors duration-500 bg-black/0 group-hover:bg-black/40">
          <div className="transition-all duration-500 transform opacity-0 group-hover:opacity-100">
            <p className="text-2xl font-medium text-center text-white">
              {title}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

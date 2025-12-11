// About.jsx
import React from "react";

export default function About() {
  return (
    <section className="flex items-center justify-center w-full h-screen px-6 text-white bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-wide md:text-5xl">
          About Me
        </h1>
        <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
          I’m Kavyan, a developer exploring low-level systems, AI, and creative web experiences.  
          I enjoy understanding how things work beneath the surface and turning ideas into elegant code.
        </p>
        <p className="text-lg leading-relaxed text-gray-400 md:text-xl">
          Currently, I’m building interactive web projects that combine smooth animations, AI, and user-friendly design.
        </p>
      </div>
    </section>
  );
}

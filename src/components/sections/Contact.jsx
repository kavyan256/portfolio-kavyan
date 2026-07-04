import React from "react";

export default function Contact() {
  return (
    <section className="w-full bg-[#fcfaf0] text-black">
      <div className="max-w-6xl px-8 py-40 mx-auto space-y-20">
        
        {/* Heading */}
        <div className="space-y-6">
          <h2 className="text-5xl font-medium tracking-tight md:text-6xl">
            Let’s talk
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed text-gray-600 md:text-2xl">
            If you want to discuss a project, collaboration, or just have a
            conversation about systems, design, or ideas — feel free to reach
            out.
          </p>
        </div>

        {/* Contact info */}
        <div className="grid gap-10 text-lg md:text-xl">
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Email</span>
            <a
              href="mailto:kavyanhembrom@gmail.com"
              className="transition hover:opacity-60"
            >
              kavyanhembrom@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-500">GitHub</span>
            <a
              href="https://github.com/kavyan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-60"
            >
              github.com/kavyan
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-500">LinkedIn</span>
            <a
              href="https://linkedin.com/in/kavyan"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-60"
            >
              linkedin.com/in/kavyan
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="pt-24 text-sm text-gray-400">
          © {new Date().getFullYear()} Kavyan Hembrom
        </div>
      </div>
    </section>
  );
}

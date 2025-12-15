// About.jsx
import React from "react";
import MarqueeGSAP from "./FrameworkMarquee.jsx";
import ScrollSvg from "./scrollAnimation.jsx";

export default function About() {
  return (
    <section className="w-full text-black bg-[#fcfaf0]">

      <ScrollSvg />
      
      {/* Top text */}
      <div className="flex items-center justify-center py-20 min-h-fit sm:min-h-screen sm:py-12 md:py-0">
        <div className="max-w-2xl px-4 space-y-6 text-center sm:space-y-14 sm:px-6 sm:max-w-7xl">
          <p className="text-sm font-medium leading-snug text-gray-800 sm:text-2xl md:text-4xl lg:text-4xl sm:leading-relaxed">
            I'm Kavyan, a developer specializing in low-level systems, and exploring AI/ML, and creative web experiences.  
            I enjoy understanding and building how things work beneath the surface and turning ideas into code.
          </p>
          <p className="text-xs font-light leading-relaxed text-gray-600 sm:text-lg md:text-2xl lg:text-3xl sm:leading-relaxed">
            I specialize in low-level systems and performance-driven engineering, and I'm expanding into full-stack development and AI/ML to build smarter, interactive digital experiences.
          </p>
        </div>
      </div>
      <div>
        <p className="flex justify-center mb-8 text-xs font-light sm:mb-12 sm:text-lg md:text-2xl lg:text-3xl">Languages, Frameworks & Tools I am familiar with ...</p>
        <MarqueeGSAP />
      </div>
    </section>
  );
}

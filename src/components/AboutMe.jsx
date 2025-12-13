// About.jsx
import React from "react";
import MarqueeGSAP from "./FrameworkMarquee.jsx";
import ScrollSvg from "./scrollAnimation.jsx";

export default function About() {
  return (
    <section className="w-full text-black bg-[#fcfaf0]">

      <ScrollSvg />
      
      {/* Top text */}
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-14 max-w-7xl">
          <p className="text-4xl leading-relaxed text-gray-800">
            I’m Kavyan, a developer specializing in low-level systems, and exploring AI/ML, and creative web experiences.  
            I enjoy understanding and building how things work beneath the surface and turning ideas into code.
          </p>
          <p className="text-3xl font-light leading-relaxed text-gray-600">
            I specialize in low-level systems and performance-driven engineering, and I’m expanding into full-stack development and AI/ML to build smarter, interactive digital experiences.
          </p>
        </div>
      </div>
      <div>
        <p className="flex justify-center mb-12 text-3xl font-light">Languages and Frameworks I am familiar with ...</p>
        <MarqueeGSAP />
      </div>
    </section>
  );
}

// About.jsx
import React from "react";
import MarqueeGSAP from "../effects/FrameworkMarquee.jsx";
import ScrollSvg from "../effects/ScrollCurveDivider.jsx";
import NeonMark from "../effects/NeonMark.jsx";
import { NEON } from "../../theme/palette";

export default function About() {
  return (
    <section className="w-full text-black bg-[#fcfaf0]">

      <ScrollSvg />
      
      {/* Top text */}
      <div className="flex items-center justify-center py-20 min-h-fit sm:min-h-screen sm:py-12 md:py-0">
        <div className="max-w-2xl px-4 space-y-6 text-center sm:space-y-14 sm:px-6 sm:max-w-7xl">
          <p className="text-sm font-medium leading-snug text-gray-800 sm:text-2xl md:text-4xl lg:text-4xl sm:leading-relaxed">
            I'm Kavyan, a developer drawn to <NeonMark color={NEON.magenta}>low-level systems</NeonMark>,{" "}
            <NeonMark color={NEON.cyan}>operating systems</NeonMark> and the{" "}
            <NeonMark color={NEON.ember}>infrastructure</NeonMark> that keeps software running.
          </p>
          <p className="text-xs font-light leading-relaxed text-gray-600 sm:text-lg md:text-2xl lg:text-3xl sm:leading-relaxed">
            I enjoy understanding how things work beneath the surface. Right now I'm running my own Kubernetes homelab and learning how distributed systems hold together. I build web apps too, and yes, I write good prompts. Who doesn't these days?
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

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tr } from "framer-motion/client";

console.log("ScrollTrigger:", ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSvg() {
  const svgRef = useRef(null);

  useEffect(() => {
    gsap.to(svgRef.current, {
      x: 200,           // 👈 move right (increase for more distance)
      ease: "none",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    });
  }, []);

  return (
    <div className="flex justify-center w-full py-32 overflow-hidden">
      <svg
        ref={svgRef}
        width="200"
        height="40"
        viewBox="0 0 200 40"
      >
        <line
          x1="0"
          y1="20"
          x2="200"
          y2="20"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

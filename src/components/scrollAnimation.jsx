import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

console.log("ScrollTrigger:", ScrollTrigger);

export default function ScrollSvg() {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const scrollContainer = document.querySelector(".hide-scrollbar");
    
    gsap.to(svgRef.current, {
      x: 200,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        scroller: scrollContainer || window,
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: false,
      },
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex justify-center w-full py-32 overflow-hidden"
    >
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

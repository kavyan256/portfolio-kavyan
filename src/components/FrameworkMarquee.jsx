import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FrameworkMarquee() {
  return (
    <div className="w-full overflow-hidden">
      <MarqueeRow reverse={false} />
      <MarqueeRow reverse={true} />
    </div>
  );
}

/* ---------------------------------------------------- */

function MarqueeRow({ reverse }) {
  const containerRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    let pos = 0;
    const speed = reverse ? 0.5 : -0.5;

    // because we duplicated content
    const distance = group.scrollWidth / 2;

    // wrap position between -distance and 0
    const wrap = gsap.utils.wrap(-distance, 0);

    gsap.set(group, { x: 0 });

    const tick = () => {
      pos += speed;
      pos = wrap(pos);          // 🔑 this is the fix
      gsap.set(group, { x: pos });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [reverse]);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-2 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
      }}
    >
      <div
        ref={groupRef}
        className="flex gap-4 will-change-transform"
      >
        <TileSet />
        <TileSet />
      </div>
    </div>
  );
}

/* ---------------------------------------------------- */

function TileSet() {
  const items = [
    "C",
    "C++",
    "Python",
    "JavaScript",
    "GSAP",
    "Tailwind",
    "Git",
    "Docker",
    "Linux",
    "Go",
    "Rust",
    "tensorflow",
    "node.js",
    "react",
    "next.js",
    "express",
    "mongodb",
    "postgresql",
  ];

  return (
    <>
      {items.map((item, i) => (
        <div
          key={`${item}-${i}`}
          className="
            w-56 h-32
            rounded-lg
            border-2 border-[#1b2aa6]
            bg-transparent
            flex items-center justify-center
            text-[#1b2aa6] font-bold
            text-2xl
            flex-shrink-0
          "
        >
          {item}
        </div>
      ))}
    </>
  );
}

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

const icons = [
  "devicon-c-plain",
  "devicon-cplusplus-plain",
  "devicon-python-plain",
  "devicon-javascript-plain",
  "devicon-tailwindcss-plain",
  "devicon-git-plain",
  "devicon-docker-plain",
  "devicon-linux-plain",
  "devicon-go-original-wordmark",
  "devicon-rust-plain",
  "devicon-tensorflow-original",
  "devicon-nodejs-plain",
  "devicon-react-original",
  "devicon-nextjs-plain",
  "devicon-express-original-wordmark",
  "devicon-mongodb-plain",
  "devicon-postgresql-plain",
  "devicon-graphql-plain-wordmark",
  "devicon-redis-plain",
  "devicon-kubernetes-plain",
];

function TileSet() {
  return (
    <>
      {icons.map((icon, i) => (
        <div
          key={`${icon}-${i}`}
          className="
            w-56 h-32
            rounded-md
            border-2 border-[#1b2aa6]
            bg-transparent
            flex items-center justify-center
            flex-shrink-0
          "
        >
          <i
            className={`${icon} text-6xl text-[#1b2aa6]`}
            aria-hidden
          />
        </div>
      ))}
    </>
  );
}

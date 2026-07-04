import { useState, useEffect } from "react";

function VerticalLineSVG({ className = "" }) {
  const [height, setHeight] = useState(300);

  useEffect(() => {
    const update = () => {
      const top = 24 * 4;     // tailwind top-24 = 96px
      const bottom = 52 * 4;  // tailwind bottom-52 = 208px
      const h = window.innerHeight - top - bottom;
      setHeight(Math.max(h, 100));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const padding = 20;

  return (
    <svg width="40" height={height} className={className}>
      <circle cx="20" cy={padding} r="3" fill="#fffce1" />
      <line
        x1="20"
        y1={padding + 15}
        x2="20"
        y2={height - padding - 15}
        stroke="#fffce1"
        strokeWidth="1"
      />
      <circle cx="20" cy={height - padding} r="3" fill="#fffce1" />
    </svg>
  );
}

export default VerticalLineSVG;

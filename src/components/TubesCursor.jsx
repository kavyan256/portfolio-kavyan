import { useEffect, useRef } from "react";

export default function TubesCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let app = null;

    async function loadCursor() {
      const module = await import(
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      const TubesCursor = module.default;

      app = TubesCursor(canvasRef.current, {
        tubes: {
          colors: ["#f967fb", "#53bc28", "#6958d5"],
          lights: {
            intensity: 200,
            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
          }
        }
      });
    }

    loadCursor();

    // Click handler for randomizing colors
    function randomColors(count) {
      return new Array(count)
        .fill(0)
        .map(
          () =>
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")
        );
    }

    const handleClick = () => {
      if (!app) return;
      const colors = randomColors(3);
      const lightsColors = randomColors(4);
      app.tubes.setColors(colors);
      app.tubes.setLightsColors(lightsColors);
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-999"
    ></canvas>
  );
}

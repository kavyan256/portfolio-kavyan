import React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// One floating sprite (can be replaced with any 3D model)
function Sprite({ modelPath, position, scale = 0.5 }) {
  const { scene } = useGLTF(modelPath);

  // Animate floating + rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    scene.position.y = position[1] + Math.sin(t + position[0]) * 0.3; // floating
    scene.rotation.y += 0.01; // slow spin
  });

  return <primitive object={scene} position={position} scale={scale} />;
}

// Multiple sprites
export default function Sprites() {
  const models = [
    { path: "/models/Jet.glb", pos: [2, 0, -3] },
  ];

  return (
    <>
      {models.map((m, i) => (
        <Sprite key={i} modelPath={m.path} position={m.pos} />
      ))}
    </>
  );
}

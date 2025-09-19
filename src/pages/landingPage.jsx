import React from "react";
import Navbar from "../components/Navbar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sprites from "../components/sprites";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />
      
      {/* Three.js Canvas for 3D sprites */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* 3D Sprites */}
          <Sprites />
          
          {/* Optional: Allow user to interact with 3D scene */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default LandingPage;
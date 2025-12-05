import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      <Hero />
    </div>
  );
};

export default LandingPage;
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero";
import About from "../components/AboutMe";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      <Navbar />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <Hero />
        <About />
      </div>
    </div>
  );
};

export default LandingPage;
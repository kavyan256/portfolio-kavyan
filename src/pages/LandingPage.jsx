import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/AboutMe";
import FeaturedProjects from "../components/sections/MyProjects";
import Contacts from "../components/sections/Contact";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      <Navbar />
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <Hero />
        <About />
        <FeaturedProjects />
        <Contacts />
      </div>
    </div>
  );
};

export default LandingPage;
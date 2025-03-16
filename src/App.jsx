import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects"
import AboutMe from "./components/AboutMe";
import Contacts from "./components/Contacts";
import gsap from "gsap";

const App = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <main ref={mainRef} className="bg-black">
      <Navbar />
      <Hero />
      <AboutMe />
      <Projects />
      <Contacts />
    </main>
  );
};

export default App;
import React, { useEffect } from "react";
import gsap from "gsap";
import VerticalLineSVG from "../components/lineSVG";
import logo from "../assets/images/logo.svg";
import github from "../assets/images/github.png";
import linkedin from "../assets/images/linkedIn.png";
import whatsapp from "../assets/images/Whatsapp.png";
import TubesCursor from "./TubesCursor";

const Hero = () => {

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1.0 } });

    // Name Animation (Existing Code)
    tl.add("start")
      .fromTo("#K", { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1 }, "start")
      .fromTo("#fake-a1", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1 }, "start+=0.2")
      .to("#fake-a1", { rotateX: 90, opacity: 0, duration: 0.6 }, "+=0.1")
      .fromTo("#a1", { rotateX: -90, opacity: 0 }, { rotateX: 0, opacity: 1 }, "-=0.5")
      .fromTo("#v", { y: "50%", opacity: 0 }, { y: "0%", opacity: 1, ease: "back.out(1.7)" }, "-=0.3")
      .fromTo("#y", { scale: 0, rotateY: 180, opacity: 0 }, { scale: 1, rotateY: 0, opacity: 1, ease: "expo.out" }, "-=0.5")
      .fromTo("#fake-a2", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1 }, "-=0.5")
      .to("#fake-a2", { rotateZ: -180, opacity: 0, duration: 0.6, transformOrigin: "50% 60%" }, "+=0.1")
      .fromTo("#a2", { rotateZ: 180, opacity: 0, transformOrigin: "50% 60%" }, { rotateZ: 0, opacity: 1 }, "-=0.5")
      .fromTo("#n", { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, ease: "power3.out" }, "-=0.5")

    // Slowed Down "Hembrom" Animation
    .fromTo("#H", { y: "-100%", opacity: 0 }, { y: "0%", opacity: 1, ease: "bounce.out" }, "start+=0.5")
    .fromTo("#e", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: "elastic.out(1, 0.5)" }, "start+=1.0")
    .fromTo("#m", { rotateY: 180, opacity: 0 }, { rotateY: 0, opacity: 1, ease: "expo.out" }, "start+=1.5")
    .fromTo("#b", { skewX: 30, opacity: 0 }, { skewX: 0, opacity: 1, ease: "power3.out" }, "start+=2.0")
    .fromTo("#r", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, ease: "power3.out" }, "start+=2.5")
    .fromTo("#o", { y: "-50%", scale: 0, opacity: 0 }, { y: "0%", scale: 1, opacity: 1, ease: "power2.out" }, "start+=3.0")
    .fromTo("#m2", { rotate: -90, opacity: 0 }, { rotate: 0, opacity: 1, ease: "power2.out" }, "start+=3.5");

    // Subtitle Animation
    tl.fromTo(
      "#subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: "power3.out", duration: 1.5 },
      "start+=2"
    )
  }, []);

  return (
    
    <section id="hero" className="relative w-full h-screen bg-black text-[#fffce1] font-amidone flex items-center justify-center">
      <TubesCursor/>
        <div>
          <div className="flex items-center justify-center w-full" style={{ fontFamily: "Amidone" }}>
            <div id="name-container" className="flex shadow-2xl text-9xl">
              <span id="K">K</span>
              <span className="relative w-[1ch] inline-block">
                <span id="fake-a1" className="absolute top-0 left-0 w-full text-center">n</span>
                <span id="a1" className="absolute top-0 left-0 w-full text-center opacity-0">a</span>
              </span>
              <span id="v">v</span>
              <span id="y">y</span>
              <span className="relative w-[1ch] inline-block">
                <span id="fake-a2" className="absolute top-0 left-0 w-full text-center">e</span>
                <span id="a2" className="absolute top-0 left-0 w-full text-center opacity-0">a</span>
              </span>
              <span id="n">n</span>
              <span className="pl-8"></span>
              <span id="H">H</span>
              <span id="e">e</span>
              <span id="m">m</span>
              <span id="b">b</span>
              <span id="r">r</span>
              <span id="o">o</span>
              <span id="m2">m</span>
            </div>
          </div>
    
        <div className="flex items-center justify-center text-center text-xl text-[#fffce1] mt-4 shadow-2xl">
          <p id="subtitle" className="opacity-0 w-[45dvw] mx-8 font-light tracking-wide leading-relaxed">
            Full-Stack Developer • Systems Design Engineer • AI/ML Engineer <br />
          </p>
        </div>
      </div>
      
      <div className="absolute p-2 top-4 left-4">
          <img src={logo} alt="logo" className="w-8 h-8" />
      </div>

      <div className="absolute z-10 left-5 top-16 bottom-64">
        <VerticalLineSVG className="w-auto h-full" />
      </div>

    
      {/* Social Icons - Bottom Left */}
        <div className="absolute flex flex-col gap-8 left-5 bottom-8">
          {/* Logo - Top Left */}
          
          <a className="flex justify-center" href="https://github.com/kavyan256" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="github" className="w-10 h-10 transition-transform duration-300 hover:scale-110" />
          </a>
          <a className="flex justify-center" href="https://linkedin.com/in/kavyan-hembrom/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="linkedin" className="w-10 h-10 transition-transform duration-300 hover:scale-110" />
          </a>
          <a className="flex justify-center" href="https://wa.me/917909069340" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp} alt="whatsapp" className="w-10 h-10 transition-transform duration-300 hover:scale-110" />
          </a>
      </div>
    </section>
  );
};

export default Hero;
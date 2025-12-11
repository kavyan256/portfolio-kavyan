import React, { useEffect } from "react";
import gsap from "gsap";
import VerticalLineSVG from "../components/lineSVG";
import logo from "../../public/assets/images/logo.svg";
import github from "../../public/assets/images/github.png";
import linkedin from "../../public/assets/images/linkedIn.png";
import whatsapp from "../../public/assets/images/Whatsapp.png";

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
    tl.fromTo("#coder", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "start+=2")
      .fromTo("#designer", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "start+=2.5")
      .fromTo("#artist", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "start+=3");

    gsap.fromTo(".random-shape", 
      { opacity: 0, scale: 0, y: 50 }, 
      { opacity: 1, scale: 1, y: 0, ease: "elastic.out(1, 0.5)", duration: 1.5, stagger: 0.5 }
    )

    gsap.to(".random-shape.flip-shape", {
      rotateY: 360,
      duration: 1,
      repeat: -1,
      ease: "power2.inOut",
      repeatDelay: 3 // Total cycle = 1s animation + 3s delay = 4s loop
    });
  }, []);

  return (
    
    <section className="absolute overflow-visible w-full h-full bg-black text-[#fffce1] font-amidone leading-[0.8] ml-[1dvw] mb-[1dvh] -mt-32">
        <div className="relative flex items-center justify-center h-full" style={{ fontFamily: "Amidone" }}>
          <div className="text-[clamp(7dvh,17dvh,21.5dvw)] flex -mb-12">
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


      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 flex items-center text-center text-xl text-[#fffce1] -mt-4">
        <p id="subtitle" className="opacity-0 w-[45dvw] mx-8 font-light tracking-wide leading-relaxed">
          Full-Stack Developer • Systems Design Engineer • AI/ML Engineer <br />
        </p>
      </div>
      
      {/* Logo - Top Left */}
      <div className="absolute top-20 left-2">
        <img src={logo} alt="logo" className="w-8 h-8" />
      </div>

      {/* Social Icons - Bottom Left */}
      <div className="absolute flex flex-col items-center gap-8 bottom-2">
        <div className=" transformleft-1 top-1/2">
          <VerticalLineSVG className="z-10" />
        </div>
        <a href="https://github.com/kavyan256" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="github" className="w-10 h-10 transition-transform duration-300 hover:scale-110" />
        </a>
        <a href="https://linkedin.com/in/kavyan-hembrom/" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} alt="linkedin" className="w-10 h-10 transition-transform duration-300 hover:scale-110" />
        </a>
        <a href="https://wa.me/917909069340" target="_blank" rel="noopener noreferrer">
          <img src={whatsapp} alt="whatsapp" className="w-10 h-10 transition-transform duration-300 hover:scale-110" />
        </a>
      </div>

      
    </section>
  );
};

export default Hero;
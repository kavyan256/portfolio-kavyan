import React, { useEffect } from "react";
import gsap from "gsap";
import { getRandomShape } from "coolshapes-react";

const Hero = () => {

  const Shape1 = getRandomShape({ type: "star" });
  const Shape2 = getRandomShape();
  const Shape3 = getRandomShape();
  const Shape4 = getRandomShape();
  const Shape5 = getRandomShape();

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
    
    <section className="relative overflow-hidden w-full h-[100dvh] bg-black text-[#fffce1] font-amidone leading-[0.8] ml-[1dvw] mb-[1dvh]">
      
      
        <div className="relative flex items-center justify-center h-full" style={{ fontFamily: "Amidone" }}>
          <div className="text-[clamp(7dvh,21dvh,26.5dvw)] flex">
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

      <Shape4 className="random-shape " size={70} color="green" />
      <Shape5 className="random-shape " size={90} color="purple" />


      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-0 flex items-center text-center text-[clamp(1.77dvh,3.2dvh,4.61dvh)] text-[#fffce1]">
        <Shape1 className="random-shape mr-16" size={100} color="red" />
        <p id="subtitle" className="opacity-0 w-[45dvw] mx-8">
          A <span id="coder" className="text-[#ffcc00] font-bold">coder</span>,
          a <span id="designer" className="text-[#ff5733] font-bold">designer</span>,
          and an <span id="artist" className="text-[#33ff57] font-bold">artist</span>—
          curious about everything, committed to nothing (except making cool things).
        </p>
        <Shape1 className="random-shape scale-x-[-1] ml-16" size={100} color="red" />
      </div>


            
      {/*
      <svg
        className="absolute w-full h-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        style={{ transform: "scale(2.2) scaleX(1.1) translateX(-19.5rem) translateY(3rem)", display: "" }}>
        <path
          id="path"
          d="M 1 177 Q 187 50 275 212 Q 440 509 564 370 C 634 271 377 83 382 285 C 450 550 567 282 636 267 A 50 50 0 1 1 676 402 A 26 46 20 1 1 799 93"
          stroke="black"
          fill="transparent"/>
      </svg>
      */}

    </section>
  );
};

export default Hero;
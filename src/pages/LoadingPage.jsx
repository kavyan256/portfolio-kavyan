import React, { useRef, useEffect } from "react";
import Line from "../components/svg";
import gsap from "gsap";
import EyeIcon from "../svg/eye.svg?react";
import RamenIcon from "../svg/ramen.svg?react";
import RocketIcon from "../svg/rocket.svg?react";
import CompassIcon from "../svg/compass.svg?react";
import CurvedCursorText from "../components/CurvedCursorText";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|{}[]'/.,";

const LoadingPage = ({ onLoadingComplete }) => {
    const textRef = useRef(null);
    const linesRef = useRef(null);
    const iconsRef = useRef(null);
    const [showWelcome, setShowWelcome] = React.useState(true);
    const [showLines, setShowLines] = React.useState(false);
    const [svgsAnimationComplete, setSvgsAnimationComplete] = React.useState(false);

    const animateWelcomeExit = (onCompleteCallback) => {
        if (textRef.current) {
            gsap.to(textRef.current, {
                scaleY: 0,                
                duration: 0.5,
                transformOrigin: "center",
                ease: "power2.inOut",
                onComplete: onCompleteCallback
            });
        }
    };

    useEffect(() => { //text animation
        if (showWelcome && textRef.current) {
            const text = textRef.current;
            const fullText = text.innerText;
            
            text.innerText = "";

            const tl = gsap.timeline();

            fullText.split("").forEach((letter, index) => {

                tl.to({}, {
                    duration: 0.5,
                    repeat: 4,
                    onRepeat: () => {
                        const randomChar = chars[Math.floor(Math.random() * chars.length)];
                        const currentText = text.innerText.split("");
                        currentText[index] = randomChar;
                        text.innerText = currentText.join("");
                    },
                    onComplete: () => {

                        const currentText = text.innerText.split("");
                        currentText[index] = letter;
                        text.innerText = currentText.join("");
                    }
                }, index * 0.09);
            });

            // After welcome text animation completes, automatically exit welcome and show SVGs
            tl.add(() => {
                animateWelcomeExit(() => {
                    setShowWelcome(false);
                    setShowLines(true);
                });
            }, "+=4.25"); // 1.5s delay after all letters finish animating
        }
    }, [showWelcome]);

    useEffect(() => {
        if (showLines && linesRef.current && iconsRef.current) {
            const lines = linesRef.current.children;
            const icons = iconsRef.current.children;

            // Set initial state: lines at center, icons hidden below
            gsap.set(lines, { 
                x: 0, 
                opacity: 1,
                transformOrigin: "center"
            });
            
            gsap.set(icons, { 
                y: 50, 
                opacity: 0,
                x: 0
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    setSvgsAnimationComplete(true);
                }
            });

            // Step 1: Animate lines sliding out from center
            tl.to(lines, {
                x: (index) => {
                    const centerOffset = (index - 1.5) * 100;
                    return centerOffset;
                },
                duration: 0.8,
                ease: "power2.inOut",
                stagger: 0.1,
            });

            // Step 2: Then animate icons rising and moving to match their lines
            tl.to(icons, {
                y: 0,
                opacity: 1,
                x: (index) => {
                    const centerOffset = (index - 1.5) * 100;
                    return centerOffset;
                },
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
            }, "-=0.2"); // slight overlap for smoothness
        }
    }, [showLines]);

    const animateSVGsExit = (onCompleteCallback) => {
        if (iconsRef.current && linesRef.current) {
            const icons = iconsRef.current.children;
            const lines = linesRef.current.children;
            
            const tl = gsap.timeline({
                onComplete: onCompleteCallback
            });

            // Fade out icons first with stagger
            tl.to(icons, {
                opacity: 0,
                y: -30,
                rotation: 180,
                scale: 0.8,
                duration: 0.6,
                ease: "power2.in",
                stagger: 0.1
            });

            // Then fade out lines
            tl.to(lines, {
                opacity: 0,
                scaleX: 0,
                duration: 0.4,
                ease: "power2.in",
                stagger: 0.05
            }, "-=0.2"); // overlap slightly
        }
    };

    const handleContainerClick = () => {
        if (showLines && svgsAnimationComplete) {
            // Animate SVGs exit before completing loading
            animateSVGsExit(() => {
                onLoadingComplete();
            });
        }
    };

    return (
        <div 
            onClick={handleContainerClick}
            className="flex flex-col items-center justify-center min-h-screen text-2xl bg-white cursor-none"
        >
            {showWelcome && (
                <p ref={textRef}>Welcome Human</p>
            )}
            {showLines && (
                <div className="relative flex items-center justify-center w-full mt-4">
                    {/* Lines Container */}
                    <div ref={linesRef} className="relative flex items-center justify-center w-full">
                        <div className="absolute">
                            <Line width="80" height="50" color="black" />
                        </div>
                        <div className="absolute">
                            <Line width="80" height="50" color="black" />
                        </div>
                        <div className="absolute">
                            <Line width="80" height="50" color="black" />
                        </div>
                        <div className="absolute">
                            <Line width="80" height="50" color="black" />
                        </div>
                    </div>

                    {/* Icons Container - positioned above lines */}
                    <div ref={iconsRef} className="absolute top-0 flex items-center justify-center w-full" style={{transform: 'translateY(-60px)'}}>
                        <div className="absolute">
                            <EyeIcon className="w-24 h-24 mt-3" />
                        </div>
                        <div className="absolute">
                            <RamenIcon className="w-14 h-14" />
                        </div>
                        <div className="absolute">
                            <RocketIcon className="w-16 h-16 mt-1" />
                        </div>
                        <div className="absolute">
                            <CompassIcon className="w-16 h-16" />
                        </div>
                    </div>
                </div>
            )}
            
            {/* Curved rotating cursor text */}
            <CurvedCursorText text="click  • " />
        </div>
    );
};

export default LoadingPage;

import React, { useRef, useEffect } from "react";
import Line from "../components/svg";
import gsap from "gsap";
import EyeIcon from "../svg/eye.svg?react";
import RamenIcon from "../svg/ramen.svg?react";
import RocketIcon from "../svg/rocket.svg?react";
import CompassIcon from "../svg/compass.svg?react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|{}[]'/.,";

const LoadingPage = ({ onLoadingComplete }) => {
    const textRef = useRef(null);
    const linesRef = useRef(null);
    const iconsRef = useRef(null);
    const [showWelcome, setShowWelcome] = React.useState(true);
    const [showLines, setShowLines] = React.useState(false);

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

    useEffect(() => {
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

            const tl = gsap.timeline();

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

    const handleContainerClick = () => {
        if (showWelcome) {
            animateWelcomeExit(() => {
                setShowWelcome(false);
                setShowLines(true);
            });
        } else if (showLines) {
            // Step 2: After lines are visible, complete loading
            onLoadingComplete();
        }
    };

    return (
        <div 
            onClick={handleContainerClick}
            className="min-h-screen bg-white cursor-pointer flex flex-col items-center justify-center text-2xl"
        >
            {showWelcome && (
                <p ref={textRef}>Welcome Human</p>
            )}
            {showLines && (
                <div className="flex items-center justify-center relative w-full mt-4">
                    {/* Lines Container */}
                    <div ref={linesRef} className="flex items-center justify-center relative w-full">
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
                    <div ref={iconsRef} className="flex items-center justify-center absolute w-full top-0" style={{transform: 'translateY(-60px)'}}>
                        <div className="absolute">
                            <EyeIcon className="w-24 h-24 mt-3" />
                        </div>
                        <div className="absolute">
                            <RamenIcon className="w-14 h-14" />
                        </div>
                        <div className="absolute">
                            <RocketIcon className="w-16 h-16" />
                        </div>
                        <div className="absolute">
                            <CompassIcon className="w-16 h-16" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadingPage;

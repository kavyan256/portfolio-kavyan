import React, { useRef, useEffect } from "react";
import Line from "../components/svg";
import gsap from "gsap";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|{}[]'/.,";

const LoadingPage = ({ onLoadingComplete }) => {
    const textRef = useRef(null);
    const linesRef = useRef(null);
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
            
            // Initialize with empty string
            text.innerText = "";

            const tl = gsap.timeline();

            fullText.split("").forEach((letter, index) => {
                // Add random character animation for each position
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
                        // Set the final correct letter
                        const currentText = text.innerText.split("");
                        currentText[index] = letter;
                        text.innerText = currentText.join("");
                    }
                }, index * 0.09); // Stagger each letter
            });
        }
    }, [showWelcome]);

    useEffect(() => {
        if (showLines && linesRef.current) {
            const lines = linesRef.current.children;
            
            // Set initial state: all lines at center position
            gsap.set(lines, { 
                x: 0, 
                opacity: 1,
                transformOrigin: "center"
            });
            
            // Animate lines sliding out from center
            gsap.to(lines, {
                x: (index) => {
                    // Calculate final positions: spread them apart from center
                    const centerOffset = (index - 1.5) * 100; // Distribute evenly
                    return centerOffset;
                },
                duration: 0.8,
                ease: "power2.inOut",
                stagger: 0.1
            });
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
                <div 
                    ref={linesRef}
                    className="flex items-center justify-center relative w-full mt-4"
                >
                    <div className="absolute"><Line width="80" height="50" color="black" /></div>
                    <div className="absolute"><Line width="80" height="50" color="black" /></div>
                    <div className="absolute"><Line width="80" height="50" color="black" /></div>
                    <div className="absolute"><Line width="80" height="50" color="black" /></div>
                </div>
            )}
        </div>
    );
};

export default LoadingPage;

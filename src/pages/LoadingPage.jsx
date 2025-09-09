import React, { useRef, useEffect } from "react";
import Line from "../components/svg";
import gsap from "gsap";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|{}[]'/.,";

const LoadingPage = ({ onLoadingComplete }) => {
    const textRef = useRef(null);
    const linesRef = useRef(null);
    const [showWelcome, setShowWelcome] = React.useState(true);
    const [showLines, setShowLines] = React.useState(false);

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
                    duration: 1,
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
            // Fade in the lines
            gsap.fromTo(linesRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 1, ease: "power2.out" }
            );
        }
    }, [showLines]);

    const completeWelcome = (e) => {
        e.stopPropagation(); // Prevent parent click
        setShowWelcome(false);
        setShowLines(true);
    };

    const handleLinesClick = (e) => {
        e.stopPropagation(); // Prevent parent click
        onLoadingComplete();
    };

    const handleContainerClick = () => {
        // This handles clicks on the container when neither welcome nor lines are shown
        if (!showWelcome && !showLines) {
            onLoadingComplete();
        }
    };

    return (
        <div 
            onClick={handleContainerClick}
            className="min-h-screen bg-white cursor-pointer flex flex-col items-center justify-center text-2xl"
        >
            {showWelcome && (
                <p ref={textRef} onClick={completeWelcome}>Welcome Human</p>
            )}
            
            {showLines && (
                <div 
                    ref={linesRef}
                    onClick={handleLinesClick}
                    className="flex justify-around items-center w-1/3 mt-4"
                >
                    <Line width="80" height="50" color="black" />
                    <Line width="80" height="50" color="black" />
                    <Line width="80" height="50" color="black" />
                    <Line width="80" height="50" color="black" />
                </div>
            )}
        </div>
    );
};

export default LoadingPage;

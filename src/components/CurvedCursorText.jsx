import React, { useRef, useEffect } from 'react';

const CurvedCursorText = ({ text = "click me • " }) => {
    const containerRef = useRef(null);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            // Direct positioning without delay
            container.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="fixed top-0 left-0 pointer-events-none z-50"
            style={{ transform: 'translate(-50%, -50%)' }}
        >
            <svg width="40" height="40" className="animate-spin" style={{ animationDuration: '10s' }}>
            <defs>
                <path
                id="cursor-circle-path"
                d="M 20, 20 m -15, 0 a 15,15 0 1,1 30,0 a 15,15 0 1,1 -30,0"
                />
            </defs>
            <text className="text-[10.7px] fill-black font-medium" style={{ fontFamily: 'monospace' }}>
                <textPath href="#cursor-circle-path">
                {text.repeat(2)}
                </textPath>
            </text>
            </svg>

        </div>
    );
};

export default CurvedCursorText;
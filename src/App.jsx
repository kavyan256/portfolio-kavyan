import React, { useState, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage";
import LandingPage from "./pages/landingPage";
import gsap from "gsap";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    
    // Switch to landing page immediately (hidden behind loading page)
    setShowLoading(false);
    
    // Create diagonal wipe overlay that covers the loading page initially
    const wipeOverlay = document.createElement('div');
    wipeOverlay.style.position = 'fixed';
    wipeOverlay.style.top = '0';
    wipeOverlay.style.left = '0';
    wipeOverlay.style.width = '100vw';
    wipeOverlay.style.height = '100vh';
    wipeOverlay.style.background = 'white'; // Same as loading page background
    wipeOverlay.style.zIndex = '9999';
    wipeOverlay.style.transformOrigin = 'top left';
    wipeOverlay.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'; // Full coverage initially
    
    document.body.appendChild(wipeOverlay);

    // Animate diagonal wipe to reveal landing page
    gsap.to(wipeOverlay, {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', // Sweep away diagonally
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.removeChild(wipeOverlay);
        setIsTransitioning(false);
      }
    });
  };

  return (
    <main className="bg-black min-h-screen relative overflow-hidden">
      {/* Landing page is always loaded behind */}
      <div className={`absolute inset-0 ${showLoading || isTransitioning ? 'pointer-events-none' : ''}`}>
        <LandingPage />
      </div>
      
      {/* Loading page on top */}
      {showLoading && (
        <div className="absolute inset-0 z-10">
          <LoadingPage onLoadingComplete={handleLoadingComplete} />
        </div>
      )}
    </main>
  );
};

export default App;
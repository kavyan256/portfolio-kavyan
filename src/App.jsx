import React, { useState, useEffect, useRef } from "react";
import LoadingPage from "./pages/LoadingPage";
import LandingPage from "./pages/landingPage";
import gsap from "gsap";
import FollowCursor from "./components/FollowCursor";
import bg_music from "../public/assets/music/bg_music.mp3";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isAudioOn) {
      // Pause the audio
      audioRef.current.pause();
    } else {
      // Play the audio
      audioRef.current.play().catch(err => console.log("Playback error:", err));
    }
    setIsAudioOn(!isAudioOn);
  };

  useEffect(() => {
    // Auto-play audio when landing page appears
    if (!showLoading && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play().catch(err => console.log("Autoplay prevented:", err));
    }
  }, [showLoading]);

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    
    // Hide loading page immediately to show landing page behind
    setShowLoading(false);
    
    // Create diagonal wipe overlay that covers the landing page
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
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Landing page - shown after loading is complete */}
      {!showLoading && (
        <div className="absolute inset-0">
          <LandingPage />
          <FollowCursor />
          <div id="music" className="fixed w-12 h-12 bottom-8 right-8">
            <button
              onClick={toggleAudio}
              className="flex items-center justify-center w-12 h-12 transition bg-white rounded-full bg-opacity-20 backdrop-blur-lg hover:bg-opacity-40"
            ></button>
          </div>
        </div>
      )}
      
      {/* Loading page on top */}
      {showLoading && (
        <div className="absolute inset-0 z-20">
          <LoadingPage onLoadingComplete={handleLoadingComplete} />
        </div>
      )}

      {/* Background audio element */}
      <audio
        ref={audioRef}
        src={bg_music}
        loop
      />
    </main>
  );
};

export default App;
import React, { useState, useEffect, useRef } from "react";
import LoadingPage from "./pages/LoadingPage";
import LandingPage from "./pages/LandingPage";
import LowLevelSystemsLab from "./pages/projects/LowLevelSystemsLab";
import DevOpsExperiments from "./pages/projects/DevOpsExperiments";
import Redix from "./pages/projects/details/Redix";
import Bmos from "./pages/projects/details/Bmos";
import Kaos from "./pages/projects/details/Kaos";
// import CreativeWeb from "./pages/projects/CreativeWeb";
// import ExperimentalProjects from "./pages/projects/ExperimentalProjects";
import gsap from "gsap";
import FollowCursor from "./components/effects/FollowCursor";
import bg_music from "./assets/music/bg_music.mp3";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const audioRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleAudio = () => {
    if (isAudioOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Playback error:", err));
    }
    setIsAudioOn(!isAudioOn);
  };

  useEffect(() => {
    if (!showLoading && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play().catch(err => console.log("Autoplay prevented:", err));
    }
  }, [showLoading]);

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    setShowLoading(false);

    const wipeOverlay = document.createElement('div');
    wipeOverlay.style.position = 'fixed';
    wipeOverlay.style.top = '0';
    wipeOverlay.style.left = '0';
    wipeOverlay.style.width = '100vw';
    wipeOverlay.style.height = '100vh';
    wipeOverlay.style.background = 'white';
    wipeOverlay.style.zIndex = '9999';
    wipeOverlay.style.transformOrigin = 'top left';
    wipeOverlay.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

    document.body.appendChild(wipeOverlay);

    gsap.to(wipeOverlay, {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.removeChild(wipeOverlay);
        setIsTransitioning(false);
      }
    });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black">
      {!showLoading && (
        <div className="relative w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/projects/low-level-systems-lab" element={<LowLevelSystemsLab />} />
            <Route path="/projects/devops-experiments" element={<DevOpsExperiments />} />
            {/* <Route path="/projects/creative-web" element={<CreativeWeb />} /> */}
            {/* <Route path="/projects/experimental-projects" element={<ExperimentalProjects />} /> */}
            <Route path="/projects/redix" element={<Redix />} />
            <Route path="/projects/bmos-shell" element={<Bmos />} />
            <Route path="/projects/kaos" element={<Kaos />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {isHomePage && <FollowCursor />}

          <div className="fixed flex flex-col gap-4 bottom-8 right-8 z-30">
            <button onClick={toggleAudio} className="flex items-center justify-center w-12 h-12 transition border-2 border-gray-400 rounded-full bg-gray-00 hover:scale-105 hover:border-gray-600">
              <svg
                width="30"
                height="12"
                transform="translate(10,0)"
                viewBox="0 0 30 12"
                className={`transition-opacity transform duration-300 ${isAudioOn ? "squiggle-anim opacity-100" : "opacity-40"}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6 Q6 2, 10 6 T 18 6 T 26 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  className="text-gray-400"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {showLoading && (
        <div className="absolute inset-0 z-20">
          <LoadingPage onLoadingComplete={handleLoadingComplete} />
        </div>
      )}

      <audio
        ref={audioRef}
        src={bg_music}
        loop
      />
    </main>
  );
};

export default App;

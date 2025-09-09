import React, { useState, useEffect } from "react";
import LoadingPage from "./pages/LoadingPage";
import LandingPage from "./pages/landingPage";
import gsap from "gsap";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <main className="bg-black min-h-screen">
      {showLoading ? (
        <LoadingPage onLoadingComplete={handleLoadingComplete} />
      ) : (
        <LandingPage />
      )}
    </main>
  );
};

export default App;
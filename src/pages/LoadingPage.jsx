import React from "react";

const LoadingPage = ({ onLoadingComplete }) => {
  const handleClick = () => {
    onLoadingComplete();
  };

  return (
    <div 
      onClick={handleClick}
      className="min-h-screen bg-white cursor-pointer"
    >
    </div>
  );
};

export default LoadingPage;

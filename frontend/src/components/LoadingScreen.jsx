import React, { useEffect } from "react";

const LoadingScreen = ({ isDarkMode }) => {
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h1 className={`text-xl sm:text-4xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Loading...</h1>
    </div>
  );
};

export default LoadingScreen;

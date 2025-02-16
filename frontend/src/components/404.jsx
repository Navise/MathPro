import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 px-6 py-12">
      <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 text-center mt-2 max-w-md">
        The page you're looking for doesn't exist, 
        If you think this might be an error contact developers below.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
      >
        Go Back Home
      </Link>
      <div className="absolute bottom-4 text-gray-500 text-sm text-center">
        If you found this, contact the developers:{" "}
        <a
          href="https://github.com/navise"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          github.com/navise
        </a>{" "}
        &{" "}
        <a
          href="https://github.com/chethangowdab"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          github.com/chethangowdab
        </a>
      </div>
    </div>
  );
};

export default NotFound;

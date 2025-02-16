import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-100 via-orange-50 to-red-100 px-6 py-12">
      <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 animate-pulse">
        401
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-4">
        Unauthorized Access
      </h2>
      <p className="text-gray-600 text-center mt-2 max-w-md">
        You do not have the necessary permissions to view this page. If you
        think this is a mistake, please contact the administrator.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg font-medium bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition"
      >
        Go Back to Home
      </Link>
      <div className="absolute bottom-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Developed by{" "}
        <a
          href="https://github.com/navise"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:underline"
        >
          Navise
        </a>{" "}
        &{" "}
        <a
          href="https://github.com/chethangowdab"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:underline"
        >
          Chethangowdab
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;

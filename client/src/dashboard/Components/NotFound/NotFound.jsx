import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-4">Oops! Page not found</p>
      <Link
        to="/"
        className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded shadow"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

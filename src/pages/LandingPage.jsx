import React from "react";
import coverImage from "../assets/cover.jpg"; // Importing the image

export default function LandingPage() {
  return (
    <div
      className="bg-cover bg-center flex flex-col items-center justify-center h-[88vh] relative"
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div className="absolute inset-0 bg-zinc-700 opacity-70"></div>
      <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-200 mb-16 relative z-10">
        Future of home automation
      </h1>
      <div className="text-center relative z-10">
        <div className="text-lg md:text-xl text-gray-200 typed-out mb-12">
          Empower your home, empower your life. Take control of your space like
          never before.
        </div>
      </div>
      <div className="flex items-center justify-center mb-4 relative z-10">
        <button className="bg-primary hover:bg-accent hover:text-black text-white font-semibold py-3 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
          Get Started
        </button>
      </div>
      <p className="text-center text-gray-100 relative z-10">
        Not sure yet?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Learn More
        </a>
      </p>
    </div>
  );
}

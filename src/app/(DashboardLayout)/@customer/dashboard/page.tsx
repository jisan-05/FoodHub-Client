"use client";

import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" rounded-3xl shadow-2xl p-12 max-w-2xl text-center border ">
        <h1 className="text-4xl md:text-5xl font-extrabold  mb-6">
          Welcome to Your Dashboard!
        </h1>
        <p className=" text-lg md:text-xl mb-8">
          We are glad to have you here. Explore your account and enjoy our
          services.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white  font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

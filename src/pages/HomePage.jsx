import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SkillsList from "../components/HomeSkillDisplay"; // Import the SkillsList component

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <section className="text-center py-24 bg-gray-200 mx-8 rounded-lg shadow-lg">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Skill Xchange
          </h1>
          <p className="text-xl text-gray-700 mt-4 mb-6 max-w-2xl mx-auto">
            Learn new skills by exchanging knowledge with others.
          </p>
          <div className="mt-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-lg font-medium transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="py-20 my-12 mx-6">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8"></h2>
          <SkillsList /> {/* Display the SkillsList component */}
        </div>
      </section>
    </div>
  );
}

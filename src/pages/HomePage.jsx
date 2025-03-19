import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SkillsList from "../components/HomeSkillDisplay"; // Import the SkillsList component
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HeroSection />
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

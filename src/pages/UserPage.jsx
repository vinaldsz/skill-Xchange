import React from "react";
import NavBar from "../components/NavBarWithSwap";
import SkillsList from "../components/SkillList"; // Import the SkillsList component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import SwapProgress from "../components/SwapProgress";

export default function UserPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <SkillsList />
      <SwapProgress />
    </div>
  );
}

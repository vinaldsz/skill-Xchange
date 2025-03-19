import React, { useState, useEffect, useContext } from "react";
import { myDB } from "../db/myFireStore"; // Import your Firebase handler
import { useNavigate } from "react-router";
import "../styles/SwapRequestPage.css";
import NavBar from "../components/NavBar";

export default function SwapRequestPage() {
  const [skills, setSkills] = useState([]); // Store the list of skills
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch skills and associated user details on component mount
  useEffect(() => {
    const fetchSkillsAndUsers = async () => {
      try {
        // Fetch all skills from the Skills collection
        const fetchedSkills = await myDB.getSkillsPromise();

        console.log("👻 Fetched skills:", fetchedSkills);

        // Fetch user details for each skill using user_id
        const userPromises = fetchedSkills.map(async (skill) => {
          const user = await myDB.getUserById(skill.user_id); // Get user by ID
          return { skill, user };
        });

        // Resolve all promises and combine skill and user info
        const skillsAndUsers = await Promise.all(userPromises);

        // Map the fetched data to set final skills state
        const skillsWithUsers = skillsAndUsers.map(({ skill, user }) => ({
          ...skill,
          userName: user?.name || "Unknown",
          userLocation: user?.location || "Unknown",
        }));

        // Set the skills state and stop loading
        setSkills(skillsWithUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills or users:", error);
        setLoading(false);
      }
    };

    fetchSkillsAndUsers();
  }, []);

  // Show loading if still fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="skills-container">
        <div className="back arrow">
          {/* Small Back Arrow Link/Button */}
          <button onClick={() => navigate("/user")} className="back-button">
            ← Back
          </button>
        </div>

        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <h4>{skill.skill_name}</h4>
              <p>Offered by: {skill.userName}</p>
              <p>Location: {skill.userLocation}</p>
              <p>Mode: {skill.mode}</p>
              <p>Proficiency Level: {skill.proficiency_level}</p>
              <button onClick={() => navigate(`/swap-request/${skill.id}`)}>
                Request Swap
              </button>
            </div>
          ))
        ) : (
          <p>No skills available for swapping.</p>
        )}
      </div>
    </div>
  );
}

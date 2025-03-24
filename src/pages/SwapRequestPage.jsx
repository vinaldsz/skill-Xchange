import React, { useState, useEffect } from "react";
import { myDB } from "../db/myFireStore"; // Import your Firebase handler
import { useNavigate } from "react-router";
import "../styles/SwapRequestPage.css";
import NavBar from "../components/NavBar";
import { useEmail } from "../contexts/EmailContext"; // Import EmailContext to get the current user's email

export default function SwapRequestPage() {
  const [skills, setSkills] = useState([]); // Store the list of skills
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { email } = useEmail(); // Get the current user's email

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

  // Handle Swap Request
  const handleRequestSwap = async (skill) => {
    try {
      // Fetch the current user's details using their email
      const currentUser = await myDB.getUserByEmail(email);

      if (!currentUser) {
        console.error("Current user not found.");
        return;
      }

      // Create a new swap request
      const newSwapRequest = await myDB.createSwapRequest(
        currentUser.id, // Requestor ID
        skill.user_id, // Provider ID
        skill.id // Skill ID
      );

      console.log("Swap request created:", newSwapRequest);

      // Navigate to a confirmation page or show a success message
      navigate("/user", { state: { refresh: true } });
    } catch (error) {
      console.error("Error creating swap request:", error);
    }
  };

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
          <button
            onClick={() => navigate("/user", { state: { refresh: true } })}
            className="back-button"
          >
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
              <button onClick={() => handleRequestSwap(skill)}>
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

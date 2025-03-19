import { useEffect, useState, useContext } from "react";
import { myDB } from "../db/myFireStore";
import SkillCard from "./SkillCard";
import SkillForm from "./SkillForm";
import { EmailContext } from "../contexts/EmailContext.jsx";

export default function SkillsList() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null); // Holds the skill to be edited
  const [userId, setUserId] = useState(null); // Define userId state
  const { email } = useContext(EmailContext);

  const fetchSkills = async (userId) => {
    try {
      const allSkills = await myDB.getSkillsPromise();
      console.log("All skills fetched:", allSkills);
      setSkills(allSkills.filter((skill) => skill.user_id === userId)); // Filter by user_id
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      // Fetch user_id based on the email
      const fetchUserId = async () => {
        try {
          console.log("email in SkillList:", email);
          const user = await myDB.getUserByEmail(email); // Function to get user by email
          if (user) {
            const userId = user.id; // Get user ID from the Firestore document ID
            console.log("User ID:", userId);
            setUserId(userId); // Set userId in state
          } else {
            console.error("User not found.");
          }
        } catch (error) {
          console.error("Error fetching user by email:", error);
        }
      };

      fetchUserId();
    }
  }, [email]); // Only re-fetch when the email changes

  // Fetch skills only when userId is set
  useEffect(() => {
    if (userId) {
      fetchSkills(userId); // Fetch skills once userId is available
    }
  }, [userId]); // Depend on userId to trigger fetching skills

  const handleEdit = (skill) => {
    setEditingSkill(skill); // Set the selected skill for editing
  };

  const handleCancelEdit = () => {
    setEditingSkill(null); // Reset to null to exit edit mode
  };

  const handleDelete = async (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await myDB.deleteSkill(skillId);
        setSkills(skills.filter((skill) => skill.id !== skillId)); // Remove deleted skill from state
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  const handleSkillAddedOrUpdated = async () => {
    // Re-fetch skills after adding or updating a skill
    if (userId) {
      fetchSkills(userId);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Your Skills
      </h1>
      {/* Conditionally render SkillForm only if userId is available */}
      {userId && (
        <SkillForm
          userId={userId} // Pass the userId as a prop to SkillForm
          onSkillAddedOrUpdated={handleSkillAddedOrUpdated} // Re-fetch skills after adding or updating
          editingSkill={editingSkill}
          onCancelEdit={handleCancelEdit}
        />
      )}
      {loading ? (
        <p className="text-center text-gray-600">Loading skills...</p>
      ) : skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.id}>
              {/* Show SkillForm if editing that skill, otherwise SkillCard */}
              {editingSkill && editingSkill.id === skill.id ? (
                <SkillForm
                  userId={userId} // Pass the userId as a prop to SkillForm
                  onSkillAddedOrUpdated={handleSkillAddedOrUpdated}
                  editingSkill={editingSkill}
                  onCancelEdit={handleCancelEdit}
                />
              ) : (
                <>
                  <SkillCard skill={skill} />
                  <div className="flex mt-2 space-x-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No skills found.</p>
      )}
    </div>
  );
}

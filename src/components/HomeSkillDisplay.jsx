import { useState, useEffect } from "react";
import { myDB } from "../db/myFireStore"; // Ensure the correct import path
import Button from "react-bootstrap/Button";

export default function SkillsList() {
  const [skills, setSkills] = useState([]); // Initialize state to hold skills
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  async function getSkills() {
    console.log("Getting skills");
    try {
      // Fetch the skills using your Firestore handler
      const skillsData = await myDB.getSkillsPromise(); // This returns the skills array
      console.log("Skills fetched:", skillsData);
      // Ensure skillsData is an array before setting state
      setSkills(Array.isArray(skillsData) ? skillsData : []);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills([]); // In case of error, set skills to an empty array
    } finally {
      setIsLoading(false); // Set loading to false once the fetch is complete
    }
  }

  // Fetch skills when the component mounts
  useEffect(() => {
    getSkills();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-lg text-gray-600">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold mb-6">Popular Skills</h3>
      <div className="flex flex-wrap gap-8">
        {Array.isArray(skills) &&
          skills.map((skill) => (
            <Button
              variant="outline-secondary"
              key={skill.id}
              className="rounded-full border-2 border-black py-4 px-12 text-xl font-medium hover:bg-gray-100 transition-colors mb-4 mx-2"
              onClick={() => console.log(`Selected skill: ${skill.skill_name}`)}
            >
              {skill.skill_name || "Unnamed Skill"}
            </Button>
          ))}
      </div>
    </div>
  );
}

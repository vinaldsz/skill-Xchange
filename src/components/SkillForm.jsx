import { useState, useEffect } from "react";
import { myDB } from "../db/myFireStore";

export default function SkillForm({
  userId,
  onSkillAddedOrUpdated,
  editingSkill,
  onCancelEdit,
}) {
  const [skillData, setSkillData] = useState({
    skill_name: "",
    category: "",
    description: "",
    proficiency_level: "",
    mode: "",
    id: null,
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editingSkill) {
      setSkillData(editingSkill);
    } else {
      setSkillData({
        skill_name: "",
        category: "",
        description: "",
        proficiency_level: "",
        mode: "",
        id: null,
      });
    }
  }, [editingSkill]);

  const handleChange = (e) => {
    setSkillData({ ...skillData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (skillData.id) {
        await myDB.updateSkill(skillData.id, skillData);
      } else {
        await myDB.addSkill({ ...skillData, user_id: userId });
      }

      onSkillAddedOrUpdated(); // Refresh skills
      onCancelEdit(); // Exit edit mode after submitting
    } catch (error) {
      console.error("Error submitting skill:", error);
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md border"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {skillData.id ? skillData.skill_name : "Add New Skill"}
      </h2>

      <input
        type="text"
        name="skill_name"
        value={skillData.skill_name}
        onChange={handleChange}
        placeholder="Skill Name"
        className="w-full p-2 border rounded mb-4"
        required
      />

      <select
        name="category"
        value={skillData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="Creative Arts">Creative Arts</option>
        <option value="Music">Music</option>
        <option value="Technology">Technology</option>
        <option value="Personal Development">Personal Development</option>
      </select>

      <input
        type="text"
        name="description"
        value={skillData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded mb-4"
      />

      <input
        type="text"
        name="proficiency_level"
        value={skillData.proficiency_level}
        onChange={handleChange}
        placeholder="Proficiency Level"
        className="w-full p-2 border rounded mb-4"
      />

      <select
        name="mode"
        value={skillData.mode}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="" disabled>
          Select Mode
        </option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
        <option value="Both">Both</option>
      </select>

      <div className="flex justify-between">
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          {skillData.id ? "Update Skill" : "Add Skill"}
        </button>

        {editingSkill && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-red-500 px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

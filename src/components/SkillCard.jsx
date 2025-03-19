import React from "react";

export default function SkillCard({ skill }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h4 className="text-2xl font-semibold text-gray-800">
        {skill.skill_name}
      </h4>
      <p className="text-gray-600 text-sm mt-2">{skill.category}</p>
      <p className="text-gray-600 text-sm mt-2">{skill.description}</p>
    </div>
  );
}

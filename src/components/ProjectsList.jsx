import Project from "./Project";
import { useState } from "react";

export default function ProjectsList() {
  let [projects, setProjects] = useState([
    { id: 1, name: "Project 1", value: 100, fs: 12, likes: 0 },
    { id: 2, name: "Project 2", value: 200, fs: 12, likes: 0 },
    { id: 3, name: "Project 3", value: 600, fs: 12, likes: 0 },
  ]);

  let totalLikes = 0;



  const projectsRendered = projects.map((p, i) => (
    <Project key={p.id} project={p} setLikes={() => {
      let newProjects = [
        ...projects.slice(0, i),
        { ...p , likes: p.likes + 1},
        ...projects.slice(i + 1)
      ];
      console.log(projects, newProjects);
      setProjects(newProjects);
    }} />
  ));

  return (
    <>
      <div>ProjectsList</div>
      Total number of likes: {totalLikes}
      <ul>{projectsRendered}</ul>


    </>
  );
}

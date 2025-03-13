import ProjectsList from "./components/ProjectsList.jsx";


import "./App.css";

import { myDB } from "./db/myFireStore";
import { useState, useEffect } from "react";

export default function App() {
  const [projectsPromise, setProjectsPromise] = useState(null);
  useEffect(() => {
    const projectsPromise = myDB.getProjects();
    setProjectsPromise(projectsPromise);
  }, []);

  return (
    <div className="App">
      <div>Projects</div>

      <ProjectsList projectsPromise={projectsPromise} />


    </div>
  );
}

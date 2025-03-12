export default function Project({ project, setLikes }) {
  const style = {
    fontSize: `${project.fs + project.likes}pt`,
    transition: "all 1s",
  };

  const onButtonClick = () => {
    setLikes(project.likes + 1);
    console.log("project.likes", project.likes);
  };

  return (
    <div>
      <li style={style}>
        {project.name} : {project.value}
      </li>
      Likes : {project.likes}
      <button onClick={onButtonClick}>Like</button>
    </div>
  );
}

import React from "react";
import "./styles.css";

export default function DiseaseList(props) {
  const [tasks, setTasks] = React.useState([]);
  React.useEffect(() => {
    const tasks = props.tasks;
    setTasks(tasks);
  });

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };
  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  const onDrop = (evt, value) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    console.log("DATA IS, ",data)
    let task = tasks;
    let updated = tasks.map((task) => {
      if (task.id == data) task.done = value;
      console.log("Task is ",task)
      return task;
    });
    setTasks(updated);
  };
  
  let pending = tasks.filter((t) => !t.done);
  console.log("UPDATED DATA IS, ",pending)
  let done = tasks.filter((t) => t.done);
  console.log(done)
  return (
    <div className="container">
      <div
        className="pending small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false)}
      >
        <h3 style={{padding:"1%", paddingLeft:"25%", borderBottom:"5px solid black"}}>Available Symptoms</h3>
        {pending.map((task) => (
          <div
            className="task"
            key={task.name}
            id={task.id}
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragEnd={(e) => onDragEnd(e)}
          >
            {task.name}
          </div>
        ))}
      </div>
      <div
        className="done small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, true)}
      >
        <h3 style={{padding:"1%", paddingLeft:"25%", borderBottom:"5px solid black"}}>Having Symptoms</h3>
        {done.map((task) => (
          <div
            className="task"
            key={task.name}
            id={task.id}
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragEnd={(e) => onDragEnd(e)}
          >
            {task.name}
          </div>
        ))}
      </div>
    </div>
  );
}

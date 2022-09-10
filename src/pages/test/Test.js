import React, { useState, useEffect } from "react";
import "./test.css";

const tasks = [
  { id: 1, name: "Angular", category: "wip", bgcolor: "yellow" },
  { id: 2, name: "React", category: "wip", bgcolor: "pink" },
  { id: 3, name: "Vue", category: "complete", bgcolor: "skyblue" },
];
const Test = () => {
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    setAllTask(tasks);
  }, []);

  // Functions.

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragStart = (ev, element) => {
    console.log("dragstart:", element);
    var ele = JSON.stringify(element);
    ev.dataTransfer.setData("element", ele);
  };

  // drop handle.
  const onDrop = (e, category) => {
    let element = JSON.parse(e.dataTransfer.getData("element"));
    console.log(element);
    let updateAllTask = allTask.map((el) =>
      el.id === element.id
        ? {
            ...el,
            category: category,
          }
        : el
    );

    setAllTask(updateAllTask);
  };
  return (
    <div className="container-drag">
      <h2 className="header">DRAG & DROP DEMO</h2>{" "}
      <div className="d-flex">
        <div
          className="wip "
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => {
            onDrop(e, "wip");
          }}
        >
          <span className="task-header">WIP</span>{" "}
          {allTask
            .filter((ele) => ele.category === "wip")
            .map((el) => (
              <div
                key={el.id}
                draggable
                className="draggable"
                onDragStart={(e) => onDragStart(e, el)}
                style={{ backgroundColor: "yello" }}
              >
                {el.name}
              </div>
            ))}
        </div>{" "}
        <div
          className="droppable"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "complete")}
        >
          {" "}
          <span className="task-header">COMPLETED</span>{" "}
          {allTask
            .filter((ele) => ele.category === "complete")
            .map((el) => (
              <div
                key={el.id}
                draggable
                className="draggable"
                onDragStart={(e) => onDragStart(e, el)}
                style={{ backgroundColor: "yello" }}
              >
                {el.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Test;

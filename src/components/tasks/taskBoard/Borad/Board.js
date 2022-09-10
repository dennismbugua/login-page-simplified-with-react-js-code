import React, { useState, useEffect, Fragment } from "react";
import { TaskCategory, TaskCard, AddEditForm } from "../../";

// ======================================= Category.
const taskCategory = [
  {
    category: "Completed",
    bg: "bg-success",
  },
  {
    category: "Pending",
    bg: "bg-warning",
  },
  {
    category: "In Progress",
    bg: "bg-info",
  },
  {
    category: "Assigned",
    bg: "bg-success",
  },
  {
    category: "On Hold",
    bg: "bg-primary",
  },
];

// ======================================= Parent.

const Board = ({ tasksOfProject }) => {
  const [allTaskOfProject, setAllTaskOfProject] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [isOpenAddEditTask, setIsOpenAddEditTask] = useState({
    open: false,
    category: "",
  });

  useEffect(() => {
    setAllTaskOfProject(tasksOfProject);
  }, [tasksOfProject]);

  // Functions.

  const onDragOver = (e) => {
    e.preventDefault();
  };

  // from inner card.
  const onDragStart = (ev, element) => {
    var ele = JSON.stringify(element);
    ev.dataTransfer.setData("element", ele);
  };

  // drop handle.
  // on drop to the main category card.
  const onDrop = (e, category) => {
    let element = JSON.parse(e.dataTransfer.getData("element"));
    let updateAllTask = allTaskOfProject.map((el) =>
      el.taskId === element.taskId
        ? {
            ...el,
            status: category,
          }
        : el
    );

    setAllTaskOfProject(updateAllTask);
  };

  // toggle b/w AddEdit form and Task catagory card.
  const toggleAddEditForm = React.useCallback((category) => {
    setIsOpenAddEditTask((prevState) => {
      return { open: !prevState.open, category: category };
    });
  }, []);

  // close add edit form.
  const toggleAddEditFormClose = React.useCallback(() => {
    setIsOpenAddEditTask((prevState) => {
      return { open: !prevState.open, category: "" };
    });
    setSelectedTask(null);
  }, []);

  // handle select task.
  const handleSelectTask = (task, taskCategory) => {
    console.log("task:", task);

    setSelectedTask(task);
    toggleAddEditForm(taskCategory.category);
  };

  return (
    <div className="task-board">
      {
        // loop through category.
        taskCategory.map((taskCat) => (
          <TaskCategory
            taskCategoryTitile={{
              title: taskCat.category,
              headingClass: taskCat.bg,
            }}
            onDragOver={onDragOver}
            onDrop={(e) => {
              onDrop(e, taskCat.category.toLowerCase());
            }}
          >
            {/* Add Edit task for a particular category. ( completed, pending ...) */}
            {isOpenAddEditTask.open === true &&
              isOpenAddEditTask.category.toLowerCase() ===
                taskCat.category.toLowerCase() && (
                <div>
                  <AddEditForm
                    toggleAddEditFormClose={toggleAddEditFormClose}
                    selectedTask={selectedTask}
                  ></AddEditForm>
                </div>
              )}

            {/* showing task card for a particular category, (completed, pending ...) */}
            {
              // status === category
              // isOpenAddEditTask.open === false &&
              isOpenAddEditTask.category.toLowerCase() !==
                taskCat.category.toLowerCase() &&
                allTaskOfProject
                  .filter(
                    (el) =>
                      el.statusTitle.toLowerCase() ===
                      taskCat.category.toLowerCase().replace(/\s+/g, "")
                  )

                  .map((tasks) => (
                    <TaskCard
                      task={tasks}
                      employee={"avatar-01.jpg"}
                      onDragStart={(e) => onDragStart(e, tasks)}
                      handleSelectTask={() => handleSelectTask(tasks, taskCat)}
                    ></TaskCard>
                  ))
            }

            {/*Dont not show Add Task Btn when isOpenAddEditTask.category !=== main card category (completed, pending ...)*/}
            {taskCat.category.toLowerCase() !== isOpenAddEditTask.category && (
              <div
                className="text-center"
                onClick={() =>
                  toggleAddEditForm(taskCat.category.toLowerCase())
                }
              >
                Add Task
              </div>
            )}
          </TaskCategory>
        ))
      }
    </div>
  );
};

export default Board;

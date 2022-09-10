import React from "react";
import DropDownActions from "../../../common/DropDownActions";

// ======================================= Child-1 ===========================================..

// Task category card layout.
const TaskCategory = ({ taskCategoryTitile, onDragOver, onDrop, ...props }) => (
  <div
    className="task-category"
    onDragOver={(e) => onDragOver(e)}
    onDrop={onDrop}
  >
    <div className={`task-category-header ${taskCategoryTitile.headingClass} `}>
      <span className="task-category-titile">{taskCategoryTitile.title}</span>
      <div className="d-inline-block float-right drop-down">
        <DropDownActions
          dropDownOption={[
            {
              action: "Edit",
              // handleAction: () => handleEditProject(project),
            },
            {
              action: "Delete",
              // handleAction: () => handleEditProject(project),
            },
          ]}
        ></DropDownActions>{" "}
      </div>
    </div>
    <div className="task-category-body">
      {/* inner card */}
      {props.children}
    </div>
  </div>
);

export default TaskCategory;

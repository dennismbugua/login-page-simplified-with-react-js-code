import React from "react";
import DropDownActions from "../../../common/DropDownActions";

import { Card, CardBody, Progress, Badge } from "reactstrap";

// ======================================= Child-2 ===========================================.

// Individual Task card layout.
const TaskCard = ({
  task,
  taskName,
  progress,
  date,
  priorty,
  employee,
  onDragStart,
  handleSelectTask,
}) => (
  <div className="task-card" draggable onDragStart={onDragStart}>
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between mb-3 ">
          <div className="task-title">
            <span>{task.issueTitle}</span>
          </div>
          <div>
            <DropDownActions
              dropDownOption={[
                {
                  action: "Edit",
                  handleAction: handleSelectTask,
                },
                {
                  action: "Delete",
                  // handleAction: () => handleEditProject(project),
                },
              ]}
            ></DropDownActions>{" "}
          </div>
        </div>
        <div className="mb-2">
          <Progress
            color="info"
            // value={task.progress}
            style={{ height: "6px" }}
          />
        </div>
        <div className="d-flex justify-content-between  ">
          <div>
            <h3 className="mb-0 date">
              {String(new Date(task.createdDate)).substr(0, 16)}
            </h3>
            <Badge color="warning">{task.priorityName}</Badge>
          </div>
          <div className="avatar text-right">
            <img alt="" src={require(`../../../../img/employee/${employee}`)} />
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
);

export default TaskCard;

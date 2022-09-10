import React, { Fragment } from "react";
import { Card, CardBody, CardTitle, Progress } from "reactstrap";

const ListOfTasks = ({ whichTask, count, colorClass }) => (
  <p>
    <i className={`far fa-dot-circle mr-2 ${colorClass}`}></i>
    {whichTask}
    <span className="float-right">{count}</span>
  </p>
);

const TaskStatistics = React.memo(() => {
  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle>
            <h5>Task Statistics</h5>
          </CardTitle>
          <div className="d-flex task-statistic-top-row mb-3">
            <div className="box ">
              <p>Toatl Task</p>
              <h5>385</h5>
            </div>

            <div className="box">
              <p>Overdue Task</p>
              <h5>12</h5>
            </div>
          </div>
          <Progress multi className="mb-4">
            <Progress bar value="30">
              30%
            </Progress>
            <Progress bar color="success" value="24">
              24%
            </Progress>
            <Progress bar color="info" value="10">
              10%
            </Progress>
            <Progress bar color="warning" value="40">
              40%
            </Progress>
            <Progress bar color="danger" value="6">
              6%
            </Progress>
          </Progress>
          <div className="task-statistics-task-list">
            <ListOfTasks
              colorClass={"text-primary"}
              whichTask={"Review Tasks"}
              count={166}
            ></ListOfTasks>
            <ListOfTasks
              colorClass={"text-success"}
              whichTask={"Completed Tasks"}
              count={166}
            ></ListOfTasks>
            <ListOfTasks
              colorClass={"text-warning"}
              whichTask={"Inprogress Tasks"}
              count={166}
            ></ListOfTasks>
            <ListOfTasks
              colorClass={"text-info"}
              whichTask={"On Hold Tasks"}
              count={166}
            ></ListOfTasks>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default TaskStatistics;

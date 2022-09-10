//  <- ViewProjects.js
import React, { useState, Fragment } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

const TaskTabsProject = React.memo(() => {
  const [activeTab, setActiveTab] = useState("pending");

  // Functions.
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  console.log("TaskTabsProjects");

  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "allTask" })}
            onClick={() => {
              toggle("allTask");
            }}
          >
            All Tasks
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "pending" })}
            onClick={() => {
              toggle("pending");
            }}
          >
            Pending
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "completed" })}
            onClick={() => {
              toggle("completed");
            }}
          >
            Completed
          </NavLink>
        </NavItem>
      </Nav>
      {/* <Card className="project-view-crad mt-4 mb-2">
        <CardBody> */}
      <TabContent activeTab={activeTab} className="mt-4 mb-2">
        {/* -------------------------------------------- */}
        <TabPane tabId="allTask">
          <ListGroup className="task-list">
            {["1", "2", "3", "4"].map((tasks, i) => (
              <ListGroupItem key={i}>
                <div className="task-container">
                  <span className="task-check">
                    <i className="fas fa-check  project-task-icon"></i>
                  </span>
                  <span className="task-label">
                    Appointment booking with payment gateway
                  </span>
                  <span className="task-action-btn task-btn-right">
                    <span
                      className="action-circle large task-assign"
                      title="Assign"
                    >
                      <i className="fas fa-user  project-task-icon"></i>
                    </span>
                    <span
                      className="action-circle large delete-btn"
                      title="Delete Task"
                    >
                      <i className="fas fa-trash  project-task-icon"></i>
                    </span>
                  </span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </TabPane>
        {/* -------------------------------------------- */}
        <TabPane tabId="pending">
          <Row>
            <Col sm="6">
              <ListGroup className="task-list">
                <h4 className="task-tab">
                  {/* <a href={`/viewProject/${project.projectId}`}>
                    {project.projectName}
                  </a> */}
                  In Progress
                </h4>
                {["1", "2", "3", "4"].map((tasks, i) => (
                  <ListGroupItem
                    key={i}
                    // className="task-completed"
                    // className={classnames({ "task-completed": i === 1 })}
                  >
                    <div className="task-container ">
                      <span className="task-check">
                        <i className="fas fa-check  project-task-icon"></i>
                      </span>
                      <span className="task-label">
                        Appointment booking with payment gateway
                      </span>
                      <span className="task-action-btn task-btn-right">
                        <span
                          className="action-circle large task-assign"
                          title="Assign"
                        >
                          <i className="fas fa-user  project-task-icon"></i>
                        </span>
                        <span
                          className="action-circle large delete-btn"
                          title="Delete Task"
                        >
                          <i className="fas fa-trash  project-task-icon"></i>
                        </span>
                      </span>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
            <Col sm="6">
              <ListGroup className="task-list">
                <h4 className="task-tab">
                  {/* <a href={`/viewProject/${project.projectId}`}>
                    {project.projectName}
                  </a> */}
                  Not Started
                </h4>
                {["1", "2", "3", "4"].map((tasks, i) => (
                  <ListGroupItem
                    key={i}
                    // className="task-completed"
                  >
                    <div className="task-container ">
                      <span className="task-check">
                        <i className="fas fa-check  project-task-icon"></i>
                      </span>
                      <span className="task-label">
                        Appointment booking with payment gateway
                      </span>
                      <span className="task-action-btn task-btn-right">
                        <span
                          className="action-circle large task-assign"
                          title="Assign"
                        >
                          <i className="fas fa-user  project-task-icon"></i>
                        </span>
                        <span
                          className="action-circle large delete-btn"
                          title="Delete Task"
                        >
                          <i className="fas fa-trash  project-task-icon"></i>
                        </span>
                      </span>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
        {/* -------------------------------------------- */}
        <TabPane tabId="completed">
          <ListGroup className="task-list">
            {["1", "2", "3", "4"].map((tasks, i) => (
              <ListGroupItem
                key={i}
                // className="task-completed"
                className={classnames("task-completed")}
              >
                <div className="task-container ">
                  <span className="task-check">
                    <i className="fas fa-check  project-task-icon"></i>
                  </span>
                  <span className="task-label">
                    Appointment booking with payment gateway
                  </span>
                  <span className="task-action-btn task-btn-right">
                    <span
                      className="action-circle large task-assign"
                      title="Assign"
                    >
                      <i className="fas fa-user  project-task-icon"></i>
                    </span>
                    <span
                      className="action-circle large delete-btn"
                      title="Delete Task"
                    >
                      <i className="fas fa-trash  project-task-icon"></i>
                    </span>
                  </span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </TabPane>
      </TabContent>
      {/* </CardBody>
      </Card> */}
    </Fragment>
  );
});

export default TaskTabsProject;

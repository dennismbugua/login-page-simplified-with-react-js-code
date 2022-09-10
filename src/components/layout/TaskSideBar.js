import React, { useState, useEffect, Fragment } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { projectNamesOnly } from "../../datas/projects";
import SelectBoxSearch from "../common/SelectBoxSearch";

import {
  getEmployeeWorkingProjects,
  getTaskProjectId,
  addProjectFromTask,
} from "../../redux/actions/task/task.action";
import { getLoginUser } from "../../redux/actions/loginAuth/LoginAuth";

import { getProjectsOfEmployee } from "../../redux/actions/projects/projects.action";

const TaskSideBar = (props) => {
  const {
    getEmployeeWorkingProjects,
    getTaskProjectId,
    getProjectsOfEmployee,
    addProjectFromTask,
    getLoginUser,
  } = props;
  const { projectNames } = props.empTask;
  const { login, loginUser, loginInput } = props.loginUser;

  const { employeeProjectList } = props.employeeProjectList;
  const [activeProject, setActiveProject] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [backToHome, setBackToHome] = useState("");

  const [modal, setModal] = useState(false);

  const toggle = React.useCallback(
    () => setModal((prevState) => !prevState),
    []
  );

  useEffect(() => {
    let empId = 31;
    getProjectsOfEmployee(empId);
    getEmployeeWorkingProjects(empId);
  }, [getEmployeeWorkingProjects, getProjectsOfEmployee]);

  useEffect(() => {
    getLoginUser();
  }, []);

  useEffect(() => {
    if (loginUser !== null) {
      if (loginUser.RoleName === "Admin") {
        setBackToHome("/em/adminDashBoard");
      } else {
        setBackToHome("/em/employeeDashBoard");
      }
    }
  }, [loginUser]);

  //   Function .
  // click projects.
  const handleSelectProject = React.useCallback(
    (projectId, projectName, i) => {
      getTaskProjectId(projectId, projectName); // keep the selected project id in reducer to filter the task.
      setActiveProject(i);
    },
    [getTaskProjectId]
  );

  // handle the project name from the selection.
  const handleGetProjectName = React.useCallback((projectName) => {
    setProjectName(projectName.value);
  }, []);

  // handle submite project name.
  const handleSubmitProjectName = React.useCallback(
    (e) => {
      e.preventDefault();
      addProjectFromTask(projectName);
      toggle();
    },
    [addProjectFromTask, projectName, toggle]
  );

  return (
    <Fragment>
      <ul className="list-unstyled components">
        <li className="">
          <a href={backToHome}>
            <i className="fas fa-home"></i>
            <span>Back Home</span>
          </a>
        </li>
        {/* <hr></hr> */}

        {/* <li className="">
          <a href={"#project"} onClick={toggle}>
            <i className="fa fa-plus"></i>
            <span>
              Project
              <i className="fas fa-plus float-right "></i>
            </span>
          </a>
        </li> */}
        {employeeProjectList.map((ListOfprojects, i) =>
          ListOfprojects.projectList.map((projects) => (
            <li
              key={projects.projectId}
              style={{ padding: "-10px" }}
              onClick={() =>
                handleSelectProject(projects.projectID, projects.projectName, i)
              }
              className={classnames({ active: activeProject === i })}
            >
              <a href="#projectName">
                <span>- {projects.projectName}</span>
              </a>
            </li>
          ))
        )}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  empTask: state.taskReducer,
  employeeProjectList: state.projectReducer,
  loginUser: state.loginAuthReducer,
});

export default connect(mapStateToProps, {
  getEmployeeWorkingProjects,
  getProjectsOfEmployee,
  getTaskProjectId,
  addProjectFromTask,
  getLoginUser,
})(TaskSideBar);

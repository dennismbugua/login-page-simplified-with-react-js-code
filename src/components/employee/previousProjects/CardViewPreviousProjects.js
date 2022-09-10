import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Card, CardBody, CardTitle, Button, Progress } from "reactstrap";
// import DropDownActions from "../../common/DropDownActions";
import {
  getWorkExperience,
  updatePreviousProjectList,
  addPreviousProjectList,
  deletePreviousProjectList,
} from "../../../redux/actions/employee/employee.action";

import AddEditFormPreviousProject from "./AddEditFormPreviousProject";

const CardViewPreviousProjects = React.memo((props) => {
  const {
    getWorkExperience,
    updatePreviousProjectList,
    addPreviousProjectList,
    deletePreviousProjectList,
    employeeId,
  } = props;
  const { empworkexp } = props.empworkexp;

  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [selectedpreviousprojects, setSelectedpreviousprojects] = useState("");

  useEffect(() => {
    getWorkExperience(employeeId);
  }, [getWorkExperience]);

  const toggleForm = React.useCallback(() => {
    setIsOpenEditForm((prevState) => !prevState);
  }, [setIsOpenEditForm]);

  const handleProjectEdit = React.useCallback((project) => {
    setSelectedpreviousprojects(project);
    toggleForm();
  }, []);

  const updatePreviousProject = React.useCallback(
    (formData) => {
      updatePreviousProjectList(formData);
    },
    [updatePreviousProjectList]
  );

  const addPreviousProject = React.useCallback(
    (formData) => {
      addPreviousProjectList(formData);
    },
    [addPreviousProjectList]
  );

  const handleClickDeletePreviousProjects = (workExperienceId) => {
    deletePreviousProjectList(workExperienceId);
  };

  return (
    <Fragment>
      {isOpenEditForm ? (
        <AddEditFormPreviousProject
          {...props}
          prevprojects={selectedpreviousprojects}
          toggleForm={toggleForm}
          updatePreviousProject={updatePreviousProject}
          addPreviousProject={addPreviousProject}
        ></AddEditFormPreviousProject>
      ) : (
        empworkexp.map((project, i) => (
          <Col key={i} md={4} sm={6} xl={3}>
            <Card className="project-crad mb-4">
              <CardBody>
                <CardTitle>
                  <h4 className="project-title">
                    <a href="#" onClick={() => handleProjectEdit(project)}>
                      {project.projectName}
                    </a>
                    <div className="edit-del-icon ">
                      <span
                        className="del"
                        onClick={() =>
                          handleClickDeletePreviousProjects(
                            project.workExperienceId
                          )
                        }
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    </div>
                  </h4>
                </CardTitle>
                <span className="text-muted mt-3 project-description">
                  {project.description}
                </span>
                <div className="mt-3">
                  <h4 className="project-title mb-1">Role :</h4>
                  <div className="text-muted">{project.role}</div>
                </div>
                <div className="mt-3">
                  <h4 className="project-title">Environment :</h4>
                  <div className="text-muted">{project.technologies}</div>
                </div>
                <div className="mt-3">
                  <h4 className="project-title">Technologies :</h4>
                  <div className="text-muted">{project.technologies}</div>
                </div>
              </CardBody>
            </Card>
            <Button
              color="primary"
              outline
              className="skill-add-btn"
              onClick={() => {
                setSelectedpreviousprojects({});
                toggleForm();
              }}
            >
              <i className="fa fa-plus"></i>
            </Button>
          </Col>
        ))
      )}
    </Fragment>
  );
});

const mapStateToProps = (state) => ({
  empworkexp: state.empReducer,
});

export default connect(mapStateToProps, {
  getWorkExperience,
  updatePreviousProjectList,
  addPreviousProjectList,
  deletePreviousProjectList,
})(CardViewPreviousProjects);

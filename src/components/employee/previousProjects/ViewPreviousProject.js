import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Collapse, CardBody, Card, CardTitle, Table } from "reactstrap";

import AddEditFormPreviousProject from "./AddEditFormPreviousProject";

import {
  getPreviousProjectList,
  updatePreviousProjectList,
} from "../../../redux/actions/employee/employee.action";

const ViewPreviousProject = (props) => {
  let projectId = props.match.params.workExperienceId;
 
  const { getPreviousProjectList, updatePreviousProjectList } = props;
  const { prevprojects } = props.prevprojects;
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  
  useEffect(() => {    
    getPreviousProjectList(projectId);
  }, [getPreviousProjectList,projectId]);

  const toggleForm = React.useCallback(() => {
    setIsOpenEditForm((prevState) => !prevState);
  }, [setIsOpenEditForm]);

  const updatePreviousProject = React.useCallback((formData) => {   
    updatePreviousProjectList(formData);  
  }, [updatePreviousProjectList]);

  return prevprojects ? (
    <Fragment>
      <Row className="mb-4">
        <Col xs={12} sm={9} md={9} lg={9}>
            <h4>{prevprojects.projectName}</h4>
        </Col>
        <Col xs={12} sm={3} md={3} lg={3}>
          <Button
            color=""
            className="btn-admin-settings w-100"
            onClick={toggleForm}
          >
            Edit Project
          </Button>{" "}
        </Col>
      </Row>

      <Collapse isOpen={isOpenEditForm}>
        <AddEditFormPreviousProject
        {...props}
          prevprojects={prevprojects}
          toggleForm={toggleForm}
          updatePreviousProject={updatePreviousProject}
        ></AddEditFormPreviousProject>
      </Collapse>
      <Collapse isOpen={!isOpenEditForm}>
        <Row className="project-box">
          <Col xs={12} sm={12} md={12} lg={12}>
          <Card className="project-view-crad mb-4">
          <CardBody>
            <span className="text-muted mt-3 project-description">
              {prevprojects.description}
            </span>
          </CardBody>
        </Card>
        </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
          <Card className="project-view-crad mb-4">
            <CardBody>
              <CardTitle>
                <h4 className="project-title">
                  Project Deatils
                </h4>
              </CardTitle>
              <Table striped className="project-details-table mt-4">
                <tbody>
                <tr>
                  <td>Role</td>
                    <td>{prevprojects.role}</td>
                  </tr>
                  <tr>
                    <td>Technologies</td>
                    <td>{prevprojects.technologies}</td>
                  </tr>
                  <tr>
                    <td>Environment</td>
                    <td>{prevprojects.environment}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
          </Col>
        </Row>
      </Collapse>
    </Fragment>
  ) : null;
};

const mapStateToProps = (state) => ({
  prevprojects: state.empReducer
});

export default connect(mapStateToProps, { 
    getPreviousProjectList, 
    updatePreviousProjectList,   
  })(ViewPreviousProject);

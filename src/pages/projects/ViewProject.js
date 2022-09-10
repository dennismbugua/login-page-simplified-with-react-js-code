import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Collapse } from "reactstrap";
import {
  getSelectProject,
  editProject,
} from "../../redux/actions/projects/projects.action";
import { getEmpList } from "../../redux/actions/employee/employee.action";
import { getSkill } from "../../redux/actions/adminSettings/adminSettings.action";

import {
  DescpProject,
  UploadedFilesProject,
  TaskTabsProject,
  DetailsProject,
  LeadersPoject,
  TeamProject,
  TechnologiesProject,
  AddEditFormProject,
} from "../../components/projects/index";

import api from "../../apis/api";

const ViewProject = (props) => {
  let projectId = props.match.params.projectId;

  const { getSelectProject, getEmpList, getSkill, editProject } = props;
  const { skillList } = props.skillList;

  const { selectProject } = props.selectProject;
  const { empList } = props.empList;
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      let tempArr = await api.project().getProjectById(projectId);
      console.log(tempArr.data);
      let selectedProject = tempArr.data[0];
      setProjectDetails(selectedProject);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    getSelectProject(projectId);
    getEmpList();
    getSkill();
  }, [getSelectProject, getEmpList, projectId, getSkill]);

  const toggleForm = React.useCallback(() => {
    setIsOpenEditForm((prevState) => !prevState);
  }, [setIsOpenEditForm]);

  // handle click in AddEditFormProject.js 'update'.
  const handleUpdateProject = React.useCallback(
    (projectData) => {
      console.log(projectData);

      // will get the selected project id from the selectedProject.
      editProject(projectData);
    },
    [editProject]
  );

  return selectProject ? (
    <Fragment>
      {console.log(projectDetails)}
      <Row className="mb-4">
        <Col xs={12} sm={9} md={9} lg={9}>
          <h4>{projectDetails.projectName}</h4>
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
        <AddEditFormProject
          empList={empList}
          skillList={skillList}
          selectedProject={selectProject}
          // selectedProject={projectDetails}

          handleUpdateProject={handleUpdateProject}
          toogleFromProjectAddEditForm={toggleForm}
        ></AddEditFormProject>
      </Collapse>
      <Collapse isOpen={!isOpenEditForm}>
        <Row className="project-box">
          <Col xs={12} sm={9} md={9} lg={9}>
            <DescpProject
              projectName={projectDetails.projectName}
              projectDescp={projectDetails.projectDescription}
              // projectDescp={selectProject.projectDescription}
            ></DescpProject>
            <UploadedFilesProject></UploadedFilesProject>
            <TaskTabsProject></TaskTabsProject>
          </Col>
          <Col xs={12} sm={3} md={3} lg={3}>
            <DetailsProject projectDetails={projectDetails}></DetailsProject>
            <TechnologiesProject
              technologies={selectProject.projectTechnologyList}
            ></TechnologiesProject>
            <LeadersPoject
              leaders={{
                managerId: selectProject.managerID,
                managerName: selectProject.managerName,
                managerPicture: selectProject.managerPicture,
              }}
              empList={empList}
            ></LeadersPoject>
            <TeamProject
              team={selectProject.projectMembersList}
              empList={empList}
            ></TeamProject>
          </Col>
        </Row>
      </Collapse>
    </Fragment>
  ) : null;
};

const mapStateToProps = (state) => ({
  selectProject: state.projectReducer,
  empList: state.empReducer,
  skillList: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getSelectProject,
  editProject,
  getEmpList,
  getSkill,
})(ViewProject);

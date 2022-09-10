import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Container, Collapse, Row, Col } from "reactstrap";

import {
  ProjectsTopRow,
  CardViewProjects,
  useProjectsTableEle,
  AddEditFormProject,
} from "../../components/projects/index";
import {
  getProjectList,
  getProjectsOfEmployee,
  addProject,
  editProject,
  delProject,
} from "../../redux/actions/projects/projects.action";
import { getEmpList } from "../../redux/actions/employee/employee.action";
import { getSkill } from "../../redux/actions/adminSettings/adminSettings.action";
import TableWithSortPagtn from "../../components/common/TableWithSortPagtn";
import { projectsList } from "../../datas/projects";
// require("bootstrap/less/bootstrap.less");

const ListProjects = (props) => {
  const {
    getProjectList,
    getProjectsOfEmployee,
    getEmpList,
    addProject,
    editProject,
    delProject,
    getSkill,
  } = props;
  const { projectList, employeeProjectList } = props.projectList;
  const { empList } = props.empList;
  const { skillList } = props.skillList;

  const searched = useRef(false);
  const [searchArr, setSearchArr] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpenAddEditForm, setIsOpenAddEditForm] = useState(false);
  const [isOpenProjectCardView, setIsOpenProjectCardView] = useState(true);
  const [isOpenProjectGridView, setIsOpenProjectGridView] = useState(false);
  const [isOpenSerachBox, setIsOpenSerachBox] = useState(false);

  // customer hooks to gird view of employee,
  // if search arr is empty then map from list else map from searched arr.
  const { thead, trow } = useProjectsTableEle(searchArr);

  useEffect(() => {
    getProjectList();
    getProjectsOfEmployee(31);
    getEmpList();
    getSkill();
  }, [getProjectList, getEmpList, getSkill]);

  useEffect(() => {
    console.log(employeeProjectList);
    // take not deleted projects, ie activeStatus === true.
    let filterOnlyActiveProject = employeeProjectList.filter(
      (el) => el.projectList[0].activeStatus === true
    );
    setSearchArr(filterOnlyActiveProject);
  }, [employeeProjectList]);

  // -------------Functions

  // handle click in EmployeeAddForm.js 'add'.
  const handleAddProject = React.useCallback(
    (projectData) => {
      addProject(projectData);
    },
    [addProject]
  );

  // handle click in AddEditFormProject.js 'update'.
  const handleUpdateProject = React.useCallback(
    (projectData) => {
      console.log(projectData);
      // will get the selected project id from the selectedProject.
      editProject(projectData);
    },
    [editProject]
  );

  // handle project delete.
  const handleDeleteProject = React.useCallback(
    (delId) => {
      delProject(delId);
    },
    [delProject]
  );

  // handle click in EmployeeCard.js
  const handleProjectEdit = React.useCallback(
    (project) => {
      setSelectedProject(project);
      setIsOpenAddEditForm((prevState) => !prevState);
      setIsOpenProjectCardView(false);
      setIsOpenProjectGridView(false);
    },
    [setIsOpenProjectCardView]
  );

  // open add form.
  const handleOpenAddForm = React.useCallback(() => {
    setIsOpenAddEditForm((prevState) => !prevState);
    setIsOpenProjectCardView(false);
    setIsOpenProjectGridView(false);
    setSelectedProject(null);
  }, [setIsOpenAddEditForm, setIsOpenProjectCardView]);

  const toogleFromProjectAddEditForm = React.useCallback(() => {
    setIsOpenAddEditForm((prevState) => !prevState);
    setIsOpenProjectCardView((prevState) => !prevState);
    setSelectedProject("");
  }, [setIsOpenAddEditForm, setIsOpenProjectCardView]);

  const showGridView = React.useCallback(() => {
    setIsOpenProjectCardView(false);
    setIsOpenProjectGridView(true);
    setIsOpenAddEditForm(false);
  }, [setIsOpenProjectCardView]);

  const showProjectCard = React.useCallback(() => {
    setIsOpenProjectGridView(false);
    setIsOpenProjectCardView(true);
    setIsOpenAddEditForm(false);
  }, [setIsOpenProjectGridView]);

  // search texh box show.
  const searchBox = React.useCallback(() => {
    setIsOpenSerachBox((prevState) => !prevState);
  }, [setIsOpenSerachBox]);

  // search filter.
  const serachProjectList = React.useCallback(
    (whatSearch, searchVal) => {
      searched.current = true;
      if (whatSearch === "projectName") {
        let searchArr = employeeProjectList.filter((ele) => {
          return (
            // after map that data structure will give a single element [0] array, then compare in that array,
            ele.projectList[0].projectName
              .toLowerCase()
              .indexOf(searchVal.toLowerCase()) !== -1 &&
            ele.projectList[0].activeStatus === true
          );
        });

        setSearchArr(searchArr);
      } else if (whatSearch === "leader") {
        let managerSearchVal = employeeProjectList.filter(
          (ele) =>
            // after map that data structure will give a single element [0] array, then compare in that array,
            ele.projectList[0].managerName
              .toLowerCase()
              .indexOf(searchVal.toLowerCase()) !== -1 &&
            ele.projectList[0].activeStatus === true
        );
        setSearchArr(managerSearchVal);
      }
    },
    [employeeProjectList]
  );

  console.log("rendering");
  return (
    <Fragment>
      <Container>
        {/* Top Row.--------------------------------- */}
        <ProjectsTopRow
          isOpenSerachBox={isOpenSerachBox}
          isOpenEmpGridView={isOpenProjectGridView}
          isOpenEmpListCard={isOpenProjectCardView}
          serachProjectList={serachProjectList}
          handleOpenAddForm={handleOpenAddForm}
          showEmpCard={showProjectCard}
          showGridView={showGridView}
          searchBox={searchBox}
        ></ProjectsTopRow>
        {/* <hr></hr> */}
        {/* Project Card list.--------------------------- */}
        <Collapse isOpen={isOpenProjectCardView} className="mt-3">
          <Row className="project-box">
            {/* Project Card list comp.--------------------------- */}
            <CardViewProjects
              projectList={searchArr}
              handleProjectEdit={handleProjectEdit}
              handleDeleteProject={handleDeleteProject}
            ></CardViewProjects>
          </Row>
        </Collapse>

        {/* Emp Grid View.--------------------------- */}
        <Collapse isOpen={isOpenProjectGridView}>
          <Row>
            <Col className="projects-gridView">
              <TableWithSortPagtn
                thead={thead}
                trow={trow}
              ></TableWithSortPagtn>
            </Col>
            {/* span ele for styling */}
          </Row>
        </Collapse>

        {/* Add & edit employee form.------------------------ */}
        <Collapse isOpen={isOpenAddEditForm}>
          <AddEditFormProject
            empList={empList}
            skillList={skillList}
            selectedProject={selectedProject}
            handleAddProject={handleAddProject}
            handleUpdateProject={handleUpdateProject}
            toogleFromProjectAddEditForm={toogleFromProjectAddEditForm}
          ></AddEditFormProject>
        </Collapse>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  projectList: state.projectReducer,
  empList: state.empReducer,
  skillList: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getProjectList,
  getProjectsOfEmployee,
  getEmpList,
  getSkill,
  addProject,
  editProject,
  delProject,
})(ListProjects);

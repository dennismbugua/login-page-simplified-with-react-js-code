import React, { useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import {
  getSelectedEmp,
  addEmpSkill,
} from "../../redux/actions/employee/employee.action";
import {
  EmpProfileViewTopCard,
  EmpProfileViewTabs,
} from "../../components/employee/index";
import { getProjectsOfEmployee } from "../../redux/actions/projects/projects.action";

const EmployeeProfileView = (props) => {
  let empId = props.match.params.empId;

  const { getSelectedEmp, getProjectsOfEmployee } = props;
  const { selectEmp } = props.selectEmp;

  useEffect(() => {
    getSelectedEmp(empId);
    getProjectsOfEmployee(empId);
  }, [getSelectedEmp, getProjectsOfEmployee, empId]);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Profile</h3>
        </Col>
      </Row>
      <EmpProfileViewTopCard selectEmp={selectEmp}></EmpProfileViewTopCard>
      <EmpProfileViewTabs {...props}></EmpProfileViewTabs>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  selectEmp: state.empReducer,
  projectList: state.projectReducer,
});

export default connect(mapStateToProps, {
  getSelectedEmp,
  addEmpSkill,
  getProjectsOfEmployee,
})(EmployeeProfileView);

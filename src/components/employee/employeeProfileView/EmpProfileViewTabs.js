import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";
import { getSelectedEmp } from "../../../redux/actions/employee/employee.action";

import classnames from "classnames";
import {
  TabCertification,
  TabProfile,
  TabProjects,
  TabRewards,
  TabSkill,
} from "./";

const EmpProfileViewTabs = React.memo((props) => {
  let empId = props.match.params.empId;

  const { addEmpSkill } = props;

  const { selectEmp, empeducationalInfo } = props.selectEmp;
  const { projectList, employeeProjectList } = props.projectList;

  const [activeTab, setActiveTab] = useState("rewards");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // Functions.

  const handleAddEmpSkill = React.useCallback(
    (empNewSkill, skillId, whichCategorySkill) => {
      addEmpSkill(empNewSkill, skillId, 29, whichCategorySkill);
    },
    [addEmpSkill]
  );

  return (
    <div>
      <Nav tabs className="mt-2">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "profile" })}
            onClick={() => {
              toggle("profile");
            }}
          >
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "projects" })}
            onClick={() => {
              toggle("projects");
            }}
          >
            Projects
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "skills" })}
            onClick={() => {
              toggle("skills");
            }}
          >
            Skills
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "certification" })}
            onClick={() => {
              toggle("certification");
            }}
          >
            Certification
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "rewards" })}
            onClick={() => {
              toggle("rewards");
            }}
          >
            Rewards
          </NavLink>
        </NavItem>
      </Nav>
      {/* Tab content.----------------------------------------------------- */}
      <TabContent activeTab={activeTab} className="mt-2">
        <TabPane tabId="profile">
          <TabProfile
            {...props}
            selectEmp={selectEmp}
            educationalInfo={empeducationalInfo}
            employeeId={empId}
          ></TabProfile>
        </TabPane>
        <TabPane tabId="projects">
          <TabProjects
            projectList={employeeProjectList}
            employeeId={empId}
          ></TabProjects>
        </TabPane>
        <TabPane tabId="skills">
          <TabSkill employeeId={empId}></TabSkill>
        </TabPane>
        <TabPane tabId="certification">
          <TabCertification employeeId={empId}></TabCertification>
        </TabPane>
        <TabPane tabId="rewards">
          <TabRewards {...props} employeeId={empId}></TabRewards>
        </TabPane>
      </TabContent>
    </div>
  );
});

const mapStateToProps = (state) => ({
  selectEmp: state.empReducer,
  projectList: state.projectReducer,
});

export default connect(mapStateToProps, {
  getSelectedEmp,
})(EmpProfileViewTabs);

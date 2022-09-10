import React, { Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import { CardViewProjects } from "../../projects/index";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import CardViewPreviousProjects from "../previousProjects/CardViewPreviousProjects";
import classnames from "classnames";
import { projectsList } from "../../../datas/projects";

const TabProjects = React.memo(({ projectList, employeeId }) => {
  const [activeTab, setActiveTab] = useState("currentproject");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Fragment>
      <Nav tabs className="mt-2">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "currentproject" })}
            onClick={() => {
              toggle("currentproject");
            }}
          >
            Current Projects
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "previousprojects",
            })}
            onClick={() => {
              toggle("previousprojects");
            }}
          >
            Previous Company Projects
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="mt-2">
        <TabPane tabId="currentproject">
          <Row className="project-box">
            <CardViewProjects projectList={projectList}></CardViewProjects>
          </Row>
        </TabPane>
        <TabPane tabId="previousprojects">
          <Row className="project-box">
            <CardViewPreviousProjects employeeId={employeeId}>
              {" "}
            </CardViewPreviousProjects>
          </Row>
        </TabPane>
      </TabContent>
    </Fragment>
  );
});

export default TabProjects;

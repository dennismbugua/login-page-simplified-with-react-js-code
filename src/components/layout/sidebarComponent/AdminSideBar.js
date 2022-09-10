import React, { Fragment } from "react";
import { LiSingleTreeElement, LiElements } from "../index";
import { adminSideBar } from "./sideBarJSON";

const AdminSideBar = ({
  handleProject,
  handleEmployeeSetting,
  handlePayRoll,
  handleFinance,
  activeSideBar,
  toggle,
}) => {
  return (
    <Fragment>
      <ul className="list-unstyled components">
        {/* Dashboard */}
        <LiSingleTreeElement
          menuName={adminSideBar.dashboard.menuName}
          menuIcon={adminSideBar.dashboard.menuIcon}
          route={adminSideBar.dashboard.route}
          activeSideBar={activeSideBar}
          toggle={toggle}
        />
        {/* Admin Settings */}
        <LiSingleTreeElement
          menuName={adminSideBar.adminSettings.menuName}
          menuIcon={adminSideBar.adminSettings.menuIcon}
          route={adminSideBar.adminSettings.route}
          activeSideBar={activeSideBar}
          toggle={toggle}
        />

        {/* Project */}
        <LiElements
          liData={adminSideBar.project}
          toggleList={handleProject.func}
          isOpenList={handleProject.state}
          activeSideBar={activeSideBar}
          toggle={toggle}
        />
        {/* Employee Settings. */}
        <LiElements
          liData={adminSideBar.employeeSettings}
          toggleList={handleEmployeeSetting.func}
          isOpenList={handleEmployeeSetting.state}
          activeSideBar={activeSideBar}
          toggle={toggle}
        />

        {/* PayRoll. */}
        <LiElements
          liData={adminSideBar.payRoll}
          toggleList={handlePayRoll.func}
          isOpenList={handlePayRoll.state}
          activeSideBar={activeSideBar}
          toggle={toggle}
        />
        {/* Finance. */}
        <LiElements
          liData={adminSideBar.finance}
          toggleList={handleFinance.func}
          isOpenList={handleFinance.state}
          activeSideBar={activeSideBar}
          toggle={toggle}
        />
      </ul>
    </Fragment>
  );
};

export default AdminSideBar;

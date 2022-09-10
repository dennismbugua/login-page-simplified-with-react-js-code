import React, { Fragment } from "react";
// From index.
import { LiElements, LiSingleTreeElement } from "../index";

const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : 0;

const sideBarDatas = {
  dashboard: {
    menuName: "Dashboard",
    menuIcon: "fab fa-product-hunt",
    route: "/em/employeeDashboard",
  },
  dailyWorkStatus: {
    menuName: "Daily Work Status",
    menuIcon: "fab fa-product-hunt",
    route: "/em/dailyWorkStatus",
  },

  "project board": {
    menuName: "Project Board",
    menuIcon: "fab fa-product-hunt",
    subMenu: [
      {
        icon: "fas fab fa-product-hunt",
        subMenuName: "Back Logs",
        route: "/em/taskManagment",
      },
      {
        icon: "fas fab fa-product-hunt",
        subMenuName: "Task Board",
        route: "/em/taskBoard/54",
      },
    ],
  },

  myRewards: {
    menuName: "My Rewards",
    menuIcon: "fab fa-product-hunt",
    route: `/em/empRewards`,

    // route: `/empRewards/${user.EmployeeId}`,
  },
  myProfile: {
    menuName: "My Profile",
    menuIcon: "fab fa-product-hunt",
    route: `/em/empProfile`,
    // route: `/empProfile/${user.EmployeeId}`,
  },

  helpdesk: {
    menuName: "Helpdesk",
    menuIcon: "fab fa-product-hunt",
    subMenu: [
      {
        icon: "fas fab fa-product-hunt",
        subMenuName: "HelpDesk",
        route: "/em/helpdesk",
      },
      {
        icon: "fas fab fa-product-hunt",
        subMenuName: "Ticket Details",
        route: "/em/ticketDetails",
      },
      {
        icon: "fas fab fa-product-hunt",
        subMenuName: "My Tickets",
        route: "/em/ListAllTicktes",
      },
      {
        icon: "fas fab fa-product-hunt",
        subMenuName: "All Tickets",
        route: "/em/adminListAllTickets",
      },
    ],
  },
};

const EmployeeSideBar = ({
  loginUser,
  handleProject,
  handleHelpDesk,
  activeSideBar,
  toggle,
}) => {
  return (
    <Fragment>
      <ul className="list-unstyled components">
        <LiSingleTreeElement
          route={sideBarDatas.dashboard.route}
          menuIcon={sideBarDatas.dashboard.menuIcon}
          menuName={sideBarDatas.dashboard.menuName}
          activeSideBar={activeSideBar}
          toggle={toggle}
        ></LiSingleTreeElement>
        <LiSingleTreeElement
          route={sideBarDatas.dailyWorkStatus.route}
          menuIcon={sideBarDatas.dailyWorkStatus.menuIcon}
          menuName={sideBarDatas.dailyWorkStatus.menuName}
          activeSideBar={activeSideBar}
          toggle={toggle}
        ></LiSingleTreeElement>
        {/* My Reward */}
        <LiSingleTreeElement
          route={`${sideBarDatas.myRewards.route}/${loginUser.EmployeeId}`}
          menuIcon={sideBarDatas.myRewards.menuIcon}
          menuName={sideBarDatas.myRewards.menuName}
          activeSideBar={activeSideBar}
          toggle={toggle}
        ></LiSingleTreeElement>
        {/* My profile */}
        <LiSingleTreeElement
          route={`${sideBarDatas.myProfile.route}/${loginUser.EmployeeId}`}
          menuIcon={sideBarDatas.myProfile.menuIcon}
          menuName={sideBarDatas.myProfile.menuName}
          activeSideBar={activeSideBar}
          toggle={toggle}
        ></LiSingleTreeElement>

        {/* Project Board */}
        <LiElements
          liData={sideBarDatas["project board"]}
          toggleList={handleProject.func}
          isOpenList={handleProject.state}
          activeSideBar={activeSideBar}
          toggle={toggle}
        ></LiElements>

        <LiElements
          liData={sideBarDatas.helpdesk}
          toggleList={handleHelpDesk.func}
          isOpenList={handleHelpDesk.state}
          activeSideBar={activeSideBar}
          toggle={toggle}
        ></LiElements>
      </ul>
    </Fragment>
  );
};

export default EmployeeSideBar;

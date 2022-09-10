import React, { Fragment, useEffect, useState } from "react";
import classnames from "classnames";

export default function AdminSettingsSideBar(props) {
  const { activeTab, toggle, loginUser } = props;
  const [backToHome, setBackToHome] = useState(null);

  // console.log(loginUser);
  // useEffect(() => {
  //   if (loginUser !== null) {
  //     if (loginUser.RoleName === "Admin") {
  //       setBackToHome("/adminDashboard");
  //     } else {
  //       setBackToHome("/employeeDashboard");
  //     }
  //   }
  // }, [loginUser]);

  return (
    <Fragment>
      <ul className="list-unstyled components">
        <li className={classnames({ active: activeTab === "1" })}>
          <a
            href={"/adminDashboard"}
            aria-expanded="false"
            onClick={() => toggle("1")}
          >
            <i className="fas fa-home"></i>
            <span>Back to Home</span>
          </a>
        </li>
        <hr></hr>
        <li
          className={classnames({
            active: activeTab === "/companylocation",
          })}
        >
          <a href="/companylocation" onClick={() => toggle("/companylocation")}>
            <i className="far fa-compass"></i>
            <span>Company Location</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/department" })}>
          <a
            href="/department"
            onClick={() => {
              toggle("/department");
            }}
          >
            <i className="fas fa-briefcase"></i>
            <span>Department</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/designation" })}>
          <a
            href="/designation"
            onClick={() => {
              toggle("/designation");
            }}
          >
            <i className="fas fa-address-card"></i>
            <span>Designation</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/workprimise" })}>
          <a
            href="/workprimise"
            onClick={() => {
              toggle("/workprimise");
            }}
          >
            <i className="far fa-building"></i>
            <span>Work Primies</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/employeetype" })}>
          <a
            href="/employeetype"
            onClick={() => {
              toggle("/employeetype");
            }}
          >
            <i className="fas fa-user-tie"></i>
            <span>Employee Type</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/reward" })}>
          <a
            href="/reward"
            onClick={() => {
              toggle("/reward");
            }}
          >
            <i className="fas fa-award"></i>
            <span>Rewards</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/assets" })}>
          <a
            href="/assets"
            onClick={() => {
              toggle("/assets");
            }}
          >
            <i className="fas fa-shopping-bag"></i>
            <span>Assets</span>
          </a>
        </li>
        <li
          className={classnames({ active: activeTab === "/rolesndpermission" })}
        >
          <a
            href="/rolesndpermission"
            onClick={() => {
              toggle("/rolesndpermission");
            }}
          >
            <i className="fas fa-key"></i>
            <span>Roles and Permissions</span>
          </a>
        </li>
        <li
          className={classnames({ active: activeTab === "/holidaycalender" })}
        >
          <a
            href="/holidaycalender"
            onClick={() => {
              toggle("/holidaycalender");
            }}
          >
            <i className="far fa-calendar-alt"></i>
            <span>Holiday Calender</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/leavetype" })}>
          <a
            href="/leavetype"
            onClick={() => {
              toggle("/leavetype");
            }}
          >
            <i className="fas fa-image"></i>
            <span>Leave Type</span>
          </a>
        </li>
        <li className={classnames({ active: activeTab === "/companypolicy" })}>
          <a
            href="/companypolicy"
            onClick={() => {
              toggle("/companypolicy");
            }}
          >
            <i className="fas fa-image"></i>
            <span>Company Polices</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );
}

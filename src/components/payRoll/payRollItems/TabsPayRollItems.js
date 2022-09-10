import React, { Fragment, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import {
  AdditionPayRollItems,
  SalaryBreakUpTemplate,
  DeductionPayRollItems,
} from "../index";

const TabsPayRollItems = React.memo(
  ({ empList, payRollItem, handleShowGenerateSalarayBtn }) => {
    const [activeTab, setActiveTab] = useState("addition");

    //   Function.
    const toggle = (tab) => {
      if (activeTab !== tab) setActiveTab(tab);
    };

    return (
      <div className="mt-4">
        <Fragment>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "addition" })}
                onClick={() => {
                  toggle("addition");
                }}
              >
                Addition
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "deduction" })}
                onClick={() => {
                  toggle("deduction");
                }}
              >
                Deduction
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="addition">
              <AdditionPayRollItems
                empList={empList}
                payRollItem={payRollItem}
                handleShowGenerateSalarayBtn={handleShowGenerateSalarayBtn}
              ></AdditionPayRollItems>
            </TabPane>
            <TabPane tabId="deduction">
              <DeductionPayRollItems
                empList={empList}
                payRollItem={payRollItem}
                handleShowGenerateSalarayBtn={handleShowGenerateSalarayBtn}
              ></DeductionPayRollItems>
            </TabPane>
          </TabContent>
        </Fragment>
      </div>
    );
  }
);

export default TabsPayRollItems;

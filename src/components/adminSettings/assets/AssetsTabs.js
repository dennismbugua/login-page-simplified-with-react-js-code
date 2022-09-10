import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { GridViewAsset, EmployeeAssets } from "./index";

const AssetTabs = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            All Assets
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Employee Assets
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <GridViewAsset
            assets={props.assets}
            itemList={props.itemList}
            openAssetItem={props.openAssetItem}
            openAddForm={props.openAddForm}
            handleSelectedAsset={props.handleSelectedAsset}
          ></GridViewAsset>
        </TabPane>
        <TabPane tabId="2">
          <EmployeeAssets
            assets={props.assets}
            empList={props.userList}
          ></EmployeeAssets>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AssetTabs;

import React, { useState, useEffect, Fragment } from "react";
import { Nav, NavItem, NavLink, Card, Row, Col, Collapse } from "reactstrap";
import classnames from "classnames";
import TabRolesNdPermissions from "../../../components/adminSettings/tabRolesNdPermission/TabRolesNdPermissions";
import {
  FromFields,
  FromEditFields,
} from "../../../components/adminSettings/index";

let roleInfofromApi = [
  {
    role: "Admin",
    moduleAccess: [
      { Employee: true },
      { Reward: false },
      { "Attendence Managment": true },
      { "Leave Managment": true },
      { "Performance Goal Managment": false },
      { "Project Managment": true },
      { "Task Managment": true },
      { "Manage Sprint": true },
      { "Performance Apriasal": true },
    ],
    modulePermission: [
      {
        Employee: [
          { read: true },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: true },
        ],
      },
      {
        Reward: [
          { read: false },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: true },
        ],
      },
    ],
  },
  // ------------------------------------------------
  {
    role: "Hr",
    moduleAccess: [
      { Employee: false },
      { Reward: false },
      { "Attendence Managment": true },
      { "Leave Managment": true },
      { "Performance Goal Managment": false },
      { "Project Managment": true },
      { "Task Managment": true },
      { "Manage Sprint": false },
    ],
    modulePermission: [
      {
        Employee: [
          { read: true },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: false },
        ],
      },
      {
        Reward: [
          { read: false },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: false },
        ],
      },
    ],
  },
  // ------------------------------------------------
  {
    role: "Employee",
    moduleAccess: [
      { Employee: true },
      { Reward: false },
      { "Attendence Managment": true },
      { "Leave Managment": true },
      { "Performance Goal Managment": false },
      { "Project Managment": true },
      { "Task Managment": true },
      { "Manage Sprint": true },
    ],
    modulePermission: [
      {
        Employee: [
          { read: true },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: true },
        ],
      },
      {
        Reward: [
          { read: true },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: true },
        ],
      },
    ],
  },
  // ------------------------------------------------

  {
    role: "Manager",
    moduleAccess: [
      { Employee: true },
      { Reward: false },
      { "Attendence Managment": true },
      { "Leave Managment": true },
      { "Performance Goal Managment": false },
      { "Project Managment": true },
      { "Task Managment": true },
      { "Manage Sprint": true },
    ],
    modulePermission: [
      {
        Employee: [
          { read: true },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: true },
        ],
      },
      {
        Reward: [
          { read: true },
          { write: true },
          { create: false },
          { delete: false },
          { import: true },
          { export: true },
        ],
      },
    ],
  },
];

export default function RolesNdPermissions() {
  const [activeTab, setActiveTab] = useState("Admin");
  const [roleData, setRoleData] = useState([]);
  const [roleDataActive, setRoleDataActive] = useState([]);
  const [collapse, setCollapse] = useState({});
  // form states
  const [roleName, setRoleName] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedData, setSelectedData] = useState({ id: "", val: "" });

  const [roleInpuFields] = useState([
    {
      label: "Role Name",
      type: "text",
      placeholder: "Enter Role Name",
      name: "type1", // this name should be equal to the designation array key's.
      handleOnChange: (val) => {
        console.log(val);
        setRoleName(val);
      },
    },
  ]);

  useEffect(() => {
    setRoleData(roleInfofromApi);
    setRoleDataActive(roleInfofromApi[0]);
  }, []);

  // Function -------------------
  // on change in text field for updating, then from FormField component
  // onChange call this func and replace the value in selectedData by the key name
  // which we have assigned in the name in inputField state.
  const handleOnchangeToSelectedData = (val, field) => {
    selectedData.val[field] = val; // change a particular key in the selected designation.
    // setSelectedDesg(selectedDesg);
  };
  //  on click the tile ,open the from with data filed.
  const handleEditClick = (val, id) => {
    setSelectedData({ id: id, val: { type1: val } });
  };

  const handleDataAdd = (e) => {
    e.preventDefault();
    console.log(roleName);
    setIsOpenForm(!isOpenForm);
  };
  const handleDataUpdate = (e) => {
    e.preventDefault();
    console.log(roleName);
    setSelectedData({ id: "", val: "" });
    setIsOpenForm(!isOpenForm);
  };

  // step 6.
  const handleToggleBtnChange = (moduleName, onOff) => {
    if (onOff) {
      // step 7.
      // find the index of module to update to true,
      let indexofToggledModule = roleDataActive.moduleAccess.findIndex(
        // String(Object.keys(ele)) gives the key name, which is the module name.
        // then compare with toggled moduleName, when matched return that index.
        (ele) => String(Object.keys(ele)) === String(moduleName)
      );
      // pass the index to array and update with moduleName(ie moduleName[0]) to true.
      roleDataActive.moduleAccess[indexofToggledModule] = {
        [moduleName[0]]: true,
      };
      // set the moduleName and to true in collapse, so corresponding
      // moduleName modulePermission open.(in TabRolesNdPermission.js)
      setCollapse({ [moduleName[0]]: true });
    } else {
      // same proccess as above, but update to fasle.
      let indexofToggledModule = roleDataActive.moduleAccess.findIndex(
        (ele) => String(Object.keys(ele)) === String(moduleName)
      );
      roleDataActive.moduleAccess[indexofToggledModule] = {
        [moduleName[0]]: false,
      };
      // set the moduleName and to false in collapse, so corresponding
      // moduleName modulePermission close.(in TabRolesNdPermission.js)
      setCollapse({ [moduleName[0]]: false });
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Fragment>
      <Row>
        <Col sm={8} xs={4}>
          <h3>Roles {"&"} Permissions </h3>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col sm={3}>
          <Row>
            <Col className="mb-3 ">
              <Card
                body
                inverse
                className="card-tile"
                onClick={() => {
                  setIsOpenForm(!isOpenForm);
                }}
              >
                <i className="fas fa-plus  text-center "></i>
              </Card>
            </Col>
          </Row>
          <Nav tabs vertical className="sideTab">
            {/* step 1 */}
            {roleData.map((roleData, i) => {
              return (
                <NavItem>
                  <NavLink
                    className={classnames(
                      // roleData.role gives which role
                      { activeTab: activeTab === roleData.role },
                      "tabName"
                    )}
                    onClick={() => {
                      toggle(roleData.role);
                      setRoleDataActive(roleData);
                    }}
                  >
                    {roleData.role}
                    <i className="fas fa-trash float-right edit-icon circle-icon"></i>
                    {/* onClick to open form for edit the role name */}
                    <i
                      className="fas fa-pencil-alt float-right edit-icon circle-icon"
                      onClick={() => {
                        handleEditClick(roleData.role, i);
                        setIsOpenForm(true);
                      }}
                    ></i>
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Col>
        <Col>
          <Collapse isOpen={isOpenForm}>
            {selectedData.id !== "" ? (
              <FromEditFields
                inputFields={roleInpuFields}
                handleOnchangeToSelectedData={(val, field) =>
                  handleOnchangeToSelectedData(val, field)
                }
                handleSubmit={handleDataUpdate}
                formData={selectedData}
                button={"Update"}
                toggle={() => setIsOpenForm(!isOpenForm)}
                formValidation={{}}
              ></FromEditFields>
            ) : (
              <FromFields
                inputFields={roleInpuFields}
                handleSubmit={handleDataAdd}
                button={"Add"}
                toggle={() => setIsOpenForm(!isOpenForm)}
                formValidation={{}}
              ></FromFields>
            )}
          </Collapse>
          <Collapse isOpen={!isOpenForm}>
            {/* step 5 */}
            <TabRolesNdPermissions
              roleDataActive={roleDataActive}
              collapse={collapse}
              handleToggleBtnChange={handleToggleBtnChange}
              hanndleClosePermission={() => setCollapse({})}
            />
          </Collapse>
        </Col>
      </Row>
    </Fragment>
  );
}

//  # Doc :

// Date from Api: here roleDate ,it has an array of obj, ie: roleDate= [],
// each ele in the array is obj with key- role,moduleAccess,modulePermission,
// role : string , that tell which role is that,
// moduleAccess : arr of obj's, which have [key:value] as [moduleName : (access true/false)].
//  moduleAccess gives all the modules for a corresponding role.
// modulePermission : arr of obj;s which have [key:value] as [moduleName:(arr of permission to give)].
//  (arr of permission to give) gives the date about whatol permission has a role have to a correcponding module.

// Working:
// step 1 : map through the roleDate so we get the no: of roles.
// step 2 : if the add btn click show form ,
// step 3 : if edit btn click show formEditFields.
// step 4 : if isOpenForm is false the make true for side module access section to show.
// step 5 : Pass as props to TabRolesNdPermissions child comp.
//  roleDataActive: selected role datas from initial setup
//  and also when sideRole Tab click roleDataActive get updated with selected role data
//  collapse: to know the module permission list collaped or not
//  handleToggleBtnChange: func to do when module access toggle btn click
//  hanndleClosePermission: func to close the modulePermission list

// step 6 : when the toggleBtn is clicked, calls handleToggleBtnChange-func with arg(moduleName, onOff).
//  it gets moduleName and onOff to know access to that module for that role is true or false
// step 7 : if the moduleAccess is true(ie: onOff- true), then make the access to that module TRUE for the selected role.
//

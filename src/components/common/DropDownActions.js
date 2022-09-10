import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropDownActions = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  // const [selectedOpt, setSelectedOpt] = useState("");

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="">
        <i className="fas fa-ellipsis-v text-muted"></i>
      </DropdownToggle>
      <DropdownMenu style={{ minWidth: "0px" }}>
        {props.dropDownOption.map((opt, i) => {
          return (
            <DropdownItem key={i} onClick={opt.handleAction}>
              {opt.action}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default DropDownActions;

//  # Component descp.
//  Eg : Parent comp : LeaveType.js
//       Sub comp : ListView.js
//       End comp : DropDownBtn.js

// Parent comp send props(data)-to Sub Comp.
// 1.handleDropDownOnChange : function to know the change in dropdown list.
// 2.dropDownOption : options to list in the dropdown list.

// Sub Comp send props(data)- to End Comp
// 1.selectedOpt : to know which option is selected correspond to the row(ie: if a leave type is active or not)
// ...with all the props from the parent comp send to End Comp

// # work flow in this comp.
// Note : we can not make selected option to render cuz it doest have
// icon, which has to be display in table, as it is coming from ListView

// 1. So, in useEffect find selectedOpt in dropDownOption
// to get the icon and option-name from dropDownOption ,
// so to display which option is selected.

// 2. Map through the dropDownOption to list all the option in dropdown

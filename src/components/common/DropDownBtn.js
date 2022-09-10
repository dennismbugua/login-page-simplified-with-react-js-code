import React, { useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropDownBtn = (props) => {
  // const {dropDownOption,selectedOpt} = props
  const [dropdownOpen, setOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState("");

  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    let opt = props.dropDownOption.find(
      (ele) => ele.option.toLowerCase() === props.selectedOpt.toLowerCase()
    );
    setSelectedOpt(opt);
  }, [props.dropDownOption, props.selectedOpt]);

  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      style={{ width: "100%" }}
      toggle={toggle}
    >
      <DropdownToggle
        color=""
        style={{
          border: "1px solid black",
          borderRadius: "30px",
          width: "100px",
          fontSize: "11px",
        }}
      >
        {selectedOpt.icon} &nbsp;
        {selectedOpt.option}
        {/* {ref.current.selectedOpt.option} */}
        &nbsp;
        <i className="fas fa-caret-down"></i>
      </DropdownToggle>
      <DropdownMenu>
        {props.dropDownOption.map((opt, i) => {
          return (
            <DropdownItem
              key={i}
              onClick={() =>
                props.handleDropDownOnChange(opt.option.toLowerCase())
              }
            >
              {opt.icon}&nbsp;
              {opt.option}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default DropDownBtn;

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

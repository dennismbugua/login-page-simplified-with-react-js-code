import React, { useState, useEffect, Fragment } from "react";

const useLeaveTypeTable = (
    leavetypeData,
    handleDelLeaveType,
    handleEditLeaveType,
    onClickToggleFromTable
) => {
  const [thead] = useState(["Leave Type","Leaves Per Year","Leaves Carry Forwarded","Leaves Applied Per Year", "Action"]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trowArr = leavetypeData.map((el) => {
      return {
        "Leave Type": el.leaveType,
        "Leaves Per Year": el.noOfLeavesPerYear,
        "Leaves Carry Forwarded": el.noOfLeavesCarryForwarded,
        "Leaves Applied Per Year": el.noOfLeavesAppliedPerYear,
        Action: (
          <Fragment>
            <i
              className="fas fa-trash"
              onClick={() => handleDelLeaveType(el.leaveId)}
            ></i>
            <i
              className="fas fa-edit ml-4"              
              onClick={() => {
                handleEditLeaveType(el, el.leaveId);
                onClickToggleFromTable();
             }}
            ></i>
          </Fragment>
        ),
      };
    });

     setTrow(trowArr);
  }, [
    leavetypeData,
    handleDelLeaveType,
    handleEditLeaveType,
    onClickToggleFromTable
  ]);

  return { thead, trow };
};

export default useLeaveTypeTable;
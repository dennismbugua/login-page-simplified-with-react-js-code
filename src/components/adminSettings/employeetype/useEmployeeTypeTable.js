import React, { useState, useEffect, Fragment } from "react";

const useEmployeeTypeTable = (
    emptypeData,
    handleDelEmployeeType,
    handleEditEmployeeType,
    onClickToggleFromTable
) => {
  const [thead] = useState(["Employee Type", "Action"]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trowArr = emptypeData.map((el) => {
      return {
        "Employee Type": el.employeeTypeValue,
        Action: (
          <Fragment>
            <i
              className="fas fa-trash"
              onClick={() => handleDelEmployeeType(el.employeeTypeId)}
            ></i>
            <i
              className="fas fa-edit ml-4"              
              onClick={() => {
                handleEditEmployeeType(el, el.employeeTypeId);
                onClickToggleFromTable();
             }}
            ></i>
          </Fragment>
        ),
      };
    });

     setTrow(trowArr);
  }, [
    emptypeData,
    handleDelEmployeeType,
    handleEditEmployeeType,
    onClickToggleFromTable
  ]);

  return { thead, trow };
};

export default useEmployeeTypeTable;
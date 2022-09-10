import React, { useState, useEffect, Fragment } from "react";

const useDepartmentTable = (
  departmentData,
   handleDelDepartment,
  handleEditDepartment,
  onClickToggleFromTable
) => {
  const [thead] = useState(["Department Name", "Action"]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trowArr = departmentData.map((el) => {
      return {
        "Department Name": el.departmentName,
        Action: (
          <Fragment>
            <i
              className="fas fa-trash"
              onClick={() => handleDelDepartment(el.departmentId)}
            ></i>
            <i
              className="fas fa-edit ml-4"              
              onClick={() => {
                handleEditDepartment(el, el.departmentId);
                onClickToggleFromTable();
             }}
            ></i>
          </Fragment>
        ),
      };
    });

     setTrow(trowArr);
  }, [
    departmentData,
    handleDelDepartment,
    handleEditDepartment,
    onClickToggleFromTable
  ]);

  return { thead, trow };
};

export default useDepartmentTable;
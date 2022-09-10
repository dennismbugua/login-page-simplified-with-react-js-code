import React, { useState, useEffect, Fragment } from "react";

const useDesignationTableEle = (
  designationList,
  departmentList,
  handleDelDesignation,
  handleEditDesgnation,
  onClickToggleFromTable
) => {
  const [thead] = useState(["Designation Name","Department Name", "Action"]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
   if (departmentList.length > 0){
    let trowArr = designationList.map((desiglist) => {
      return {
        "Designation Name": desiglist.designationName,
        "Department Name":  departmentList.filter((deptlist) => deptlist.departmentId === parseInt(desiglist.departmentId))[0].departmentName,
        Action: (
          <Fragment>
            <i
              className="fas fa-trash"
              onClick={() => handleDelDesignation(desiglist.designationId)}
            ></i>
            <i
              className="fas fa-edit ml-4"              
              onClick={() => {
                handleEditDesgnation(desiglist, desiglist.designationId);
                onClickToggleFromTable();
             }}
            ></i>
          </Fragment>
        ),
      };
    });

     setTrow(trowArr);
  }}, [
    designationList,
    departmentList,
    handleDelDesignation,
    handleEditDesgnation,
    onClickToggleFromTable
  ]);

  return { thead, trow };
};

export default useDesignationTableEle;

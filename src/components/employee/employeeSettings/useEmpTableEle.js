import React from "react";
import { useEffect, useState } from "react";

const useEmpTableEle = (empList) => {
  const [trow, setTrow] = useState([]);
  const [thead] = useState([
    "name",
    "employee id",
    "email",
    "mobile",
    "join date",
    "role",
    "action",
  ]);

  useEffect(() => {
    let trow = empList.map((emp, i) => {
      return {
        name: (
          <h2 class="table-avatar">
            <img
              class="profile-img-table"
              alt=""
              src={require(`../../../img/employee/${emp.value.profilePicture}`)}
            />
            <span className="ml-2">
              <span style={{ fontWeight: "600", color: "black" }}>
                {emp.value.employeeName}
              </span>
              <span> {emp.value.designationName}</span>
            </span>
          </h2>
        ),
        "employee id": (
          <div style={{ width: "106px" }}>{emp.value.employeeId}</div>
        ),
        email: emp.value.primaryMailId,
        mobile: <div style={{ width: "71px" }}>{emp.value.mobileNumber}</div>,
        "join date": emp.value.dateOfJoin,
        role: (
          <div style={{ minWidth: "auto" }}>{emp.value.designationName}</div>
        ),
      };
    });

    setTrow(trow);
  }, [empList]);
  return { thead, trow };
};

export default useEmpTableEle;

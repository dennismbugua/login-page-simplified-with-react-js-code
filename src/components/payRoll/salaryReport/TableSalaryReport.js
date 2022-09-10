import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import { Button } from "reactstrap";

const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const TableSalaryReport = React.memo(({ empList }) => {
  const [thead] = useState([
    "employee name",
    "employee id",
    "email",
    "join date",
    "role",
    "salary",
    "month/year",
    "pay slip",
  ]);
  const [trow, setTrow] = useState([]);

  console.log(empList);

  useEffect(() => {
    let trow = empList.map((emp) => ({
      "employee name": (
        <h2 class="table-avatar">
          <img
            class="profile-img-table"
            alt=""
            src={require(`../../../img/employee/${emp.profilePicture}`)}
          />
          <span className="ml-2">
            <span style={{ fontWeight: "600", color: "black" }}>
              {emp.employeeName}
            </span>
            <span> {emp.designation}</span>
          </span>
        </h2>
      ),
      "employee id": (
        <div className="text-center" style={{ width: "120px" }}>
          {emp.employeeId}
        </div>
      ),
      email: <div>{emp.primaryMailId}</div>,
      "join date": <div style={{ width: "100px" }}>{emp.dateOfJoin}</div>,
      role: <div>{"department"}</div>,
      salary: <div style={{ width: "80px" }}>{emp.ctc}</div>,
      "month/year": (
        <div style={{ width: "120px" }}>
          {`${month[new Date(emp.createdOn).getMonth()]} -
            ${new Date(emp.createdOn).getFullYear()}`}
        </div>
      ),
      "pay slip": (
        <div style={{ width: "100px" }}>
          <Button className="btn-color">
            <small>Generate Slip</small>
          </Button>
        </div>
      ),
    }));
    setTrow(trow);
  }, [empList]);
  return (
    <div className="" style={{ maxWidth: "80vw", overflowY: "auto" }}>
      <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
    </div>
  );
});

export default TableSalaryReport;

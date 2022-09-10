import React, { Fragment, useState, useEffect } from "react";
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
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const TablePLReport = React.memo(({ employeeList, handleOnClickSpliUpBtn }) => {
  const [thead] = useState([
    "employee name",
    "employee id",
    "join date",
    "total PL AMT debited",
    "total PL AMT encashed",
    "balance PL AMT",
    "action",
  ]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trow = employeeList.map((emp) => ({
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
            <span> {emp.designationName}</span>
          </span>
        </h2>
      ),
      "employee id": (
        <div className="text-center" style={{ width: "120px" }}>
          {emp.employeeId}
        </div>
      ),
      "join date": (
        <div style={{ width: "100px" }}>{emp.dateOfJoin.substr(0, 10)}</div>
      ),
      "total PL AMT debited": <div></div>,
      "total PL AMT encashed": <div>{emp.encashAmount}</div>,
      "balance PL AMT": <div>{emp.totalPLAmount}</div>,
      action: (
        <div style={{ width: "100px" }}>
          <Button
            outline
            color="warning"
            onClick={() => handleOnClickSpliUpBtn(emp.employeeId)}
          >
            Split Up
          </Button>
        </div>
      ),
    }));
    setTrow(trow);
  }, [employeeList]);
  return (
    <div className="" style={{ maxWidth: "80vw", overflowY: "auto" }}>
      <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
    </div>
  );
});

export default TablePLReport;

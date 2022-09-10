import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";
import { Button } from "reactstrap";

const TableProcessSalary = React.memo(
  ({
    empList,
    selectedEmployee,
    handleSelectAllEmployee,
    handleSelectEmployee,
    handleProcessSalary,
  }) => {
    const [thead] = useState([
      "select",
      "employee name",
      "id",
      "email",
      "join date",
      "role",
      "salary",
      "pay slip",
      "action",
    ]);
    const [trow, setTrow] = useState([]);

    useEffect(() => {
      let trow = [];
      let checkAll = [];
      // to make checkbox selected/un-selected when Select All checkbox clicked.
      selectedEmployee.map((el) => checkAll.push(el.value.empId));

      trow.push({
        select: (
          <div className="text-center">
            <div style={{ width: "70px" }}>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAllEmployee(e)}
              />
            </div>
            <small> Select All</small>
          </div>
        ),
      });
      let tempTrow = empList.map((emp) => ({
        select: (
          <div style={{ width: "70px" }} className="text-center">
            <input
              type="checkbox"
              onChange={(e) => handleSelectEmployee(e, emp)}
              checked={checkAll.includes(emp.employeeId)}
            />{" "}
          </div>
        ),
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
        id: (
          <div className="text-center" style={{ width: "70px" }}>
            {emp.employeeId}
          </div>
        ),
        email: <div>{emp.primaryMailId}</div>,
        "join date": (
          <div style={{ width: "100px" }}>{emp.dateOfJoin.substr(0, 10)}</div>
        ),
        role: <div>{"emp.value.department"}</div>,
        salary: <div style={{ width: "80px" }}>{emp.ctc}</div>,
        "pay slip": (
          <div style={{ width: "100px" }}>
            <Button
              className="btn-color"
              onClick={() => handleProcessSalary(emp)}
            >
              <small>Process Salary</small>
            </Button>
          </div>
        ),
        action: (
          <div style={{ width: "70px" }}>
            <DropDownActions
              dropDownOption={[
                { action: "Edit", handleAction: "" },
                { action: "Delete", handleAction: "" },
              ]}
            ></DropDownActions>
          </div>
        ),
      }));

      // append the select all check box with datas Arr.
      tempTrow.map((el) => trow.push(el));
      setTrow(trow);
    }, [
      empList,
      selectedEmployee,
      handleSelectEmployee,
      handleSelectAllEmployee,
    ]);

    return (
      <>
        <div style={{ maxWidth: "80vw", overflowY: "auto" }}>
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        </div>
      </>
    );
  }
);

export default TableProcessSalary;

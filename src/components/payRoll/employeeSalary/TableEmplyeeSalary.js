import React, { Fragment, useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";
import { Button, Card, CardBody } from "reactstrap";
import { empList } from "../../../datas/employee";

const TableEmplyeeSalary = React.memo(
  ({ employeeSalaryList, handleDeletePayroll, handleClickEdit }) => {
    const [thead] = useState([
      "employee name",
      "employee id",
      "email",
      "join date",
      "role",
      "salary",
      "pay slip",
      "action",
    ]);
    const [trow, setTrow] = useState([]);

    useEffect(() => {
      let trow = employeeSalaryList.map((emp) => ({
        "employee name": (
          <h2 className="table-avatar">
            <img
              className="profile-img-table"
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
        "join date": (
          <div style={{ width: "100px" }}>
            {emp.dateOfJoin.substring(0, 10)}
          </div>
        ),
        role: <div>{emp.designation}</div>,
        salary: <div style={{ width: "80px" }}>{emp.ctc}</div>,
        "pay slip": (
          <div style={{ width: "100px" }}>
            <Button className="btn-color">
              <small>Generate Slip</small>
            </Button>
          </div>
        ),
        action: (
          <div style={{ width: "80px" }}>
            <DropDownActions
              dropDownOption={[
                { action: "Edit", handleAction: () => handleClickEdit(emp) },
                {
                  action: "Delete",
                  handleAction: () => handleDeletePayroll(emp.payRollId),
                },
              ]}
            ></DropDownActions>
          </div>
        ),
      }));
      setTrow(trow);
    }, [employeeSalaryList]);
    return (
      // <Card>
      //   <CardBody style={{ width: "70%", overflowY: "auto" }}>
      //     <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      //   </CardBody>
      // </Card>
      <div className="" style={{ maxWidth: "80vw", overflowY: "auto" }}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </div>
    );
  }
);

export default TableEmplyeeSalary;

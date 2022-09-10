import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import { Button } from "reactstrap";

const TableSplitUpDetails = React.memo(
  ({ employeeId, employeePlList, toggleSplitUpGrid }) => {
    const [thead] = useState([
      "date",
      "amt debited",
      "amt encashed",
      "outstanding amt",
    ]);
    const [trow, setTrow] = useState([]);

    useEffect(() => {
      console.log(employeePlList);
      let trow = employeePlList
        .filter((el) => el.empId === employeeId)[0]
        .pLSlpitUp.map((plDetails) => ({
          date: <div>{plDetails.date.toString().substring(0, 15)}</div>,
          "amt debited": <div>{plDetails.amountDebited}</div>,
          "amt encashed": <div>{plDetails.amountEncashed}</div>,
          "outstanding amt": <div>{plDetails.outstandingAmount}</div>,
        }));

      setTrow(trow);
    }, [employeeId, employeePlList]);

    return (
      <div>
        <Button
          className="float-right mt-2 mb-2"
          outline
          color="primary"
          onClick={toggleSplitUpGrid}
        >
          <i className="fas fa-arrow-left s"></i>
        </Button>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </div>
    );
  }
);

export default TableSplitUpDetails;

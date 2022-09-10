import React, { useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import { Card, CardBody, CardTitle } from "reactstrap";

const HelpDesktickets = React.memo(({ rowData }) => {
  const [thead] = useState([
    "reference id",
    "type",
    "summary",
    "assigned desk",
    "status",
  ]);
  const [trow, setTrow] = useState([]);

  useEffect(() => {
    let trow = rowData.map((el) => ({
      "reference id": <div>{el.referenceId} </div>,
      type: <div>{el.type} </div>,
      summary: <div>{el.summary}</div>,
      "assigned desk": <div>{el.assignedDesk}</div>,
      status: <div>{el.status}</div>,
    }));
    setTrow(trow);
  }, [rowData]);

  return (
    <div className="todo-list mb-4">
      <h3>My Help Desk Tickets</h3>
      <Card>
        <CardBody>
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        </CardBody>
      </Card>
    </div>
  );
});

export default HelpDesktickets;

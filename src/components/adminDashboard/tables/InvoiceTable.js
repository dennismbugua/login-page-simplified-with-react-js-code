import React, { Fragment, useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import { Card, CardTitle, CardBody, CardFooter, Badge } from "reactstrap";

const data = [
  {
    invoiceId: "#INV-0001",
    client: "UST Global",
    dueDate: "11/21/2019",
    total: "5,00,000",
    status: "pending",
  },
  {
    invoiceId: "#INV-0002",
    client: "Infosys TVM",
    dueDate: "01/18/2030",
    total: "10,00,000",
    status: "partially paid",
  },

  {
    invoiceId: "#INV-0003",
    client: "Team Thai",
    dueDate: "01/10/2020",
    total: "50,000",
    status: "paid",
  },
];

const InvoiceTable = React.memo(() => {
  const [thead] = useState([
    "Invoice ID",
    "Client",
    "Due Date",
    "Total",
    "Status",
  ]);
  const [trow, setTrow] = useState([]);
  useEffect(() => {
    let trow = data.map((el) => ({
      "Invoice ID": (
        <div className="text-primary" style={{ width: "90px" }}>
          {el.invoiceId}
        </div>
      ),
      Client: <div style={{ width: "90px" }}>{el.client}</div>,
      "Due Date": <div style={{ width: "90px" }}>{el.dueDate}</div>,

      Total: <div style={{ width: "70px" }}>{el.total}</div>,
      Status: (
        <Fragment>
          {el.status === "paid" && (
            <h6>
              <Badge color="success">Paid</Badge>
            </h6>
          )}
          {el.status === "pending" && (
            <h6>
              <Badge color="danger">Pending</Badge>
            </h6>
          )}
          {el.status === "partially paid" && (
            <h6>
              <Badge color="warning">Partially paid</Badge>
            </h6>
          )}
        </Fragment>
      ),
    }));
    setTrow(trow);
  }, []);
  return (
    <Fragment>
      <Card>
        <CardBody style={{ width: "100%", overflowY: "auto" }}>
          <CardTitle>
            <h5>Invoice</h5>
          </CardTitle>
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        </CardBody>
        <CardFooter className="text-center">
          <a href="#">View all invoice</a>
        </CardFooter>
      </Card>
    </Fragment>
  );
});

export default InvoiceTable;

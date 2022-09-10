import React, { Fragment, useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import { Card, CardTitle, CardBody, CardFooter, Badge } from "reactstrap";

const data = [
  {
    invoiceId: "#INV-0001",
    client: "UST Global",
    paindDate: "11/21/2019",
    paymentType: "paypal",
    paidAmount: "5,00,000",
    status: "pending",
  },
  {
    invoiceId: "#INV-0002",
    client: "Infosys TVM",
    paindDate: "01/18/2030",
    paymentType: "paypal",
    paidAmount: "10,00,000",
    status: "partially paid",
  },
  {
    invoiceId: "#INV-0004",
    client: "Kalyan Jewllery",
    paindDate: "01/10/2020",
    paymentType: "paypal",
    paidAmount: "50,000",
    status: "paid",
  },
  {
    invoiceId: "#INV-0003",
    client: "Team Thai",
    paymentType: "paypal",
    paindDate: "01/10/2020",
    paidAmount: "50,000",
    status: "paid",
  },
];

const PaymentTable = React.memo(() => {
  const [thead] = useState([
    "Invoice ID",
    "Client",
    "Payment Type",
    "Paid Date",
    "Paid Amount",
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
      "Payment Type": (
        <div className="text-center" style={{ width: "120px" }}>
          {el.paymentType}
        </div>
      ),

      "Paid Date": <div style={{ width: "90px" }}>{el.paindDate}</div>,
      "Paid Amount": <div style={{ width: "110px" }}>{el.paidAmount}</div>,
    }));
    setTrow(trow);
  }, []);
  return (
    <Fragment>
      <Card>
        <CardBody style={{ width: "100%", overflowY: "auto" }}>
          <CardTitle>
            <h5>Payment</h5>
          </CardTitle>
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        </CardBody>
        <CardFooter className="text-center">
          <a href="#">View all paments</a>
        </CardFooter>
      </Card>
    </Fragment>
  );
});

export default PaymentTable;

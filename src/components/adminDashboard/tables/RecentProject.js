import React, { Fragment, useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownActions from "../../common/DropDownActions";

import { Card, CardTitle, CardBody, CardFooter, Progress } from "reactstrap";

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

const RecentPorject = React.memo(() => {
  const [thead] = useState(["Project", "Client", "Action"]);
  const [trow, setTrow] = useState([]);
  useEffect(() => {
    let trow = data.map((el) => ({
      Project: (
        <Fragment>
          <div class="table-avatar">
            <span className="">
              <span style={{ fontWeight: "600", color: "black" }}>
                {el.client}
              </span>
            </span>
          </div>
          <div className="block text-ellipsis m-b-15 ">
            <span className="text-xs ">1</span>{" "}
            <span className="text-muted text-xs">open tasks, </span>
            <span className="text-xs">9</span>{" "}
            <span className="text-muted text-xs">tasks completed</span>
          </div>
        </Fragment>
      ),
      Client: <Progress value="65" style={{ height: "5px" }}></Progress>,
      Action: (
        <div style={{ width: "70px" }}>
          <DropDownActions
            // selectedOpt={el.status}
            dropDownOption={[
              {
                action: "Edit",
                // handleAction: () => handleEditProject(project),
              },
              {
                action: "Delete",
                // handleAction: () => handleEditProject(project),
              },
            ]}
          ></DropDownActions>
        </div>
      ),
    }));
    setTrow(trow);
  }, []);
  return (
    <Fragment>
      <Card>
        <CardBody style={{ width: "100%", overflowY: "auto" }}>
          <CardTitle>
            <h5>Projects</h5>
          </CardTitle>
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        </CardBody>
        <CardFooter className="text-center">
          <a href="#">View all project</a>
        </CardFooter>
      </Card>
    </Fragment>
  );
});

export default RecentPorject;

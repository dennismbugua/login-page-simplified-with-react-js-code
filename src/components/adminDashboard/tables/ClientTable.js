import React, { Fragment, useState, useEffect } from "react";
import TableWithSortPagtn from "../../common/TableWithSortPagtn";
import DropDownBtn from "../../common/DropDownBtn";
import DropDownActions from "../../common/DropDownActions";

import { Card, CardTitle, CardBody, CardFooter, Badge } from "reactstrap";

const data = [
  {
    invoiceId: "#INV-0001",
    client: "UST Global",
    paindDate: "11/21/2019",
    paymentType: "paypal",
    paidAmount: "5,00,000",
    status: "pending",
    activeStatus: true,
  },
  {
    invoiceId: "#INV-0002",
    client: "Infosys TVM",
    paindDate: "01/18/2030",
    paymentType: "paypal",
    paidAmount: "10,00,000",
    status: "partially paid",
    activeStatus: false,
  },
  {
    invoiceId: "#INV-0004",
    client: "Kalyan Jewllery",
    paindDate: "01/10/2020",
    paymentType: "paypal",
    paidAmount: "50,000",
    status: "paid",
    activeStatus: false,
  },
  {
    invoiceId: "#INV-0003",
    client: "Team Thai",
    paymentType: "paypal",
    paindDate: "01/10/2020",
    paidAmount: "50,000",
    status: "paid",
    activeStatus: true,
  },
];

const ClientTable = React.memo(() => {
  const [thead] = useState(["Client", "Email", "Status", "Action"]);
  const [trow, setTrow] = useState([]);
  useEffect(() => {
    let trow = data.map((el) => ({
      Client: (
        <h2 class="table-avatar">
          <img
            class="profile-img-table"
            alt=""
            src={require(`../../../img/employee/avatar-01.jpg`)}
          />
          <span className="ml-2">
            <span style={{ fontWeight: "600", color: "black" }}>
              {el.client}
            </span>
            <span>CEO</span>
          </span>
        </h2>
      ),
      Email: <div style={{ width: "120px" }}>{el.paymentType}</div>,
      Status: (
        <div style={{ width: "100px" }}>
          <DropDownBtn
            selectedOpt={el.activeStatus === true ? "Active" : "Inactive"}
            dropDownOption={[
              {
                icon: <i className="far fa-dot-circle text-success"></i>,
                option: "Active",
              },
              {
                icon: <i className="far fa-dot-circle text-danger"></i>,
                option: "Inactive",
              },
            ]}
            // handleDropDownOnChange={props.handleDropDownOnChange}
          ></DropDownBtn>
        </div>
      ),
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
            <h5>Clients</h5>
          </CardTitle>
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        </CardBody>
        <CardFooter className="text-center">
          <a href="#">View all client</a>
        </CardFooter>
      </Card>
    </Fragment>
  );
});

export default ClientTable;

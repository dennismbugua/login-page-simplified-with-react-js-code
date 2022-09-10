import React, { Fragment } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

const CardView = ({ icon, count, subTitile }) => (
  <Fragment>
    <Card>
      <CardBody>
        <span className="admin-dash-widget-icon">{icon}</span>
        <div className="admin-dash-widget-info">
          <h3>{count}</h3>
          <span>{subTitile}</span>
        </div>
      </CardBody>
    </Card>
  </Fragment>
);

export default function TopRow() {
  return (
    <div>
      <Row>
        <Col xs={12} sm={3} md={3} lg={3}>
          <CardView
            icon={<i className="fas fa-cubes"></i>}
            count={112}
            subTitile={"Projects"}
          ></CardView>
        </Col>
        <Col xs={12} sm={3} md={3} lg={3}>
          <CardView
            icon={<i class="fas fa-user-friends"></i>}
            count={44}
            subTitile={"Client"}
          ></CardView>
        </Col>
        <Col xs={12} sm={3} md={3} lg={3}>
          <CardView
            icon={<i class="fas fa-tasks"></i>}
            count={47}
            subTitile={"Task"}
          ></CardView>
        </Col>
        <Col xs={12} sm={3} md={3} lg={3}>
          <CardView
            icon={<i class="fas fa-user"></i>}
            count={178}
            subTitile={"Employees"}
          ></CardView>
        </Col>
      </Row>
    </div>
  );
}

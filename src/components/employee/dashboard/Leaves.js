import React, { Fragment } from "react";
import { Card, CardBody, Button } from "reactstrap";

const Leaves = () => {
  return (
    <Fragment>
      <div className="employee-dash-time-list-title">
        <div>
          <h5>Your Leave </h5>
        </div>
      </div>
      <Card>
        <CardBody>
          <div className="employee-dash-time-list">
            <div className="employee-dash-content">
              <h4>4.5</h4>
              <p>Leave Taken</p>
            </div>
            <div className="employee-dash-content">
              <h4>12</h4>
              <p>Remaining</p>
            </div>
          </div>
          <div className="employee-dash-content-bottom">
            <div className="employee-dash-content">
              <Button className="">Apply Leave</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Leaves;

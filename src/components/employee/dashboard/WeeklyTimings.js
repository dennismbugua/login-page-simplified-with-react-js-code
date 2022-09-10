import React, { Fragment } from "react";
import { Card, CardBody, Button } from "reactstrap";

const WeeklyTimings = () => {
  return (
    <Fragment>
      <div className="employee-dash-time-list-title">
        <div>
          <h5>Weekly Working Hours </h5>
        </div>
      </div>
      <Card>
        <CardBody>
          <div className="employee-dash-time-list">
            <div className="employee-dash-content">
              <h4>8 Hours</h4>
              <p>Aproved</p>
            </div>
            <div className="employee-dash-content">
              <h4>5 Hours</h4>
              <p>Remaining</p>
            </div>
          </div>
          <div className="employee-dash-content-bottom">
            <div className="employee-dash-content">
              <Button className=""> Update Time Sheet</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default WeeklyTimings;

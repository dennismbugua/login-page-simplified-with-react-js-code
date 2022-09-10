import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";

const ProjectCounts = () => {
  return (
    <Fragment>
      <div className="employee-dash-time-list-title">
        <div>
          <h5>Projects</h5>
        </div>
      </div>
      <Card>
        <CardBody>
          <div className="employee-dash-time-list">
            <div className="employee-dash-content">
              <h4>20</h4>
              <p>Total Task</p>
            </div>
            <div className="employee-dash-content">
              <h4>10</h4>
              <p>Pending Task</p>
            </div>
          </div>
          <div className="employee-dash-content-bottom">
            <div className="employee-dash-content">
              <h4>2</h4>
              <p>Total Projects</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProjectCounts;

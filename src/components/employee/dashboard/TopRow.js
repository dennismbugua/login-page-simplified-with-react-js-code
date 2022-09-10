import React, { Fragment } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const TopRow = ({ loginUser }) => {
  return (
    <Fragment>
      {/* <Card className="project-view-crad mb-4">
        <CardBody> */}
      <div className="welcome-box">
        <div className="welcome-img">
          <img alt="" src={require(`../../../img/employee/avatar-01.jpg`)} />
        </div>
        <div className="welcome-data">
          <h3>{loginUser?.aud ?? ""}</h3>
          <span>Monday, 20 May 2020</span>
        </div>
      </div>
      {/* </CardBody>
      </Card> */}
    </Fragment>
  );
};

export default TopRow;

import React, { Fragment } from "react";
import { Card, CardBody, Button } from "reactstrap";

const InfoCard = React.memo(({ heading, leftInfo, rightInfo, bottomInfo }) => {
  return (
    <Fragment>
      <div className="employee-dash-time-list-title">
        <div>
          <h5>{heading}</h5>
        </div>
      </div>
      <Card>
        <CardBody>
          <div className="employee-dash-time-list">
            <div className="employee-dash-content">
              <h4>{leftInfo.content}</h4>
              <p>{leftInfo.subTitle}</p>
            </div>
            <div className="employee-dash-content">
              <h4>{rightInfo.content}</h4>
              <p>{rightInfo.subTitle}</p>
            </div>
          </div>
          <div className="employee-dash-content-bottom">
            <div className="employee-dash-content">{bottomInfo}</div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default InfoCard;

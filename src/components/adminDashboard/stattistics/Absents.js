import React, { Fragment } from "react";
import { Card, CardBody, CardTitle, Badge } from "reactstrap";

const LeaveBoxLayout = ({ leaveDate, leaveStatus }) => (
  <div className="leave-info-box">
    <h4 className="form-avatar d-flex mb-3">
      <div className="avatar">
        <img alt="" src={require(`../../../img/employee/avatar-01.jpg`)} />
      </div>
      <div className="leave-candidate-name ml-2">Jerry Malikakal </div>
    </h4>
    <div className=" leave-deatils">
      <div className="leave-date">
        <h6 className="mb-0">{leaveDate}</h6>
        <span className="text-muted">Leave Date</span>
      </div>
      <div class="leave-status">
        <Badge className="ml-2" color={leaveStatus}>
          {leaveStatus === "success" ? "Approved" : "Pending"}
        </Badge>
      </div>
    </div>
  </div>
);

const Absents = React.memo(() => {
  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-3">
            <h5>
              Today Absent
              <Badge className="ml-2" color="danger">
                3
              </Badge>
            </h5>
          </CardTitle>
          <LeaveBoxLayout
            leaveDate={"4 Sep 2019"}
            leaveStatus={"success"}
          ></LeaveBoxLayout>
          <LeaveBoxLayout
            leaveDate={"30 Jan 2020"}
            leaveStatus={"success"}
          ></LeaveBoxLayout>
          <LeaveBoxLayout
            leaveDate={"13 May 2020"}
            leaveStatus={"danger"}
          ></LeaveBoxLayout>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default Absents;

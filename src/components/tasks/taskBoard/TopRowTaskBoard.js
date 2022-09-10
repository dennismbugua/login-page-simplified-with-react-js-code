import React, { Fragment } from "react";
import { Row, Col, Button } from "reactstrap";

const TopRowTaskBoard = React.memo(() => {
  return (
    <Fragment>
      <Row>
        <Col>
          <h5>Task Board</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="pro-teams">
            <div className="pro-team-lead">
              <h4>Lead</h4>
              <div className="avatar-group">
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle border border-white"
                    alt=""
                    src={require(`../../../img/employee/${"avatar-01.jpg"}`)}
                  />
                </div>
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle border border-white"
                    alt=""
                    src={require(`../../../img/employee/${"avatar-02.jpg"}`)}
                  />
                </div>
                <div className="avatar">
                  <Button className="avatar-title rounded-circle border border-white">
                    <i className="fas fa-plus"></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="pro-team-members">
              <h4>Member</h4>
              <div className="avatar-group">
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle border border-white"
                    alt=""
                    src={require(`../../../img/employee/${"avatar-01.jpg"}`)}
                  />
                </div>
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle border border-white"
                    alt=""
                    src={require(`../../../img/employee/${"avatar-02.jpg"}`)}
                  />
                </div>
                <div className="avatar">
                  <Button className="avatar-title rounded-circle border border-white">
                    <i className="fas fa-plus"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
});

export default TopRowTaskBoard;

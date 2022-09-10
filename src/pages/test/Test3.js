import React from "react";
import { Row, Col, Container } from "reactstrap";
import "../../style/test.css";

export const Test3 = React.memo(({ selectEmp }) => {
  return (
    /* check whether the props has the value */
    // {selectEmp.value ? (
    <Container>
      <div id="reward-top-row">
        <Row>
          <Col className="">
            <div>
              <h3>Waston</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <i className="fas fa-edit fa-2x"></i>
          </Col>
          <Col>
            <div className="profile-img">
              <img alt="" src={require(`../../img/employee/avatar-01.jpg`)} />
            </div>
          </Col>
          <Col className="text-center">
            <i className="fas fa-trash fa-2x"></i>
          </Col>
        </Row>
      </div>
    </Container>
    // ) : null}
  );
});

export default Test3;

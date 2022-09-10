import React, { Fragment } from "react";
import { Row, Col, Container, Card, Collapse } from "reactstrap";

export default function GridView(props) {
  return (
    <Fragment>
      <Container>
        <Row className="admin-settings py-3">
          <Col sm={12} className="">
            <Collapse isOpen={props.isOpenGridView}>
              <Row>
                <Col lg={3} md={6} sm={6} xs={12} className="mb-3 ">
                  <Card
                    body
                    inverse
                    className="card-tile"
                    onClick={() => {
                      props.emptyFormField();
                      props.toggle();
                    }}
                  >
                  <i className="fas fa-plus text-center"></i>
                  </Card>
                </Col>
                {props.pagaData.map((val, i) => {
                  return (
                    <Col lg={3} md={6} sm={6} xs={12} className="mb-3" key={i}>
                      <Card body inverse className="card-tile text-center">
                        <span
                          className="text-left"
                          onClick={() => {
                            props.handleSelectedDesg(val, i);
                            props.toggle();
                            // handleEditDesignation(val.designation, i);
                          }}
                        >
                          {val[props.displayData["heading"]]}
                          {/* //{val[Object.keys(val)[0]]} */}
                        </span>
                        <i
                          className="fas fa-times "
                          // onClick={() => handleEditLocation(val)}
                          style={{
                            position: "absolute",
                            left: "78%",
                            right: 0,
                            top: 22,
                            bottom: 0,
                            cursor: "pointer",
                          }}
                          onClick={() => props.handleDel(val[props.displayData["id"]])}
                        ></i>
                      </Card>
                    </Col>
                  );
                })}
                {/* </Col> */}
              </Row>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

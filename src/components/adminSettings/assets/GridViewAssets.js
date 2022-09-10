import React, { Fragment } from "react";
import { Row, Col, Container, Card } from "reactstrap";

export default function GridView(props) {
  return (
    <Fragment>
      <Container>
        <Row className="admin-settings py-3">
          <Col sm={12} className="">
            <Row>
              <Col lg={3} md={6} sm={6} xs={12} className="mb-3 ">
                <Card
                  body
                  inverse
                  className="card-tile"
                  onClick={() => {
                    props.openAddForm();
                  }}
                >
                  <i className="fas fa-plus text-center "></i>
                </Card>
              </Col>
              {props.itemList.map((assetName, i) => {
                return (
                  <Col lg={3} md={6} sm={6} xs={12} className="mb-3" key={i}>
                    <Card
                      body
                      inverse
                      className="card-tile text-center"
                      onClick={() => {
                        props.handleSelectedAsset(assetName, i);
                        props.openAssetItem();
                        // handleEditDepartment(val.department, i);
                      }}
                    >
                      <span className="text-left">{assetName.itemName}</span>
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
                      ></i>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

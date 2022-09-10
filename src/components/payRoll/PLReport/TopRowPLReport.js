import React, { Fragment } from "react";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const TopRowPLReport = React.memo(({ isShowSplitUpGrid }) => {
  return (
    <Row>
      {!isShowSplitUpGrid ? (
        <Fragment>
          <Col>
            <h5>PL Report </h5>
          </Col>

          <Col xs={6} className="  d-flex">
            <InputGroup className="mr-1">
              <Input
                placeholder="Search Employee..."
                // onChange={(e) => handleSearchEmployee(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Fragment>
      ) : (
        <Fragment>
          <Col>
            <h5>PL Report Split Up </h5>
          </Col>
        </Fragment>
      )}
    </Row>
  );
});

export default TopRowPLReport;

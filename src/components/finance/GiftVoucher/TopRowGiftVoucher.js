import React, { Fragment } from "react";
import { Row, Col, Button } from "reactstrap";

const TopRowGiftVoucher = React.memo(
  ({ heading, button, toggleAddEditForm }) => {
    return (
      <Fragment>
        <Row>
          <Col>
            <h5>{heading}</h5>
          </Col>

          <Col xs={6} className="text-right">
            <Button
              outline
              color="primary"
              className=" "
              onClick={toggleAddEditForm}
            >
              <i className="fa fa-plus mt-1 "></i>
              &nbsp;
              {button.create.name}
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
);

export default TopRowGiftVoucher;

import React, { Fragment } from "react";
import { Row, Col, Button } from "reactstrap";

const TopRowInvoice = React.memo(({ toggleAddEditForm }) => {
  return (
    <Fragment>
      <Row>
        <Col>
          <h5>Invoice</h5>
        </Col>

        <Col xs={6} className="text-right">
          <Button
            outline
            color="primary"
            className=" "
            onClick={toggleAddEditForm}
          >
            <i className="fa fa-plus mt-1 "></i>
            &nbsp;Create invoice
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
});

export default TopRowInvoice;

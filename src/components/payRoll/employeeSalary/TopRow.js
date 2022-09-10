import React, { Fragment } from "react";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";
import { empList } from "../../../datas/employee";

const TopRow = React.memo(({ toggleAddEditForm }) => {
  const handleSearchEmployee = React.useCallback((val) => {
    let searchArr = empList.filter(
      (el) =>
        String(el.value.empId).toLowerCase().indexOf(val) !== -1 ||
        String(el.value.empName).toLowerCase().indexOf(val.toLowerCase()) !==
          -1 ||
        String(el.value.department).toLowerCase().indexOf(val.toLowerCase()) !==
          -1
    );
    console.log(searchArr);
  }, []);

  return (
    <Fragment>
      <Row>
        <Col>
          <h5>Employee Salary</h5>
        </Col>

        <Col xs={6} className="  d-flex">
          <InputGroup className="mr-1">
            <Input
              placeholder="Search Employee..."
              onChange={(e) => handleSearchEmployee(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="fa fa-search"></i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Button
            outline
            color="primary"
            className="d-flex"
            onClick={toggleAddEditForm}
          >
            <i className="fa fa-plus mt-1 "></i> &nbsp;Salary
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
});

export default TopRow;

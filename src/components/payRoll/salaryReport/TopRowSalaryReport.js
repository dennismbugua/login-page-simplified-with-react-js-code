import React, { useState } from "react";
import { defaults } from "react-chartjs-2";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Label,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TopRowSalaryReport = React.memo(
  ({
    date,
    handleChangeFromMonth,
    handleChangeEndMonth,
    handleEmployeeSearch,
  }) => {
    return (
      <Row>
        <Col>
          <h5>Salary Report </h5>
        </Col>
        <Col xs={6} className="  d-flex">
          <div className="date-label-salary-report">
            <span>From</span>
            <DatePicker
              selected={date.startDate}
              onChange={(date) => handleChangeFromMonth(date)}
              selectsStart
              startDate={date.startDate}
              // endDate={date.endDate}
              dateFormat="MMM/yyyy"
              showMonthYearPicker
            />
          </div>
          <div className="date-label-salary-report">
            <span>To</span>

            <DatePicker
              selected={date.endDate}
              onChange={(date) => handleChangeEndMonth(date)}
              selectsEnd
              startDate={date.startDate}
              endDate={date.endDate}
              dateFormat="MMM/yyyy"
              showMonthYearPicker
            />
          </div>

          <InputGroup className="mr-1">
            <Input
              placeholder="Search Employee..."
              onChange={(e) => handleEmployeeSearch(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="fa fa-search"></i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    );
  }
);

export default TopRowSalaryReport;

import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "November",
  "December",
];

const TopRowProcessSalary = React.memo(({ handleSearchEmployee }) => {
  const datePicker = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isOpenCalender, setIsOpenCalender] = useState(false);

  //   Functions.

  const handleOpenDatePicker = React.useCallback(() => {
    setIsOpenCalender((prevState) => !prevState);
  }, [setIsOpenCalender]);

  const handleClickMonth = (date) => {
    console.log(month[date.getMonth()]);
  };

  return (
    <>
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
            <div>
              <Button
                outline
                color="danger"
                className="ml-2"
                onClick={handleOpenDatePicker}
              >
                <i className="fa fa-file"></i> Generate Salary{" "}
              </Button>
              {isOpenCalender && (
                <Calendar
                  className={"calender-procee-salary"}
                  view={"year"}
                  onClickMonth={handleClickMonth}
                  value={startDate}
                />
              )}
            </div>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
});

export default TopRowProcessSalary;

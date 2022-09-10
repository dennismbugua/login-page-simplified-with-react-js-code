import React, { useState, useEffect, useRef } from "react";
import {
  TableSalaryReport,
  TopRowSalaryReport,
} from "../../components/payRoll/index";
import { empList } from "../../datas/employee";
import Notifications from "../../components/common/Notifications";

import api from "../../apis/api";

const SalaryReport = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchArrEmployee, setSearchArrEmployee] = useState([]);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date().setMonth(new Date().getMonth() + 1)
  );
  const toKnowDateFilterChanged = useRef(false);

  useEffect(() => {
    fetchPayroll();
  }, []);

  // Function to get all employee List-----------------------------------------------------
  const fetchPayroll = async () => {
    await api
      .payroll()
      .getPayroll()
      .then((res) => {
        if (res.status === 200) {
          setEmployeeList(res.data);
          setSearchArrEmployee(res.data);
        } else {
          setError({
            ...error,
            message: "Bad Connection",
            status: 400,
          });
        }
      });
  };

  // Function.
  //   to set statrt date.
  const handleChangeFromMonth = React.useCallback(
    (startMonth) => {
      setStartDate(startMonth);
      let tempArr = handleDateFilter(startMonth, endDate);
      setSearchArrEmployee(tempArr);
    },
    [endDate]
  );

  //   to set end date.
  const handleChangeEndMonth = React.useCallback(
    (endMonth) => {
      setEndDate(endMonth);
      let tempArr = handleDateFilter(startDate, endMonth);
      setSearchArrEmployee(tempArr);
    },
    [startDate]
  );

  //   to handle search on entry in input field.
  const handleEmployeeSearch = React.useCallback(
    (val) => {
      let tempArr = [];
      if (toKnowDateFilterChanged.current) {
        tempArr = handleDateFilter(startDate, endDate);
      } else {
        tempArr = employeeList;
      }

      console.log(tempArr);
      let temSearchArr = tempArr.filter(
        (el) =>
          el.employeeName.toLowerCase().indexOf(val.toLowerCase()) !== -1 ||
          String(el.employeeId).toLowerCase().indexOf(val.toLowerCase()) !== -1
      );
      setSearchArrEmployee(temSearchArr);
    },
    [startDate, endDate, employeeList]
  );

  //   to filter search based on from and to date.
  const handleDateFilter = React.useCallback(
    (startDate, endDate) => {
      console.log(employeeList);

      let tempArr = employeeList.filter(
        (el) =>
          new Date(el.createdOn).getMonth() >= startDate.getMonth() &&
          new Date(el.createdOn).getMonth() <= new Date(endDate).getMonth()
      );
      toKnowDateFilterChanged.current = true;
      return tempArr;
    },
    [employeeList]
  );

  return (
    <>
      <TopRowSalaryReport
        date={{ startDate, endDate }}
        handleChangeFromMonth={handleChangeFromMonth}
        handleChangeEndMonth={handleChangeEndMonth}
        handleEmployeeSearch={handleEmployeeSearch}
      ></TopRowSalaryReport>
      <TableSalaryReport empList={searchArrEmployee}></TableSalaryReport>
      <Notifications notifications={error}></Notifications>
    </>
  );
};

export default SalaryReport;

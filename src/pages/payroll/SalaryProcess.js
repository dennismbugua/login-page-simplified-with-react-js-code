import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { getEmpList } from "../../redux/actions/employee/employee.action";
import Notifications from "../../components/common/Notifications";
import {
  TableProcessSalary,
  TopRowProcessSalary,
} from "../../components/payRoll/index";

import { empList } from "../../datas/employee";

import api from "../../apis/api";

const SalaryProccess = () => {
  const [searchArrEmployee, setSearchArrEmployee] = useState([]);
  const [employeeSalaryList, setEmployeeSalaryList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEmpList();
    fetchPayroll();
  }, []);

  // Function to get all employee List-----------------------------------------------------
  const fetchPayroll = async () => {
    await api
      .payroll()
      .getPayrollSetup()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setSearchArrEmployee(res.data);
          setEmployeeSalaryList(res.data);
        } else {
          setError({
            ...error,
            message: "Bad Connection",
            status: 400,
          });
        }
      });
  };
  // search employee --------------------------------------------------
  const handleSearchEmployee = React.useCallback(
    (val) => {
      let tempArr = employeeSalaryList.filter(
        (el) =>
          String(el.employeeId).toLowerCase().indexOf(val) !== -1 ||
          String(el.employeeName).toLowerCase().indexOf(val) !== -1 ||
          String(el.designation).toLowerCase().indexOf(val) !== -1
      );
      setSearchArrEmployee(tempArr);
    },
    [employeeSalaryList]
  );

  // when select all employee is selected ------------------------------------
  const handleSelectAllEmployee = React.useCallback(
    (e) => {
      // ****when employee list coming from DB, give dependencies.
      e.target.checked ? setSelectedEmployee(empList) : setSelectedEmployee([]);
    },
    [setSelectedEmployee]
  );
  // get selcted employee from TableProcessSalary.
  const handleSelectEmployee = React.useCallback(
    (e, employeeDetails) => {
      if (e.target.checked === true) {
        setSelectedEmployee((prevState) => prevState.concat(employeeDetails));
      } else {
        let tempArr = selectedEmployee.filter(
          (el) => el.value.empId !== employeeDetails.value.empId
        );
        setSelectedEmployee(tempArr);
      }
    },
    [setSelectedEmployee, selectedEmployee]
  );

  // function to handle process salary -----------------------------------
  const handleProcessSalary = (employee) => {
    console.log(employee);
  };

  return (
    <>
      <TopRowProcessSalary
        handleSearchEmployee={handleSearchEmployee}
      ></TopRowProcessSalary>
      <TableProcessSalary
        empList={searchArrEmployee}
        selectedEmployee={selectedEmployee}
        handleSelectEmployee={handleSelectEmployee}
        handleSelectAllEmployee={handleSelectAllEmployee}
        handleProcessSalary={handleProcessSalary}
      ></TableProcessSalary>
      <Notifications notifications={error}></Notifications>
    </>
  );
};

const mapStateToProps = (state) => ({
  empList: state.empReducer,
});

export default connect(mapStateToProps, { getEmpList })(SalaryProccess);

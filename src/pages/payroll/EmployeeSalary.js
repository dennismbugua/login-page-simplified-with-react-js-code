import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getEmpList } from "../../redux/actions/employee/employee.action";
import Notifications from "../../components/common/Notifications";
import {
  TopRow,
  TableEmplyeeSalary,
  AddEditEmplyeeSalary,
} from "../../components/payRoll/index";

import { Alert } from "reactstrap";

import api from "../../apis/api";

const EmployeeSalary = (props) => {
  const { getEmpList } = props;

  const [
    isOpenAddEditEmployeeSalary,
    setIsOpenAddEditEmployeeSalary,
  ] = useState(false);

  const [employeeSalaryList, setEmployeeSalaryList] = useState([]);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const [error, setError] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    getEmpList();
    fetchPayroll();
  }, []);

  // Function to dismiss Alert box----------------------------------------------------------
  const onDismissAlert = () => setAlertVisible((prevState) => !prevState);

  // Function to get all employee List-----------------------------------------------------
  const fetchPayroll = async () => {
    await api
      .payroll()
      .getPayrollSetup()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
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

  // Function to add/edit payroll to DB --------------------------------------------.
  const handleAddEditPayroll = (selectedEmployee, inputFields) => {
    let formData = {
      payRollSetupId: parseInt(selectedPayroll?.payRollSetupId ?? 0),
      employeeId: selectedEmployee.value.employeeId,
      employeeCode: "string",
      employeeName: selectedEmployee.value.employeeName,
      designation: selectedEmployee.value.designationName,
      gender: "string",
      dateOfBirth: selectedEmployee.value.dateOFBirth,
      dateOfJoin: selectedEmployee.value.dateOfJoin,
      bankAccountNumber: "string",
      pfNumber: "string",
      esiNumber: "string",
      panNumber: "string",
      attendance: "string",
      basicSalary: parseInt(inputFields?.basicSalary ?? 0),
      houseRentAllowance: parseInt(inputFields?.houseRentAllowance ?? 0),
      conveyanceAllowance: parseInt(inputFields?.conveyanceAllowance ?? 0),
      leaveTravelAllowance: parseInt(inputFields?.leaveTravelAllowance ?? 0),
      childEducationAllowance: parseInt(inputFields?.leaveTravelAllowance ?? 0),
      performanceAllowance: parseInt(inputFields?.childEduAllowance ?? 0),
      medicalAllowance: parseInt(inputFields?.medicalAllowance ?? 0),
      otherAllowance: parseInt(inputFields?.otherAllowance ?? 0),
      specialPay: parseInt(inputFields?.specialPay ?? 0),
      plEarnings: parseInt(inputFields?.plEarning ?? 0),
      leaveEncashment: parseInt(inputFields?.leaveEncashment ?? 0),
      arrears: parseInt(inputFields?.arrears ?? 0),
      epfEmployerEarnings: parseInt(inputFields?.epfEmployerEarning ?? 0),
      esiEmployerEarnings: parseInt(inputFields?.esimployerEarning ?? 0),
      sodexoEarnings: parseInt(inputFields?.sodexoEarning ?? 0),
      gratuityEarnings: parseInt(inputFields?.gratuityEarning ?? 0),
      epfEmployee: parseInt(inputFields?.epfEmployee ?? 0),
      esiEmployee: parseInt(inputFields?.esiEmployee ?? 0),
      professionTax: parseInt(inputFields?.professionTax ?? 0),
      incomeTax: parseInt(inputFields?.incomeTax ?? 0),
      medicalInsurance: parseInt(inputFields?.medicalInsurance ?? 0),
      lop: parseInt(inputFields?.lop ?? 0),
      plDeductions: parseInt(inputFields?.plDeduction ?? 0),
      epfEmployerDeductions: parseInt(inputFields?.epfEmployerDeductions ?? 0),
      esiEmployerDeductions: parseInt(inputFields?.esiEmployerDeductions ?? 0),
      sodexoDeductions: parseInt(inputFields?.sodexoDeductions ?? 0),
      gratuityDeductions: parseInt(inputFields?.gratuityDeductions ?? 0),
      mealVoucher: 0,
      isActive: true,
    };
    if (selectedEmployee !== null) {
    } else {
      setError({
        ...error,
        pageErrorMessage: "Please Select an Employee",
      });
    }
    api
      .payroll()
      .addEditPayroll(formData)
      .then((res) => {
        if (res.status === 200) {
          setError({ ...error, message: "Salary Added", status: 200 });
          fetchPayroll();
          setSelectedPayroll(null);
        } else {
          setError({ ...error, message: "Bad Connection", status: 400 });
        }
      });
    toggleAddEditForm();
  };

  // Function to delete payrol -------------------------------------------------------
  const handleDeletePayroll = (payrollId) => {
    api
      .payroll()
      .deletePayrollById(payrollId)
      .then((res) => {
        if (res.status === 200) {
          setError({ ...error, message: "Deleted Successfull", status: 200 });
          fetchPayroll();
        } else {
          setError({ ...error, message: "Bad Connection", status: 400 });
        }
      });
  };

  // Function to set selected employee ----------------------------------------------------------------------
  const handleSelectPayroll = React.useCallback((selPayroll) => {
    setSelectedPayroll(selPayroll);
    toggleAddEditForm();
  }, []);

  //   toggle funtion with AddEdit & Grid -------------------------------------------------------------------
  const toggleAddEditForm = React.useCallback(() => {
    setIsOpenAddEditEmployeeSalary((prevState) => !prevState);
  }, []);

  return (
    <Fragment>
      <TopRow {...props} toggleAddEditForm={toggleAddEditForm}></TopRow>
      {isOpenAddEditEmployeeSalary && (
        <AddEditEmplyeeSalary
          {...props}
          toggleAddEditForm={toggleAddEditForm}
          handleAddEditPayroll={handleAddEditPayroll}
          selectedPayroll={selectedPayroll}
        ></AddEditEmplyeeSalary>
      )}
      <Alert
        color="danger"
        className="mt-2"
        isOpen={alertVisible}
        toggle={onDismissAlert}
      >
        This is a danger alert — check it out!
      </Alert>
      {!isOpenAddEditEmployeeSalary && (
        <TableEmplyeeSalary
          employeeSalaryList={employeeSalaryList}
          handleDeletePayroll={handleDeletePayroll}
          handleClickEdit={handleSelectPayroll}
        ></TableEmplyeeSalary>
      )}
      <Notifications notifications={error}></Notifications>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  empList: state.empReducer,
});

export default connect(mapStateToProps, { getEmpList })(EmployeeSalary);

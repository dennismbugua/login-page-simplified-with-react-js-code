import React, { Fragment, useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

import SelectBoxSearch from "../../common/SelectBoxSearch";
import FormInputField from "./FormInputField";

const AddEditEmployeeSalary = React.memo(
  ({ empList, handleAddEditPayroll, selectedPayroll }) => {
    // const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [grossSalary, setGrossSalary] = useState(0);
    const [salaryCTC, setSalaryCTC] = useState(0);
    const [totalDeduction, setTotalDeduction] = useState(0);
    const [inputFields, setInputFields] = useState({});

    // useEffect to set selected employee & input field value on Edit -------------------------------------
    useEffect(() => {
      console.log(selectedPayroll);
      // selectedPayroll !== null then edit click.
      if (selectedPayroll !== null) {
        let selectedEmployee = empList.empList.filter(
          (el) => el.value.employeeId === selectedPayroll.employeeId
        );
        setSelectedEmployee(selectedEmployee[0]);
        let inputFields = {
          payRollId: parseInt(selectedPayroll?.payRollId ?? 0),
          employeeId: selectedEmployee[0].value.employeeId,
          employeeCode: "string",
          employeeName: selectedEmployee[0].value.employeeName,
          designation: selectedEmployee[0].value.designationName,
          gender: "string",
          dateOfBirth: selectedEmployee[0].value.dateOFBirth,
          dateOfJoin: selectedEmployee[0].value.dateOfJoin,
          bankAccountNumber: "string",
          pfNumber: "string",
          esiNumber: "string",
          panNumber: "string",
          attendance: "string",
          basicSalary: parseInt(selectedPayroll?.basicSalary ?? ""),
          houseRentAllowance: parseInt(
            selectedPayroll?.houseRentAllowance ?? 0
          ),
          conveyanceAllowance: parseInt(
            selectedPayroll?.conveyanceAllowance ?? 0
          ),
          leaveTravelAllowance: parseInt(
            selectedPayroll?.leaveTravelAllowance ?? 0
          ),
          childEducationAllowance: parseInt(
            selectedPayroll?.leaveTravelAllowance ?? 0
          ),
          performanceAllowance: parseInt(
            selectedPayroll?.childEduAllowance ?? 0
          ),
          medicalAllowance: parseInt(selectedPayroll?.medicalAllowance ?? 0),
          otherAllowance: parseInt(selectedPayroll?.otherAllowance ?? 0),
          specialPay: parseInt(selectedPayroll?.specialPay ?? 0),
          plEarnings: parseInt(selectedPayroll?.plEarning ?? 0),
          leaveEncashment: parseInt(selectedPayroll?.leaveEncashment ?? 0),
          arrears: parseInt(selectedPayroll?.arrears ?? 0),
          epfEmployerEarnings: parseInt(
            selectedPayroll?.epfEmployerEarning ?? 0
          ),
          esiEmployerEarnings: parseInt(
            selectedPayroll?.esimployerEarning ?? 0
          ),
          sodexoEarnings: parseInt(selectedPayroll?.sodexoEarning ?? 0),
          gratuityEarnings: parseInt(selectedPayroll?.gratuityEarning ?? 0),
          epfEmployee: parseInt(selectedPayroll?.epfEmployee ?? 0),
          esiEmployee: parseInt(selectedPayroll?.esiEmployee ?? 0),
          professionTax: parseInt(selectedPayroll?.professionTax ?? 0),
          incomeTax: parseInt(selectedPayroll?.incomeTax ?? 0),
          medicalInsurance: parseInt(selectedPayroll?.medicalInsurance ?? 0),
          lop: parseInt(selectedPayroll?.lop ?? 0),
          plDeductions: parseInt(selectedPayroll?.plDeduction ?? 0),
          epfEmployerDeductions: parseInt(
            selectedPayroll?.epfEmployerDeductions ?? 0
          ),
          esiEmployerDeductions: parseInt(
            selectedPayroll?.esiEmployerDeductions ?? 0
          ),
          sodexoDeductions: parseInt(selectedPayroll?.sodexoDeductions ?? 0),
          gratuityDeductions: parseInt(
            selectedPayroll?.gratuityDeductions ?? 0
          ),
          mealVoucher: 0,
          isActive: true,
        };
        console.log(inputFields);
        setInputFields(inputFields);
      } else {
        // from Add click.
        setInputFields(null);
        // setSelectedEmployee(null);
      }
    }, [selectedPayroll, empList, selectedEmployee]);

    // Functions --------------------------------------------------------------------

    // Function to add/edit payroll to DB --------------------------------------------.
    const handleFormSubmit = (e) => {
      e.preventDefault();
      handleAddEditPayroll(selectedEmployee, inputFields);
    };
    // Find array sum.
    const arraySum = (arr) => {
      let arrSum = arr.reduce((a, b) => a + b);
      return arrSum;
    };

    // Function to get sum of grossSalary -----------------------------------------------
    const handleSumGrossSalary = () => {
      let salaryGROSS = [
        parseInt(inputFields.basicSalary ?? 0),
        parseInt(inputFields.houseRentAllowance ?? 0),
        parseInt(inputFields.conveyanceAllowance ?? 0),
        parseInt(inputFields.leaveTravelAllowance ?? 0),
        parseInt(inputFields.childEduAllowance ?? 0),
        parseInt(inputFields.performanceAllowance ?? 0),
        parseInt(inputFields.medicalAllowance ?? 0),
        parseInt(inputFields.specialPay ?? 0),
        parseInt(inputFields.plEarning ?? 0),
        parseInt(inputFields.leaveEncashment ?? 0),
        parseInt(inputFields.otherAllowance ?? 0),
        parseInt(inputFields.arrears ?? 0),
      ];
      let salaryCTC = [
        parseInt(inputFields.epfEmployerEarning ?? 0),
        parseInt(inputFields.esiEmployerEarning ?? 0),
        parseInt(inputFields.sodexoEarning ?? 0),
        parseInt(inputFields.gratuityEarning ?? 0),
      ];
      let salaryGROSSsum = arraySum(salaryGROSS);
      let salaryCTCSum = arraySum(salaryCTC);
      setGrossSalary(salaryGROSSsum);
      setSalaryCTC(salaryCTCSum + salaryGROSSsum);
    };

    // Function to get sum of tottal desuction -----------------------------------------------
    const handleSumTotalDeduction = () => {
      let totalDeduction = [
        parseInt(inputFields.epfEmployee ?? 0),
        parseInt(inputFields.esiEmployee ?? 0),
        parseInt(inputFields.professionTax ?? 0),
        parseInt(inputFields.incomeTax ?? 0),
        parseInt(inputFields.medicalInsurance ?? 0),
        parseInt(inputFields.lop ?? 0),
        parseInt(inputFields.plDeduction ?? 0),
        parseInt(inputFields.epfEmployerDeductions ?? 0),
        parseInt(inputFields.esiEmployerDeductions ?? 0),
        parseInt(inputFields.sodexoDeductions ?? 0),
        parseInt(inputFields.gratuityDeductions ?? 0),
      ];
      let totalDeductionSum = arraySum(totalDeduction);
      setTotalDeduction(totalDeductionSum);
    };

    // Function to set state to input fields.
    const handleChangeInput = (e) => {
      let value = e.target.value !== "" ? e.target.value : "";
      setInputFields({
        ...inputFields,
        [e.target.name]: value,
      });
    };

    console.log(inputFields);

    return (
      <Fragment>
        <Card className="pr-4 pl-4 mt-2">
          <CardBody>
            <Form onSubmit={(e) => handleFormSubmit(e)}>
              <Row>
                <Col className="pr-4 " xs={12} sm={6} md={6} lg={6}>
                  <FormGroup>
                    <Label for="exampletext">Selected Staff</Label>
                    <SelectBoxSearch
                      options={empList.empList}
                      onChange={(val) => setSelectedEmployee(val)}
                      selectedUser={selectedEmployee}
                    ></SelectBoxSearch>
                  </FormGroup>
                  <h5>Earning</h5>
                  <FormInputField
                    label="Basic"
                    type="text"
                    name="basicSalary"
                    value={inputFields?.basicSalary ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="House Rent Allowance (15%)"
                    type="text"
                    name="houseRentAllowance"
                    value={inputFields?.houseRentAllowance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Conveyance Allowance"
                    type="text"
                    name="conveyanceAllowance"
                    value={inputFields?.conveyanceAllowance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Leave Travel Allowance"
                    type="text"
                    name="leaveTravelAllowance"
                    value={inputFields?.leaveTravelAllowance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Child Education Allowance"
                    type="text"
                    name="childEduAllowance"
                    value={inputFields?.childEduAllowance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Performance Allowance"
                    type="text"
                    name="performanceAllowance"
                    value={inputFields?.performanceAllowance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Medical Allowance"
                    type="text"
                    name="medicalAllowance"
                    value={inputFields?.medicalAllowance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Special Pay"
                    type="text"
                    name="specialPay"
                    value={inputFields?.specialPay ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="PL"
                    type="text"
                    name="plEarning"
                    value={inputFields?.plEarning ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Leave Encashment"
                    type="text"
                    name="leaveEncashment"
                    value={inputFields?.leaveEncashment ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Other Allowance"
                    type="text"
                    name="otherAllowance"
                    value={inputFields?.otherAllowance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Arrears"
                    type="text"
                    name="arrears"
                    value={inputFields?.arrears ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                </Col>

                <Col className="pl-4 " xs={12} sm={6} md={6} lg={6}>
                  <FormGroup>
                    <Label for="exampletext">Net Salary</Label>
                    <Input type="text" name="text" />
                  </FormGroup>
                  <h5>Deduction</h5>

                  <FormInputField
                    label="EPF Employee"
                    type="text"
                    name="epfEmployee"
                    value={inputFields?.epfEmployee ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="ESI Employee"
                    type="text"
                    name="esiEmployee"
                    value={inputFields?.esiEmployee ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="Profession Tax (PT)"
                    type="text"
                    name="professionTax"
                    value={inputFields?.professionTax ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="Income Tax-TDS"
                    type="text"
                    name="incomeTax"
                    value={inputFields?.incomeTax ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="Medical Insurance"
                    type="text"
                    name="medicalInsurance"
                    value={inputFields?.medicalInsurance ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="LOP"
                    type="text"
                    name="lop"
                    value={inputFields?.lop ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="PL"
                    type="text"
                    name="plDeduction"
                    value={inputFields?.plDeduction ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                </Col>
              </Row>
              <Row>
                <Col xs="12" sm="6" md="6" lg="6">
                  <FormInputField
                    label="SALARY (GROSS) / PM"
                    type="text"
                    name="salaryGross"
                    disable={true}
                    value={grossSalary}
                    handleOnchange={handleChangeInput}
                  ></FormInputField>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5 className="show__inMobile">Earning</h5>
                  <FormInputField
                    label="EPF Employer"
                    type="text"
                    name="epfEmployerEarning"
                    value={inputFields?.epfEmployerEarning ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="ESI Employer"
                    type="text"
                    name="esiEmployerEarning"
                    value={inputFields?.esiEmployerEarning ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Sodexo"
                    type="text"
                    name="sodexoEarning"
                    value={inputFields?.sodexoEarning ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                  <FormInputField
                    label="Gratuity"
                    type="text"
                    name="gratuityEarning"
                    value={inputFields?.gratuityEarning ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumGrossSalary}
                  ></FormInputField>
                </Col>
                <Col>
                  <h5 className="show__inMobile">Dedection</h5>

                  <FormInputField
                    label="EPF Employer"
                    type="text"
                    name="epfEmployerDeductions"
                    value={inputFields?.epfEmployerDeductions ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="ESI Employer"
                    type="text"
                    name="esiEmployerDeductions"
                    value={inputFields?.esiEmployerDeductions ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="Sodexo"
                    type="text"
                    name="sodexoDeductions"
                    value={inputFields?.sodexoDeductions ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                  <FormInputField
                    label="Gratuity"
                    type="text"
                    name="gratuityDeductions"
                    value={inputFields?.gratuityDeductions ?? ""}
                    handleOnchange={handleChangeInput}
                    handleOnBlur={handleSumTotalDeduction}
                  ></FormInputField>
                </Col>
              </Row>
              <Row>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormInputField
                    label="SALARY (CTC) / PM"
                    type="text"
                    name="salaryCTC"
                    disable={true}
                    value={salaryCTC}
                  ></FormInputField>
                </Col>
                <Col xs="6" sm="6" md="6" lg="6">
                  <FormInputField
                    label="TOTAL DEDUCTION"
                    type="text"
                    name="totalDeduction"
                    disable={true}
                    value={totalDeduction}
                  ></FormInputField>
                </Col>
              </Row>
              <div className="w-100 text-center">
                <Button outline color="primary">
                  Add
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
);

export default AddEditEmployeeSalary;

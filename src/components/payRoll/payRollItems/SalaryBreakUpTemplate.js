import React, { useState, useEffect, useRef, Fragment } from "react";
import { Card, CardBody, Table, Input, Button } from "reactstrap";

import SelectBoxSearch from "../../common/SelectBoxSearch";

import Pdf from "react-to-pdf";

const TdInputFields = ({
  setInputFieldsData,
  inputFieldsData,
  salaryComponent,
  hideInputFileds = true,
}) => (
  <Fragment>
    <td className="text-center">
      {hideInputFileds ? (
        inputFieldsData?.[salaryComponent] ?? 0
      ) : (
        <Input
          type="number"
          onChange={(e) => {
            setInputFieldsData({
              ...inputFieldsData,
              [salaryComponent]:
                e.target.value !== "" ? parseInt(e.target.value) : 0,
            });
          }}
        ></Input>
      )}
    </td>
    <td className="text-center">
      {hideInputFileds ? (
        inputFieldsData[salaryComponent] >= 0 ? (
          inputFieldsData[salaryComponent] * 12
        ) : (
          0
        )
      ) : (
        <Input
          type="number"
          value={inputFieldsData?.[salaryComponent] * 12 ?? 0}
          disabled
        ></Input>
      )}
    </td>
  </Fragment>
);

const SalaryBreakUpTemplate = React.memo(({ empList, toggleSalaryBreakUp }) => {
  const [inputFieldsData, setInputFieldsData] = useState({});
  const [selecetdEmployee, setSelecetdEmployee] = useState(null);

  const [gross, setGross] = useState(0);
  const [hideInputFileds, setHideInputFileds] = useState(false);
  const ref = useRef("");
  const clickBtn = useRef("");

  useEffect(() => {
    let inputValues = Object.keys(inputFieldsData).map(
      (el) => inputFieldsData?.[el] ?? 0
    );
    let totalAmount = inputValues.reduce((a, b) => a + b, 0);
    setGross(totalAmount);
  }, [inputFieldsData]);

  //   Function.
  //   to print salary break up
  const printOrder = async () => {
    await setHideInputFileds(true);
    const printableElements = document.getElementById("printMe").innerHTML;
    const orderHtml =
      "<html><head><title></title></head><body>" +
      printableElements +
      "</body></html>";
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = orderHtml;
    window.print();
    window.location.href = "/payRollItems";
    // document.body.innerHTML = oldPage;
  };

  // Function to set selected employee. --------------------------------------------
  const handleSetSelectedEmployee = React.useCallback((val) => {
    console.log(val);
    setSelecetdEmployee(val);
  }, []);

  // Function to set selected employee null to re-select employee. --------------------------------------------
  const handleSetSelectedEmployeeNull = React.useCallback((val) => {
    setSelecetdEmployee(null);
  }, []);

  // Function to create PDf. -------------------------------------------------
  const handleCreatePdf = React.useCallback(async (toPdf) => {
    await setHideInputFileds(true);
    toPdf();
  }, []);

  return (
    <Fragment>
      {/* div to generate PDF. */}

      <div className="salary-breakup-template" id={"printMe"}>
        <div
          ref={ref}
          style={{
            padding: "0rem 8rem 6rem 2rem",
          }}
        >
          <Card id="toGrenreatePdf">
            <CardBody>
              {/* Div for pdf genration. */}
              {!hideInputFileds && (
                <div className="d-flex w-100 ">
                  <div className="flex-grow-1">
                    <Button outline color="info" onClick={toggleSalaryBreakUp}>
                      <i className="fas fa-arrow-left s"></i>{" "}
                    </Button>
                  </div>
                  <div className=" ">
                    <Button outline color="info" onClick={printOrder}>
                      Print
                    </Button>

                    <Pdf targetRef={ref} filename="salary-break-up.pdf">
                      {({ toPdf }) => (
                        <Button
                          outline
                          color="info"
                          ref={clickBtn}
                          onClick={() => handleCreatePdf(toPdf)}
                        >
                          Generate Pdf
                        </Button>
                      )}
                    </Pdf>
                  </div>
                </div>
              )}

              <div className="text-right">28-Augest-2020</div>
              <div className="text-center mt-4">
                <h5>Salary Break Up</h5>
              </div>
              <div className="d-flex justify-content-between">
                <div className="" style={{ width: " 50%" }}>
                  <div className="" style={{ display: "flex" }}>
                    <div>
                      {" "}
                      <b>Name : </b> {selecetdEmployee?.label ?? ""}
                    </div>
                    {selecetdEmployee === null && (
                      <div className="ml-2" style={{ width: "50%" }}>
                        <SelectBoxSearch
                          options={empList}
                          onChange={handleSetSelectedEmployee}
                        ></SelectBoxSearch>
                      </div>
                    )}
                    {selecetdEmployee !== null && (
                      <div
                        className="ml-3"
                        onClick={handleSetSelectedEmployeeNull}
                      >
                        <i className="fa fa-edit"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <b>Designation :</b>{" "}
                  {selecetdEmployee?.value?.designationName ?? ""}
                </div>
              </div>
              <div className="mt-4 pl-4 pr-4 float-center">
                <Table borderless>
                  <thead>
                    <tr>
                      <th>
                        <h6>Salary Component </h6>
                      </th>
                      <th className="text-center">
                        <h6>Monthly </h6>
                      </th>
                      <th className="text-center">
                        <h6>Anual(INR)</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>Basic</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"basic"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>House Rent Allowance (HRA)</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"hra"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>Conveyance Allowance</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"conveyanceAllowance"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>Leave Travel Allowance (LTA)</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"lta"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>Medical Allowance</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"medicalAllowance"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>Performance Allowance</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"performanceAllowance"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>PL Encashment</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"pl"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>Employer Contribution for PF & ESI</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"pf&esi"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>Gratuity*</b>
                      </td>
                      <TdInputFields
                        setInputFieldsData={setInputFieldsData}
                        inputFieldsData={inputFieldsData}
                        hideInputFileds={hideInputFileds}
                        salaryComponent={"gratuity"}
                      ></TdInputFields>
                    </tr>
                    <tr>
                      <td>
                        <b>Gross</b>
                      </td>
                      <td className="text-center">
                        <h6>{gross}</h6>
                      </td>
                      <td className="text-center">
                        <h6>{gross * 12}</h6>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Fragment>
  );
});

export default SalaryBreakUpTemplate;

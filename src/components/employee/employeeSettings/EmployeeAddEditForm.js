import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import useFormValidation from "../../common/useFormValidation";
const EmployeeEditForm = React.memo((props) => {
  const {
    selectedEmployee,
    designations,
    qualification,
    departments,
    officeLocationList,
    workPrimisesList,
    employeetypesList,
  } = props;
  const [id, setId] = useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [primaryMailId, setPrimaryMailId] = useState("");
  const [altMailId, setAltMailId] = useState("");
  const [qualificationId, setQualificationId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [guardainName, setGuardainName] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [mobileNumber, setModileNumber] = useState("");
  const [alternativeNo, setAlternativeNo] = useState("");
  const [dateOfJoin, setDateOfJoin] = useState(new Date());
  const [dateOFBirth, setDateOfBirth] = useState(new Date());
  const [profilePicture, setProfilePicture] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [esiNo, setEsiNo] = useState("");
  const [epfUan, setEpfUan] = useState("");
  const [accNo, setAccNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [skill, setSkill] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [workPrimise, setWorkPrimise] = useState("");

  const [employeeFormValidation, setEmployeeFormValidation] = useState({});

  const { formValidation, isFormValid } = useFormValidation(
    employeeFormValidation
  );

  useEffect(() => {
    // calls handleAddForm() , ie after fomValidation changes by sumibiting the form
    handleAddForm();
  }, [formValidation]);

  const formValidationOnSubmit = () => {
    let formValidationList = {
      employeeName: {
        required: true,
        isValid: true,
        value: String(employeeName),
        errorMessage: "",
      },
      employeeId: {
        required: true,
        isValid: true,
        value: employeeId,
        errorMessage: "",
      },
      employeeType: {
        required: true,
        isValid: true,
        value: employeeType,
        errorMessage: "",
      },
      qualification: {
        required: true,
        isValid: true,
        value: qualificationId,
        errorMessage: "",
      },
      designation: {
        required: true,
        isValid: true,
        value: designationId,
        errorMessage: "",
      },
      department: {
        required: true,
        isValid: true,
        value: departmentName,
        errorMessage: "",
      },
      officeLocation: {
        required: true,
        isValid: true,
        value: officeLocation,
        errorMessage: "",
      },
      workPremise: {
        required: true,
        isValid: true,
        value: "workPrimise",
        errorMessage: "",
      },
    };
    setEmployeeFormValidation(formValidationList); //this set call the custom hook useFormValidation.
  };

  const handleAddForm = () => {
    // check whether the form is valid.
    if (isFormValid) {
      let empFormData = new FormData();
      empFormData.append("employeeId", id);
      empFormData.append("employeeCode", parseInt(employeeId));
      empFormData.append("employeeType", parseInt(employeeType));
      empFormData.append("employeeName", employeeName);
      empFormData.append("dateOfJoin", dateOfJoin);
      empFormData.append("dateOFBirth", dateOFBirth);
      empFormData.append("aadharNumber", aadharNo);
      empFormData.append("panNumber", panNo);
      empFormData.append("esiNumber", esiNo);
      empFormData.append("epfuan", epfUan);
      empFormData.append("qualificationId", 1);
      empFormData.append("departmentId", parseInt(departmentName));
      empFormData.append("designationId", parseInt(designationId));
      empFormData.append(
        "designationName",
        designations.map((desg) =>
          desg.designationId === parseInt(designationId)
            ? desg.designationName
            : ""
        )[0]
      );
      empFormData.append("guardianName", guardainName);
      empFormData.append("postalAddress", postalAddress);
      empFormData.append("mobileNumber", mobileNumber);
      empFormData.append("emergencyNumber", alternativeNo);
      empFormData.append("primaryMailId", primaryMailId);
      empFormData.append("secondaryMailId", altMailId);
      empFormData.append("ifscCode", ifscCode);
      empFormData.append("bankAccountNumber", accNo);
      empFormData.append("bloodGroup", bloodGrp);
      empFormData.append("officeLocationId", parseInt(officeLocation));
      empFormData.append("workingPremiseId", parseInt(workPrimise));
      empFormData.append(
        "profilePicture",
        profilePicture === "" ? "user.png" : profilePicture
      );
      empFormData.append("createdDate", new Date());
      empFormData.append("createdBy", 1);
      empFormData.append("modifiedDate", "2020-06-09T07:25:27.612Z");
      empFormData.append("modifiedBy", 0);
      empFormData.append("isActive", true);
      empFormData.append("password", "hellothere");
      empFormData.append("roles", "string");
      empFormData.append("fileName", "string");
      empFormData.append("contentType", "string");
      empFormData.append("file", null);
      empFormData.append("isLatest", true);
      empFormData.append("encrptedPassword", "string");

      if (selectedEmployee) {
        props.handleUpdateEmp(empFormData);
      } else {
        props.handleAddEmp(empFormData);
      }
      props.toggle();
    }
  };

  useEffect(() => {
    if (selectedEmployee) {
      //if an employeee is clicked for edit , the assigns its value to state.
      setId(selectedEmployee.employeeId);
      setEmployeeName(selectedEmployee.employeeName);
      setEmployeeId(selectedEmployee.employeeCode);
      setEmployeeType(selectedEmployee.employeeType);
      setPrimaryMailId(selectedEmployee.primaryMailId);
      setAltMailId(selectedEmployee.secondaryMailId);
      setQualificationId(selectedEmployee.qualificationId);
      setDesignationId(selectedEmployee.designationId);
      setGuardainName(selectedEmployee.guardianName);
      setBloodGrp(selectedEmployee.bloodGroup);
      setModileNumber(selectedEmployee.mobileNumber);
      setAlternativeNo(selectedEmployee.emergencyNumber);
      setPostalAddress(selectedEmployee.postalAddress);
      setDateOfJoin(selectedEmployee.dateOfJoin.substring(0, 10));
      setDateOfBirth(selectedEmployee.dateOFBirth.substring(0, 10));
      setPostalAddress(selectedEmployee.postalAddress);
      setAadharNo(selectedEmployee.aadharNumber);
      setPanNo(selectedEmployee.panNumber);
      setEsiNo(selectedEmployee.esiNumber);
      setEpfUan(selectedEmployee.epfuan);
      setAccNo(selectedEmployee.bankAccountNumber);
      setIfscCode(selectedEmployee.ifscCode);
      setProfilePicture(selectedEmployee.profilePicture);

      setDepartmentName(selectedEmployee.departmentId);
      setOfficeLocation(selectedEmployee.officeLocationId);
      setWorkPrimise(selectedEmployee.workingPremiseId);
    } else {
      //if add btn click then keep the state to null,
      //cuz when editClick and then addClicked then last value remains in state.
      setId(0);

      setEmployeeName("");
      setEmployeeId("");
      setEmployeeType("");
      setPrimaryMailId("");
      setDateOfJoin(new Date());
      setDateOfBirth(new Date());
    }
  }, [selectedEmployee]);

  return (
    <Form>
      {console.log("in employee add edit")}
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Employee Name</Label>
            <Input
              type="Text"
              name="EmployeeName"
              onChange={(e) => {
                setEmployeeName(e.target.value);
                // setSetateNameForValidation("employeeName");
                // setValuesForValidation(e.target.value);
                // formValidation("employeeName", e.target.value);
              }}
              value={employeeName}
            />
            {/* when there is entry in FormValidation only render condition loop */}
            {/* */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.employeeName.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.employeeName.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Employee ID</Label>
            <Input
              type="Text"
              name="EmployeeId"
              onChange={(e) => setEmployeeId(e.target.value)}
              value={employeeId}
            />
            {/* when there is entry in FormValidation only render condition loop */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.employeeId.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.employeeId.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Employee Type</Label>
            <Input
              type="select"
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              <option value="">Select Employee Type</option>
              {employeetypesList.map((employeeTypeEl, i) => (
                <option
                  value={employeeTypeEl.employeeTypeId}
                  selected={
                    employeeType === employeeTypeEl.employeeTypeId
                      ? true
                      : false
                  }
                >
                  {employeeTypeEl.employeeTypeValue}
                </option>
              ))}
            </Input>
            {/* when there is entry in FormValidation only render condition loop */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.employeeType.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.employeeType.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label> Primary Mail Id</Label>
            <Input
              type="Text"
              name="doj"
              onChange={(e) => {
                setPrimaryMailId(e.target.value);
              }}
              value={primaryMailId}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label> Alternative Mail Id</Label>
            <Input
              type="Text"
              name="doj"
              onChange={(e) => setAltMailId(e.target.value)}
              value={altMailId}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label> Qualification</Label>
            <Input
              type="select"
              onChange={(e) => setQualificationId(e.target.value)}
            >
              <option value="">Select Designation</option>
              {qualification.map((qualification, i) => (
                <option
                  value={qualification.qualificationId}
                  selected={
                    qualificationId === qualification.qualificationId
                      ? true
                      : false
                  }
                >
                  {qualification.qualificationName}
                </option>
              ))}
            </Input>
            {/* when there is entry in FormValidation only render condition loop */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.qualification.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.qualification.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Designation</Label>
            <Input
              type="select"
              onChange={(e) => setDesignationId(e.target.value)}
            >
              <option value="">Select Designation</option>
              {designations.map((desigination, i) => (
                <option
                  value={desigination.designationId}
                  selected={
                    designationId === desigination.designationId ? true : false
                  }
                >
                  {desigination.designationName}
                </option>
              ))}
            </Input>
            {/* when there is entry in FormValidation only render condition loop */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.designation.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.designation.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Guardain Name</Label>
            <Input
              type="Text"
              name="doj"
              onChange={(e) => setGuardainName(e.target.value)}
              value={guardainName}
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Boold Group</Label>
            <Input
              type="Text"
              name="doj"
              onChange={(e) => setBloodGrp(e.target.value)}
              value={bloodGrp}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label>Modile Number</Label>
            <Input
              type="Text"
              name="doj"
              onChange={(e) => setModileNumber(e.target.value)}
              value={mobileNumber}
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Alternative Number</Label>
            <Input
              type="Text"
              name="dob"
              onChange={(e) => setAlternativeNo(e.target.value)}
              value={alternativeNo}
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Date of Joining</Label>
            <Input
              type="date"
              onChange={(e) => setDateOfJoin(e.target.value)}
              // value={"2013-01-08"}

              value={dateOfJoin}
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />

            {/* <Input
              type="Text"
              name="dob"
              onChange={(e) => setDob(e.target.value)}
            /> */}
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label>Profile Photo</Label>
            <Input
              type="file"
              name="file"
              onChange={(e) => setProfilePicture(e.target.files[0].name)}
            />
          </FormGroup>
        </Col>
        <Col md={9}>
          <FormGroup>
            <Label>Address</Label>
            <Input
              type="textarea"
              name="doj"
              onChange={(e) => setPostalAddress(e.target.value)}
              value={postalAddress}
            />
          </FormGroup>
        </Col>
      </Row>
      {/* </div> */}
      <hr></hr>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Aadhar Number</Label>
            <Input
              type="Text"
              name="AadharNumber "
              onChange={(e) => setAadharNo(e.target.value)}
              value={aadharNo}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>PAN Number </Label>
            <Input
              type="Text"
              name="panNo"
              onChange={(e) => setPanNo(e.target.value)}
              value={panNo}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>ESI No</Label>
            <Input
              type="Text"
              name="esiNo"
              onChange={(e) => setEsiNo(e.target.value)}
              value={esiNo}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>EPF UAN </Label>
            <Input
              type="Text"
              name="epfUan"
              onChange={(e) => setEpfUan(e.target.value)}
              value={epfUan}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr></hr>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>Account Number </Label>
            <Input
              type="Text"
              onChange={(e) => setAccNo(e.target.value)}
              value={accNo}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>IFSC Code </Label>
            <Input
              type="Text"
              name="ifcs "
              onChange={(e) => setIfscCode(e.target.value)}
              value={ifscCode}
            />
          </FormGroup>
        </Col>
      </Row>
      <hr></hr>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label>Department </Label>
            <Input
              type="select"
              onChange={(e) => setDepartmentName(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((department, i) => (
                <option
                  value={department.departmentId}
                  selected={
                    departmentName === department.departmentId ? true : false
                  }
                >
                  {department.departmentName}
                </option>
              ))}
            </Input>
            {/* when there is entry in FormValidation only render condition loop */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.department.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.department.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Skill </Label>
            <Input type="text" onChange={(e) => setSkill(e.target.value)} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Office Location </Label>
            <Input
              type="select"
              onChange={(e) => setOfficeLocation(e.target.value)}
            >
              <option value="">select office location</option>
              {officeLocationList.map((officeLocationEl, i) => (
                <option
                  key={officeLocationEl.officeLocationId}
                  value={officeLocationEl.officeLocationId}
                  selected={
                    officeLocation === officeLocationEl.officeLocationId
                      ? true
                      : false
                  }
                >
                  {officeLocationEl.address}
                </option>
              ))}
            </Input>
            {/* when there is entry in FormValidation only render condition loop */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.officeLocation.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.officeLocation.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>Work Primise </Label>
            <Input
              type="select"
              onChange={(e) => setWorkPrimise(e.target.value)}
            >
              <option value="">select work Premise</option>
              {workPrimisesList.map((workPrimisesEl, i) => (
                <option
                  key={workPrimisesEl.workingPremiseId}
                  value={workPrimisesEl.workingPremiseId}
                  selected={
                    workPrimise === workPrimisesEl.workingPremiseId
                      ? true
                      : false
                  }
                >
                  {workPrimisesEl.workingPremiseType}
                </option>
              ))}
            </Input>
            {/* when there is entry in FormValidation only render condition loop */}
            {Object.keys(formValidation).length !== 0 &&
              !formValidation.workPremise.isValid && (
                <span className=" " style={{ color: "red" }}>
                  {formValidation.workPremise.errorMessage}
                </span>
              )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button
            color=""
            className="btn-admin-settings"
            // onClick={handleAddForm}
            onClick={formValidationOnSubmit}
          >
            {selectedEmployee ? "Update" : "Add"}
          </Button>
          &nbsp;
          <Button color="" className="btn-cancel" onClick={props.toggle}>
            cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

export default EmployeeEditForm;

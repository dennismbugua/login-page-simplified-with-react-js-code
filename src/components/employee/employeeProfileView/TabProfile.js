import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardTitle,
  Row,
  Col,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

import {
  getQualification,
  addEmpEducationalInfo,
  updateEmpEducationalInfo,
  delEmpEducationalInfo,
  getEmpPreviousCompanyInfo,
  addPreviousCompanyInfo,
  updatePreviousCompanyInfo,
  delPreviousCompanyInfo,
  updateEmp,
  getEmpEducationalInfo,
} from "../../../redux/actions/employee/employee.action";

// style for the edit/update forms.
const fontSize = {
  fontSize: "12px",
};
const inputHeight = { height: "35px" };
const TabProfile = React.memo((props) => {
  const [employeeDetails, setEmployeeDetails] = useState({});

  const {
    selectEmp,
    addEmpEducationalInfo,
    getQualification,
    updateEmpEducationalInfo,
    delEmpEducationalInfo,
    getEmpPreviousCompanyInfo,
    addPreviousCompanyInfo,
    updatePreviousCompanyInfo,
    delPreviousCompanyInfo,
    getEmpEducationalInfo,
  } = props;
  const { qualification, prevcompanyinfo } = props.empeducationalInfo;

  const [isClickEdit, setIsClickEdit] = useState("");
  const [
    popoverOpenAddEducationalInfo,
    setpopoverOpenAddEducationalInfo,
  ] = useState(false);

  const [qualificationName, setQualificationName] = useState("");
  const [branch, setBranch] = useState("");
  const [university, setUniversity] = useState("");
  const [yop, setyop] = useState("");
  const [typeofstudy, setTypeofstudy] = useState("");
  const [gpa, setgpa] = useState("");
  const [qualificationId, setQualificationId] = useState("");
  const [eduQualificationId, setEduQualificationId] = useState(0);

  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [durationFrom, setFrom] = useState("");
  const [durationTo, setTo] = useState("");
  const [employeeCompanyDetailsId, setEmployeeCompanyDetailsId] = useState(0);

  // ========== Function's.

  useEffect(() => {
    getQualification();
    getEmpEducationalInfo(props.match.params.empId);
  }, [getQualification]);

  useEffect(() => {
    getEmpPreviousCompanyInfo(props.employeeId);
  }, [getEmpPreviousCompanyInfo]);

  useEffect(() => {
    getEmpEducationalInfo(props.employeeId);
  }, [getEmpEducationalInfo]);

  useEffect(() => {
    // seting the value of selected employee to state
    selectEmp.value !== undefined &&
      setEmployeeDetails({
        ...selectEmp.value,
        isActive: true,
        password: "hellothere",
        roles: "string",
        fileName: "string",
        contentType: "string",
        file: null,
        isLatest: true,
        encrptedPassword: "string",
      });
  }, [selectEmp]);

  const toggle = () =>
    setpopoverOpenAddEducationalInfo(!popoverOpenAddEducationalInfo);

  const handleClickEdit = React.useCallback(
    (whichCard) => {
      setIsClickEdit(whichCard);
    },
    [setIsClickEdit]
  );

  const handleAddClickEduInfo = (e) => {
    e.preventDefault();
    let qName = "";
    qualification.map((el) =>
      parseInt(el.qualificationId) === parseInt(qualificationId)
        ? (qName = el.qualificationName)
        : null
    );
    let formData = {
      qualificationName: qName,
      branch: branch,
      universityName: university,
      yearOfPassing: parseInt(yop),
      studyType: typeofstudy,
      percentageOrGPA: gpa,
      qualificationId: parseInt(qualificationId),
      employeeId: parseInt(props.employeeId),
      educationalQualificationId: parseInt(eduQualificationId),
    };
    eduQualificationId !== 0
      ? updateEmpEducationalInfo(formData)
      : addEmpEducationalInfo(formData);
    handleClickEdit("");
  };

  const handleAddClickCompanyInfo = (e) => {
    e.preventDefault();
    let formData = {
      employeeCompanyDetailsId: parseInt(employeeCompanyDetailsId),
      companyName: company,
      designation: designation,
      durationOfWork: parseFloat(duration),
      employeeId: parseInt(props.employeeId),
      fromDate: durationFrom,
      toDate: durationTo,
    };
    employeeCompanyDetailsId !== 0
      ? updatePreviousCompanyInfo(formData)
      : addPreviousCompanyInfo(formData);
    handleClickEdit("");
  };

  const handleClickUpdateCompanyInfo = (e) => {
    setEmployeeCompanyDetailsId(e.employeeCompanyDetailsId);
    setCompany(e.company);
    setDesignation(e.designation);
    setDuration(e.duration);
    setFrom(e.fromDate);
    setTo(e.toDate);
    handleClickEdit("workExperience");
  };

  const handleClickUpdateEduInfo = (e) => {
    setEduQualificationId(e.educationalQualificationId);
    setBranch(e.branch);
    setQualificationName(e.qualificationName);
    setUniversity(e.universityName);
    setTypeofstudy(e.studyType);
    setgpa(e.percentageOrGPA);
    setyop(e.yearOfPassing);
    setQualificationId(e.qualificationId);
    handleClickEdit("eduInformation");
  };

  const handleClearValues = (cardname) => {
    if (cardname === "eduInformation") {
      setEduQualificationId(0);
      setBranch("");
      setQualificationName("");
      setUniversity("");
      setTypeofstudy("");
      setgpa("");
      setyop("");
      handleClickEdit("eduInformation");
    } else if (cardname === "workExperience") {
      setEmployeeCompanyDetailsId(0);
      setCompany("");
      setDesignation("");
      setDuration("");
      setFrom("");
      setTo("");
      handleClickEdit("workExperience");
    }
  };

  const handleClickDeleteEduInfo = (educationalQualificationId) => {
    delEmpEducationalInfo(educationalQualificationId);
  };

  const handleClickDeleteCompanyInfo = (employeeCompanyDetailsId) => {
    delPreviousCompanyInfo(employeeCompanyDetailsId);
  };

  // personal information on update -> state change function.
  const handleOnChangePersonalInfoFields = React.useCallback(
    (field, value) => {
      let updateObj = employeeDetails;

      let updateValue = {
        ...updateObj,
        [field]: value,
      };
      setEmployeeDetails(updateValue);
      console.log(updateValue);
    },
    [employeeDetails]
  );

  // on update click of personal infomation
  const handleUpdatePersonalInfo = React.useCallback(() => {
    props.updateEmp(employeeDetails);
    handleClickEdit("");
  }, [employeeDetails]);

  // ------------------------------form personalInfo
  const personalInfoFrom = (
    <Fragment>
      <Form>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Office Mail Id
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={employeeDetails.primaryMailId}
              onChange={(e) =>
                handleOnChangePersonalInfoFields(
                  "primaryMailId",
                  e.target.value
                )
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Alternate Email Id
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.secondaryMailId}
              onChange={(e) =>
                handleOnChangePersonalInfoFields(
                  "secondaryMailId",
                  e.target.value
                )
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Passport No.
          </Label>
          <Col sm={8}>
            <Input type="text" style={inputHeight} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Passport Exp Date.
          </Label>
          <Col sm={8}>
            <Input type="text" style={inputHeight} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Mobile No.
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.mobileNumber}
              onChange={(e) =>
                handleOnChangePersonalInfoFields("mobileNumber", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Emergency Conatact No.
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.emergencyNumber}
              onChange={(e) =>
                handleOnChangePersonalInfoFields(
                  "emergencyNumber",
                  e.target.value
                )
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Blood Group
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.bloodGroup}
              onChange={(e) =>
                handleOnChangePersonalInfoFields("bloodGroup", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Date of Birth
          </Label>
          <Col sm={8}>
            <Input
              type="date"
              // value="2018-07-22"
              value={
                employeeDetails?.dateOFBirth?.substring(0, 10) ?? new Date()
              }
              onChange={(e) =>
                handleOnChangePersonalInfoFields("dateOFBirth", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Father's/Husband's Name
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.guardianName}
              onChange={(e) =>
                handleOnChangePersonalInfoFields("guardianName", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Postal Address
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.postalAddress}
              onChange={(e) =>
                handleOnChangePersonalInfoFields(
                  "postalAddress",
                  e.target.value
                )
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>

        <FormGroup check row className="text-center">
          <Button
            color=""
            className="btn-admin-settings"
            onClick={handleUpdatePersonalInfo}
          >
            Update
          </Button>
          &nbsp;
          <Button
            color=""
            className="btn-cancel"
            onClick={() => handleClickEdit("")}
          >
            cancel
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
  // -------------------------------form bank information.

  const bankInfoForm = (
    <Fragment>
      <Form>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Bank Name
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.postalAddress}
              onChange={(e) =>
                handleOnChangePersonalInfoFields("bankName", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Accout Number
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.bankAccountNumber}
              onChange={(e) =>
                handleOnChangePersonalInfoFields(
                  "bankAccountNumber",
                  e.target.value
                )
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Accout Number
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.ifscCode}
              onChange={(e) =>
                handleOnChangePersonalInfoFields("ifscCode", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Accout Number
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.aadharNumber}
              onChange={(e) =>
                handleOnChangePersonalInfoFields("aadharNumber", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Accout Number
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              value={employeeDetails.panNumber}
              onChange={(e) =>
                handleOnChangePersonalInfoFields("panNumber", e.target.value)
              }
              style={inputHeight}
            />
          </Col>
        </FormGroup>

        <FormGroup check row className="text-center">
          <Button
            color=""
            className="btn-admin-settings"
            onClick={handleUpdatePersonalInfo}
          >
            Update
          </Button>
          &nbsp;
          <Button
            color=""
            className="btn-cancel"
            onClick={() => handleClickEdit("")}
          >
            cancel
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
  //----------------Educational Information
  const eduInformation = (
    <Fragment>
      <Form>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Qualification Name
          </Label>
          <Col sm={8}>
            <Input
              type="select"
              style={inputHeight}
              name="select"
              onChange={(e) => setQualificationId(e.target.value)}
            >
              <option value="">----Select----</option>
              {qualification.map((quali) => (
                <option
                  key={quali.qualificationId}
                  value={quali.qualificationId}
                  data-name={quali.qualificationName}
                  selected={
                    quali.qualificationId === qualificationId ? true : false
                  }
                >
                  {quali.qualificationName}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Branch
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            University
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Year of Passing
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={yop}
              onChange={(e) => setyop(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Type Of Study
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={typeofstudy}
              onChange={(e) => setTypeofstudy(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Percentage(%)/GPA
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={gpa}
              onChange={(e) => setgpa(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup check row className="text-center">
          <Button
            color=""
            className="btn-admin-settings"
            onClick={handleAddClickEduInfo}
          >
            {qualificationName !== "" ? "Update" : "Add"}
          </Button>
          &nbsp;
          <Button
            color=""
            className="btn-cancel"
            onClick={() => handleClickEdit("")}
          >
            cancel
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
  //===========================================
  //----------------Work Experience
  const workExperience = (
    <Fragment>
      <Form>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Company Name
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Designation
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            Duration Of Work
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              placeholder={"in years"}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            From
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              placeholder={"MMM yyyy"}
              value={durationFrom}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} style={fontSize}>
            To
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              style={inputHeight}
              placeholder={"MMM yyyy"}
              value={durationTo}
              onChange={(e) => setTo(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup check row className="text-center">
          <Button
            color=""
            className="btn-admin-settings"
            onClick={handleAddClickCompanyInfo}
          >
            {designation !== "" ? "Update" : "Add"}
          </Button>
          &nbsp;
          <Button
            color=""
            className="btn-cancel"
            onClick={() => handleClickEdit("")}
          >
            cancel
          </Button>
        </FormGroup>
      </Form>
    </Fragment>
  );
  //===================End of Form ====================
  return (
    <div className="profile-box">
      <Row>
        {/* ------- Personal Information card */}
        <Col md="6">
          <Card className="flex-fill">
            <CardBody>
              <CardTitle>
                <h3>
                  Personal Information
                  {isClickEdit === "personalInfo" ? (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClickEdit("")}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                  ) : (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClickEdit("personalInfo")}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                  )}
                </h3>
              </CardTitle>
              {isClickEdit === "personalInfo" ? (
                personalInfoFrom
              ) : (
                <ul className="personal-info">
                  <li>
                    <div className="title">Office Mail Id</div>
                    <div className="text">{employeeDetails.primaryMailId}</div>
                  </li>
                  <li>
                    <div className="title">Alternative Mail Id</div>
                    <div className="text">
                      {employeeDetails.secondaryMailId}
                    </div>
                  </li>
                  <li>
                    <div className="title">Passport No.</div>
                    <div className="text">9876543210</div>
                  </li>
                  <li>
                    <div className="title">Passport Exp Date.</div>
                    <div className="text">9876543210</div>
                  </li>
                  <li>
                    <div className="title">Mobile No.</div>
                    <div className="text">{employeeDetails.mobileNumber}</div>
                  </li>
                  <li>
                    <div className="title">Emergency Contact No.</div>
                    <div className="text">
                      {employeeDetails.emergencyNumber}
                    </div>
                  </li>
                  <li>
                    <div className="title">Blood Group</div>
                    <div className="text">{employeeDetails.bloodGroup}</div>
                  </li>
                  <li>
                    <div className="title">Date of Birth</div>
                    <div className="text">
                      {employeeDetails?.dateOFBirth?.substring(0, 10) ?? "-"}
                    </div>
                  </li>
                  <li>
                    <div className="title">Father's/Husband's Name</div>
                    <div className="text">{employeeDetails.guardianName}</div>
                  </li>
                  <li>
                    <div className="title">Postal Address</div>
                    <div className="text">{employeeDetails.postalAddress}</div>
                  </li>
                </ul>
              )}
            </CardBody>
          </Card>
        </Col>

        {/* ------- Bank Information card */}
        <Col md="6">
          <Card className="flex-fill">
            <CardBody>
              <CardTitle>
                <h3>
                  Bank Information
                  {isClickEdit === "bankInfo" ? (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClickEdit("")}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                  ) : (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClickEdit("bankInfo")}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                  )}
                </h3>
              </CardTitle>
              {isClickEdit === "bankInfo" ? (
                bankInfoForm
              ) : (
                <Fragment>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Bank name</div>
                      <div className="text">*ICICI Bank</div>
                    </li>
                    <li>
                      <div className="title">Bank account No.</div>
                      <div className="text">
                        {employeeDetails.bankAccountNumber}
                      </div>
                    </li>
                    <li>
                      <div className="title">IFSC Code</div>
                      <div className="text">{employeeDetails.ifscCode}</div>
                    </li>
                  </ul>
                  <CardTitle>
                    <h3>Aadhar {"&"} Pan </h3>
                    <ul className="personal-info">
                      <li>
                        <div className="title">Aadhar No.</div>
                        <div className="text">
                          {employeeDetails.aadharNumber}
                        </div>
                      </li>
                      <li>
                        <div className="title">Pan No.</div>
                        <div className="text">{employeeDetails.panNumber}</div>
                      </li>
                    </ul>
                  </CardTitle>
                </Fragment>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/*------------Educational information */}
      <Row>
        <Col md="6">
          <Card className="flex-fill">
            <CardBody>
              <CardTitle>
                <h3>
                  Educational Information
                  {isClickEdit === "eduInformation" ? (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClickEdit("")}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                  ) : (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClearValues("eduInformation")}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                  )}
                </h3>
              </CardTitle>
              {isClickEdit === "eduInformation" ? (
                eduInformation
              ) : (
                <div className="experience-box">
                  <ul className="experience-list">
                    {props.educationalInfo.map((ed) => (
                      <li>
                        <div className="experience-user">
                          <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                          <div className="timeline-content">
                            <a href="#/" className="name">
                              {ed.universityName}
                            </a>
                            <div>{ed.qualificationName + " " + ed.branch}</div>
                            <span className="time">
                              {ed.yearOfPassing !== 0 ? ed.yearOfPassing : ""}
                            </span>
                          </div>
                          <div className="edit-del-icon ">
                            <span
                              className="edit"
                              onClick={() => handleClickUpdateEduInfo(ed)}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                            <span
                              className="del"
                              onClick={() =>
                                handleClickDeleteEduInfo(
                                  ed.educationalQualificationId
                                )
                              }
                            >
                              <i className="fas fa-trash"></i>
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>

        {/* ----------Work Experience   */}
        <Col md="6">
          <Card className="flex-fill">
            <CardBody>
              <CardTitle>
                <h3>
                  Experience
                  {isClickEdit === "workExperience" ? (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClickEdit("")}
                    >
                      <i className="fas fa-times"></i>
                    </span>
                  ) : (
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() => handleClearValues("workExperience")}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </span>
                  )}
                </h3>
              </CardTitle>
              {isClickEdit === "workExperience" ? (
                workExperience
              ) : (
                <div className="experience-box">
                  <ul className="experience-list">
                    {prevcompanyinfo.map((we) => (
                      <li>
                        <div className="experience-user">
                          <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                          <div className="timeline-content">
                            <a href="#/" className="name">
                              {we.designation + " at " + we.companyName}
                            </a>
                            <span className="time">
                              {we.fromDate + "-" + we.toDate}
                            </span>
                          </div>
                          <span> </span>
                          <div className="edit-del-icon ">
                            <span
                              className="edit"
                              onClick={() => handleClickUpdateCompanyInfo(we)}
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                            <span
                              className="del"
                              onClick={() =>
                                handleClickDeleteCompanyInfo(
                                  we.employeeCompanyDetailsId
                                )
                              }
                            >
                              <i className="fas fa-trash"></i>
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

const mapStateToProps = (state) => ({
  empeducationalInfo: state.empReducer,
});

export default connect(mapStateToProps, {
  getQualification,
  addEmpEducationalInfo,
  updateEmpEducationalInfo,
  delEmpEducationalInfo,
  getEmpPreviousCompanyInfo,
  addPreviousCompanyInfo,
  updatePreviousCompanyInfo,
  delPreviousCompanyInfo,
  updateEmp,
  getEmpEducationalInfo,
})(TabProfile);

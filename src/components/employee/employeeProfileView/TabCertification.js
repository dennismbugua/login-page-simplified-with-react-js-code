import React, { Fragment, useState, useEffect, useRef } from "react";
import { Row, Col, Card, CardBody, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import {
  getEmpCertificates,
  addEmpCertificate,
  updateEmpCertificate,
  delEmpCertificate,
} from "../../../redux/actions/employee/employee.action";
import { getAllCertifications } from "../../../redux/actions/adminSettings/adminSettings.action";
import DropDownActions from "../../common/DropDownActions";

const TabCertification = React.memo(({ employeeId, ...props }) => {
  const {
    getEmpCertificates,
    addEmpCertificate,
    updateEmpCertificate,
    delEmpCertificate,
    getAllCertifications,
  } = props;
  const { empCertificate } = props.empCertificate;
  const { certifications } = props.certifications;

  let messagesEnd = "";
  const [certificateDate, setCertificateDate] = useState(new Date());
  const [certificateDescp, setCertificateDescp] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  const [addFormCertificate, setAddFormCertificate] = useState(false);
  const showUpdateForm = useRef(null);

  useEffect(() => {
    getEmpCertificates(employeeId);
    getAllCertifications();
  }, [getEmpCertificates, getAllCertifications]);

  // Function -----------------------------------

  const handleOnClickAdd = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
    setAddFormCertificate(true);
  };

  //   handle change date in DOJ
  const handleChangeCertificateDate = (date) => {
    setCertificateDate(new Date(date));
  };

  const handleOnclickEdit = (certificateData) => {
    // onClick edit then, showUpdateFrom only to which click.
    // ie: to get unique name concat with array index
    showUpdateForm.current =
      "showUpdateForm" + certificateData.employeeCertificationId;
    setSelectedData(certificateData);
    setCertificateDescp(certificateData.certificationId);
    setCertificateDate(new Date(certificateData.expiryDate));
  };

  //  -----------------Add From
  const handleAddCertificate = () => {
    let formData = {
      employeeId: parseInt(employeeId),
      certificationId: parseInt(certificateDescp),
      certifiedDate: "2020-09-03T04:14:01.059Z",
      expiryDate: certificateDate,
      grade: "string",
      notes: "just got it",
      createdBy: 0,
      createdOn: "2020-09-03T04:14:01.059Z",
      modifiedBy: 0,
      modifiedOn: "2020-09-03T04:14:01.059Z",
      isActive: true,
    };

    addEmpCertificate(formData);
    setAddFormCertificate((prevState) => !prevState);

    console.log(certificateDescp, "&nbsp;", certificateDate);
  };

  //  -----------------Update Form.
  const handleUpdateCertificate = () => {
    let formData = {
      employeeCertificationId: selectedData.employeeCertificationId,
      employeeId: parseInt(employeeId),
      certificationId: parseInt(certificateDescp),
      certifiedDate: "2020-09-03T04:14:01.059Z",
      expiryDate: certificateDate,
      grade: "string",
      notes: "just got",
      createdBy: 0,
      createdOn: "2020-09-03T04:14:01.059Z",
      modifiedBy: 0,
      modifiedOn: "2020-09-03T04:14:01.059Z",
      isActive: true,
    };

    updateEmpCertificate(formData);
    handleCloseUpdateCertificate();
  };

  // close add certificate card.
  const handleCloseAddCertificate = () => {
    setAddFormCertificate(false);
  };

  // close Update certificate card.
  const handleCloseUpdateCertificate = () => {
    showUpdateForm.current = null;
    setCertificateDescp("");
    setCertificateDate("");
  };
  // --------------------Delete Certificate.
  const handleDelCertificate = (delId) => {
    delEmpCertificate(delId);
  };

  return (
    <Fragment>
      <Row className="certication-box mt-2">
        <Col sm={4}>
          <Card
            className="flex-fill mb-3"
            onClick={handleOnClickAdd}
            //    style={{ borderRadius: "160px" }}
          >
            <CardBody>
              <Row>
                <Col sm={10} xs={10} md={10} className="text-center">
                  <Button color="">
                    <i className="fas fa-2x fa-plus"></i>
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        {empCertificate !== null
          ? empCertificate.map((ele, i) => (
              <Col sm={4} key={ele.employeeCertificationId}>
                {showUpdateForm.current ===
                "showUpdateForm" + ele.employeeCertificationId ? ( // Edit form..........
                  <AddUpdateForm
                    setCertificateDescp={(val) => setCertificateDescp(val)}
                    handleChangeCertificateDate={handleChangeCertificateDate}
                    handleAddCertificate={handleUpdateCertificate}
                    handleCloseAddCertificate={handleCloseUpdateCertificate}
                    certificateDate={certificateDate}
                    certificateDescp={certificateDescp}
                    certifications={certifications} // all certifiate names.
                  ></AddUpdateForm>
                ) : (
                  <Card className="flex-fill mb-3">
                    <CardBody>
                      <Row>
                        <Col sm={2} xs={2} md={2}>
                          {/* <i class="fas fa-3x fa-ribbon"></i> */}
                          <i class="fas fa-3x fa-certificate"></i>
                        </Col>

                        <Col sm={10} xs={10} md={10}>
                          <h5>
                            <div className="dropDown-action">
                              <DropDownActions
                                dropDownOption={[
                                  {
                                    action: "Edit",
                                    handleAction: () => handleOnclickEdit(ele),
                                  },
                                  {
                                    action: "Delete",
                                    handleAction: () =>
                                      handleDelCertificate(
                                        ele.employeeCertificationId
                                      ),
                                  },
                                ]}
                              ></DropDownActions>
                            </div>
                            {ele.certificationName}
                          </h5>
                          <small className="text-muted">
                            Date : {ele.expiryDate.substr(0, 10)}
                          </small>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                )}
              </Col>
            ))
          : null}

        {/* Add From........... */}
        <Col sm={4}>
          <div
            // style={{ float: "left", clear: "both" }}
            ref={(el) => {
              messagesEnd = el;
            }}
          >
            {addFormCertificate ? (
              <AddUpdateForm
                setCertificateDescp={(val) => setCertificateDescp(val)}
                handleChangeCertificateDate={handleChangeCertificateDate}
                handleAddCertificate={handleAddCertificate}
                handleCloseAddCertificate={handleCloseAddCertificate}
                certificateDate={certificateDate}
                certifications={certifications}
              ></AddUpdateForm>
            ) : null}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
});

const AddUpdateForm = (props) => (
  <Card className="flex-fill mb-3">
    <CardBody style={{ marginTop: "-10px" }}>
      <Row>
        <Col sm={2} xs={2} md={2}>
          {/* <i class="fas fa-3x fa-ribbon"></i> */}
          <i class="fas fa-3x fa-certificate"></i>
        </Col>
        <Col sm={10} xs={10} md={10} className="update-fields">
          {/* <Input
            type="text"
            placeholder="Add Certification Here"
            style={{ height: "30px" }}
            onChange={(e) => props.setCertificateDescp(e.target.value)}
            value={props.certificateDescp}
          /> */}
          <Input
            type="select"
            style={{ height: "30px" }}
            value={props.certificateDescp}
            onChange={(e) => props.setCertificateDescp(e.target.value)}
          >
            <option value={""}>Select Certification</option>
            {props.certifications.map((el) => (
              <option key={el.certificationId} value={el.certificationId}>
                {el.certificationName}
              </option>
            ))}
          </Input>
          <Row>
            <Col sm={8} md={8}>
              <Input
                type="date"
                style={{ height: "30px" }}
                value={props.certificateDate.toISOString().substr(0, 10)}
                onChange={(e) =>
                  props.handleChangeCertificateDate(e.target.value)
                }
              />
            </Col>
            <Col sm={4} md={4} className="mt-2">
              <i
                className="fas fa-check "
                onClick={props.handleAddCertificate}
              ></i>
              <i
                className="fas fa-times ml-3"
                onClick={props.handleCloseAddCertificate}
              ></i>
            </Col>
          </Row>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

const mapStateToProps = (state) => ({
  empCertificate: state.empReducer,
  certifications: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getEmpCertificates,
  addEmpCertificate,
  updateEmpCertificate,
  delEmpCertificate,
  getAllCertifications,
})(TabCertification);

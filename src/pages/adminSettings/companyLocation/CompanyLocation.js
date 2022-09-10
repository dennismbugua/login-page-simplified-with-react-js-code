import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getOfficeLocation,
  addOfficeLocation,
  updateOfficeLocation,
  delOfficeLoation,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import { Row, Col, Container, Button, Table } from "reactstrap";
import Form from "./Form";

const CompanyLocation = (props) => {
  const {
    getOfficeLocation,
    addOfficeLocation,
    updateOfficeLocation,
    delOfficeLoation,
  } = props;
  const { officeLocation } = props.officeLocation;
  const [isopenAddEditForm, setIsOpenAddEditForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    getOfficeLocation();
  }, [getOfficeLocation]);

  const handleEditLocation = React.useCallback(
    (companyLocation) => {
      console.log(companyLocation);
      setSelectedCompany(companyLocation);
      setIsOpenAddEditForm((prevState) => !prevState);
    },
    [setIsOpenAddEditForm]
  );

  // add click func.
  const handleAddClick = React.useCallback(() => {
    setIsOpenAddEditForm((prevState) => !prevState);
  }, [setIsOpenAddEditForm]);

  // delete click function.

  const handleDelete = React.useCallback(
    (delId) => {
      console.log(delId);
      delOfficeLoation(delId);
    },
    [delOfficeLoation]
  );

  // toogle form and card view from add/edit form.
  const toogleFromAddEdit = React.useCallback(() => {
    setIsOpenAddEditForm((prevState) => !prevState);
    setSelectedCompany("");
  }, [setIsOpenAddEditForm]);

  // add location.
  const handleAddCompanyLocation = (formData) => {
    // console.log("add location", fromData);
    addOfficeLocation(formData);
    setIsOpenAddEditForm((prevState) => !prevState);
  };
  // update location.
  const handleUpdateCompanyLocation = (formData) => {
    console.log("add location", formData);
    updateOfficeLocation(formData);
    setIsOpenAddEditForm((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Container>
        <Row className="companyLocation">
          <Col>
            <h3>Company Location</h3>
          </Col>
          <Col>
            <Button
              color=""
              className="btn-admin-settings float-right"
              onClick={handleAddClick}
            >
              {isopenAddEditForm ? (
                <i className="fas fa-times "></i>
              ) : (
                <i className="fas fa-plus "></i>
              )}
            </Button>
          </Col>
        </Row>

        <hr></hr>
        <Row className="admin-settings py-3">
          {isopenAddEditForm ? (
            <Form
              selectedCompany={selectedCompany}
              handleAddCompanyLocation={handleAddCompanyLocation}
              handleUpdateCompanyLocation={handleUpdateCompanyLocation}
              toogleFromAddEdit={toogleFromAddEdit}
            />
          ) : (
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Pin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {officeLocation.map((val, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>
                        {val.address}, LandMark : {val.landMark}
                      </td>
                      <td>{val.phoneNo}</td>
                      <td>{val.pin}</td>
                      <td>
                        <i
                          className="fas fa-edit "
                          onClick={() => handleEditLocation(val)}
                        ></i>
                        &nbsp;
                        <i
                          className="fas fa-trash "
                          onClick={() => handleDelete(val.officeLocationId)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
                {/* <Card
                      body
                      inverse
                      className="admin-settings-card"
                      style={{ position: "relative" }}
                    >
                      <i
                        className="fas fa-edit "
                        onClick={() => handleEditLocation(val)}
                        style={{
                          position: "absolute",
                          left: "78%",
                          right: 0,
                          top: 52,
                          bottom: 0,
                          cursor: "pointer",
                        }}
                      ></i>
                      <i
                        className="fas fa-trash "
                        style={{
                          position: "absolute",
                          left: "90%",
                          right: 0,
                          top: 52,
                          bottom: 0,
                          cursor: "pointer",
                        }}
                      ></i>
                      <CardTitle>{val.country}</CardTitle>
                    </Card> */}
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </Fragment>
  );
};

CompanyLocation.prototype = {
  getOfficeLocation: PropTypes.func,
  addOfficeLocation: PropTypes.func,
};

const mapStateToProps = (state) => ({
  officeLocation: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getOfficeLocation,
  addOfficeLocation,
  updateOfficeLocation,
  delOfficeLoation,
})(CompanyLocation);

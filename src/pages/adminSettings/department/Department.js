import React, { Fragment, useState, useEffect, useRef } from "react";
import { Row, Col, Container, Collapse, Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getDepartment,
  addDepartment,
  updateDepartment,
  delDepartment,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import TableWithSortPagtn from "../../../components/common/TableWithSortPagtn";
import {
  GridView,
  FromFields,
  FromEditFields,
  useDepartmentTable,
} from "../../../components/adminSettings/index";
import useFormValidation from "../../../components/common/useFormValidation";

const Department = (props) => {
  const {
    getDepartment,
    addDepartment,
    updateDepartment,
    delDepartment,
  } = props;
  const { departments } = props.departments;

  const [department, setDepartment] = useState("");

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenListView, setIsOpenListView] = useState(false);

  const [selectedDept, setSelectedDept] = useState({ id: "", val: "" });
  const [departmentArray, setDepartmentArray] = useState([]);
  const [departmentInputFields, setDepartmentInputFields] = useState([]);
  const [formValidationState, setFormValidationState] = useState({});
  const callValidation = useRef(false);

  // call the department data
  useEffect(() => {
    getDepartment();
  }, [getDepartment]);

  // to set the department data from reducer.
  useEffect(() => {
    setDepartmentArray(departments);
    setDepartmentInputFields([
      {
        label: "Department Name",
        type: "text",
        placeholder: "Enter Department Name",
        name: "departmentName", // this name should be equal to the data array key's.
        handleOnChange: (val) => {
          setDepartment(val);
        },
      },
    ]);
  }, [departments]);

  // custom hook.
  const { formValidation, isFormValid } = useFormValidation(
    formValidationState
  );

  useEffect(() => {
    callValidation.current && callBackAfterValidation();
  }, [formValidation]);

  // Function -------------------
  // on change in text field for updating, then from FormField component
  // onChange call this func and replace the value in selectedData by the key name
  // which we have assigned in the name in inputField state.
  const handleOnchangeToSelectedData = (val, field) => {
    let tempObj = selectedDept; // for not mutating reducer state.
    console.log(tempObj);
    let temObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };
    console.log(temObj);

    // tempObj.val[field] = val;
    setSelectedDept(temObj);
    // change a particular key in the selected designation.
  };

  // toggle between the form a grid view and form .
  const toggle = () => {
    // setSelectedDept({ id: "", val: "" });
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };

  //  on click the tile open the from with data filed.
  const handleEditDepartment = React.useCallback((val, id) => {
    setSelectedDept({ id: id, val: val });
    // toggle();
  }, []);

  // delete  department
  const handleDelDepartment = React.useCallback(
    (departmentId) => {
      delDepartment(departmentId);
    },
    [delDepartment]
  );

  const onClickToggleFromTable = React.useCallback(() => {
    setIsOpenListView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenListView, setIsOpenForm]);

  // customer hook.
  const { thead, trow } = useDepartmentTable(
    departmentArray,
    handleDelDepartment,
    handleEditDepartment,
    onClickToggleFromTable
  );

  // on submite add form.
  const formValidationOnSubmitAdd = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      departmentName: {
        required: true,
        isValid: true,
        value: department,
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };

  // on submite add form.
  const formValidationOnSubmitUpdate = (e) => {
    e.preventDefault();
    console.log(selectedDept);
    let formValidationList = {
      // key name should be same as the input field name.
      departmentName: {
        required: true,
        isValid: true,
        value: selectedDept.val.departmentName,
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };

  const callBackAfterValidation = () => {
    console.log("formValidation:", isFormValid);
    if (isFormValid) {
      // if form valid.
      if (selectedDept.id !== "") {
        // updated department.
        updateDepartment(selectedDept.val);
        setSelectedDept({ id: "", val: "" });
        toggle();
      } else {
        // add department
        let formData = {
          departmentName: department,
        };
        addDepartment(formData);
        toggle();
      }
    }
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <h3>Department</h3>
          </Col>
          <Col>
            {isOpenGridView ? (
              <Button
                color=""
                className="btn-admin-settings float-right"
                onClick={() => {
                  setIsOpenGridView(false);
                  setIsOpenListView(true);
                  setIsOpenForm(false);
                }}
              >
                <i className="fas   fa-list "></i>
              </Button>
            ) : (
              <Button
                color=""
                className="btn-admin-settings float-right"
                onClick={() => {
                  setIsOpenGridView(true);
                  setIsOpenListView(false);
                  setIsOpenForm(false);
                }}
              >
                <i className="fas fa-th-large float-right "></i>
              </Button>
            )}
          </Col>
        </Row>
        <hr></hr>
        <Collapse isOpen={isOpenForm}>
          {selectedDept.id !== "" ? (
            <FromEditFields
              inputFields={departmentInputFields}
              handleOnchangeToSelectedData={(val, field) =>
                handleOnchangeToSelectedData(val, field)
              }
              // handleSubmit={handleUpdateDepartment}
              handleSubmit={formValidationOnSubmitUpdate}
              formValidation={formValidation}
              formData={selectedDept}
              button={"Update"}
              toggle={toggle}
            ></FromEditFields>
          ) : (
            <FromFields
              inputFields={departmentInputFields}
              // handleSubmit={handleAddDepartment}
              handleSubmit={formValidationOnSubmitAdd}
              formValidation={formValidation}
              button={"Add"}
              toggle={toggle}
            ></FromFields>
          )}
        </Collapse>
        <Collapse isOpen={isOpenGridView}>
          <GridView
            pagaData={departmentArray}
            displayData={{ heading: "departmentName", id: "departmentId" }}
            isOpenGridView={isOpenGridView}
            emptyFormField={() => setSelectedDept({ id: "", val: "" })}
            handleDel={handleDelDepartment}
            toggle={toggle}
            handleSelectedDesg={(val, id) => handleEditDepartment(val, id)}
          ></GridView>
        </Collapse>
        <Collapse isOpen={isOpenListView}>
          <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
        </Collapse>
      </Container>
    </Fragment>
  );
};

Department.prototype = {
  getDepartment: PropTypes.func,
  addDepartment: PropTypes.func,
  updateDepartment: PropTypes.func,
  delDepartment: PropTypes.func,
};

const mapStateToProps = (state) => ({
  departments: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getDepartment,
  addDepartment,
  updateDepartment,
  delDepartment,
})(Department);

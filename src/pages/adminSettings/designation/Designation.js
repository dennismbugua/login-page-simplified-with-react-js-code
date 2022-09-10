import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Collapse, Row, Col, Button } from "reactstrap";
import TableWithSortPagtn from "../../../components/common/TableWithSortPagtn";
import {
  GridView,
  FromFields,
  FromEditFields,
  useDesignationTableEle,
} from "../../../components/adminSettings/index";
import {
  getDesignation,
  addDesignation,
  updateDesignation,
  delDesignation,
  getDepartment,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import useFormValidation from "../../../components/common/useFormValidation";

const Designation = (props) => {
  const {
    getDesignation,
    updateDesignation,
    addDesignation,
    delDesignation,
    getDepartment,
  } = props;
  const { designations, departments } = props.designations;

  const [designationArr, setDesignationArray] = useState([]);
  const [designation, setDesignation] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [selectedDesg, setSelectedDesg] = useState({ id: "", val: "" });
  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenListView, setIsOpenListView] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [departmentArray, setDepartmentArray] = useState([]);
  const [desgnationInpuFields, setDesignationInputFields] = useState([]);
  const [formValidationState, setFormValidationState] = useState({});
  const callValidation = useRef(false);

  // call the designation data
  useEffect(() => {
    getDesignation();
    getDepartment();
  }, [getDesignation, getDepartment]);

  // to set the designation data from reducer.
  useEffect(() => {
    setDesignationArray(designations);
    setDepartmentArray(departments);
    setDesignationInputFields([
      {
        label: "Designation Name",
        type: "text",
        placeholder: "Enter Designation Name",
        name: "designationName", // this name should be equal to the data array key's.
        handleOnChange: (val) => {
          setDesignation(val);
        },
      },
      {
        label: "Department Name",
        type: "select",
        option: departments,
        displayData: { selectedData: "departmentName", id: "departmentId" },
        name: "departmentId", // this name should be equal to the data array key's name.
        handleOnChange: (val) => {
          setDepartmentId(val);
        },
      },
    ]);
  }, [designations, departments]);
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
    let tempObj = selectedDesg; // for not mutating reducer state.
    console.log(selectedDesg.val.departmentId);
    let updatedObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };
    setSelectedDesg(updatedObj);
    // change a particular key in the selected designation.
  };

  // toggle between the form a grid view and form .
  const toggle = () => {
    // setSelectedDesg({ id: "", val: "" });
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };
  //  on click the tile open the from with data filed.
  const handleEditDesignation = React.useCallback((val, id) => {
    setSelectedDesg({ id: id, val: val });
    // toggle();
  }, []);

  const handleDesignationAdd = (e) => {
    e.preventDefault();
    let formData = {
      designationName: designation,
      departmentId: parseInt(departmentId),
    };
    addDesignation(formData);
    toggle();
  };
  const handleDesignationUpdate = (e) => {
    e.preventDefault();
    let formData = {
      designationId: selectedDesg.val.designationId,
      designationName: selectedDesg.val.designationName,
      departmentId: parseInt(selectedDesg.val.departmentId),
      departmentList: [],
    };
    updateDesignation(formData);
    setSelectedDesg({ id: "", val: "" });
    toggle();
  };
  // delete  designation.
  const handleDelDesignation = React.useCallback(
    (delId) => {
      delDesignation(parseInt(delId));
    },
    [delDesignation]
  );

  const onClickToggleFromTable = React.useCallback(() => {
    setIsOpenListView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenListView, setIsOpenForm]);

  // customer hook.
  const { thead, trow } = useDesignationTableEle(
    designationArr,
    departmentArray,
    handleDelDesignation,
    handleEditDesignation,
    onClickToggleFromTable
  );

  // Validation on add form Add.
  const formValidationOnSubmitAdd = () => {
    let formValidationList = {
      // key name should be same as the input field name.
      designationName: {
        required: true,
        isValid: true,
        value: designation,
        errorMessage: "",
      },
      departmentId: {
        required: true,
        isValid: true,
        value: departmentId,
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  // Validation on add form Add.
  const formValidationOnSubmitUpdate = () => {
    let formValidationList = {
      // key name should be same as the input field name.
      designationName: {
        required: true,
        isValid: true,
        value: selectedDesg.val.designationName,
        errorMessage: "",
      },
      departmentId: {
        required: true,
        isValid: true,
        value: String(selectedDesg.val.departmentId),
        // value: "",
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
      if (selectedDesg.id !== "") {
        // update.
        let formData = {
          designationId: selectedDesg.val.designationId,
          designationName: selectedDesg.val.designationName,
          departmentId: parseInt(selectedDesg.val.departmentId),
          departmentList: [],
        };
        updateDesignation(formData);
        setSelectedDesg({ id: "", val: "" });
        toggle();
      } else {
        // add.
        let formData = {
          designationName: designation,
          departmentId: parseInt(departmentId),
        };
        addDesignation(formData);
        toggle();
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Designation</h3>
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
              <i className="fas fa-list"></i>
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
        {selectedDesg.id !== "" ? (
          <FromEditFields
            inputFields={desgnationInpuFields}
            handleOnchangeToSelectedData={(val, field) =>
              handleOnchangeToSelectedData(val, field)
            }
            // handleSubmit={handleDesignationUpdate}
            handleSubmit={formValidationOnSubmitUpdate}
            formValidation={formValidation}
            formData={selectedDesg}
            button={"Update"}
            toggle={toggle}
          ></FromEditFields>
        ) : (
          <FromFields
            inputFields={desgnationInpuFields}
            // handleSubmit={handleDesignationAdd}
            handleSubmit={formValidationOnSubmitAdd}
            formValidation={formValidation}
            button={"Add"}
            toggle={toggle}
          ></FromFields>
        )}
      </Collapse>
      <Collapse isOpen={isOpenGridView}>
        <GridView
          pagaData={designationArr}
          displayData={{ heading: "designationName", id: "designationId" }}
          isOpenGridView={isOpenGridView}
          emptyFormField={() => setSelectedDesg({ id: "", val: "" })}
          handleDel={handleDelDesignation}
          toggle={toggle}
          handleSelectedDesg={(val, id) => handleEditDesignation(val, id)}
        ></GridView>
      </Collapse>
      <Collapse isOpen={isOpenListView}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </Collapse>
    </div>
  );
};

Designation.prototype = {
  getDesignation: PropTypes.func,
  addDesignation: PropTypes.func,
  updateDesignation: PropTypes.func,
  delDesignation: PropTypes.func,
};

const mapStateToProps = (state) => ({
  designations: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getDesignation,
  addDesignation,
  updateDesignation,
  delDesignation,
  getDepartment,
})(Designation);

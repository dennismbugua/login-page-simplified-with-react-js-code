import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Collapse, Row, Col, Button } from "reactstrap";
import TableWithSortPagtn from "../../../components/common/TableWithSortPagtn";
import {
  GridView,
  FromFields,
  FromEditFields,
  useEmployeeTypeTable,
} from "../../../components/adminSettings/index";
import {
  getEmployeeTypeList,
  addEmployeeType,
  updateEmployeeType,
  delEmployeeType,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import useFormValidation from "../../../components/common/useFormValidation";

const EmployeeTypes = (props) => {
  const {
    getEmployeeTypeList,
    addEmployeeType,
    updateEmployeeType,
    delEmployeeType,
  } = props;
  const { employeetypes } = props.employeetypes;

  const [employeeType, setEmployeeType] = useState("");

  const [selectedEmptype, setSelectedEmptype] = useState({ id: "", val: "" });
  const [emptypeArray, setEmpTypeArray] = useState([]);
  const [employeeTypeInpuFields, setEmployeeTypeInpuFields] = useState([]);

  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenListView, setIsOpenListView] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const [formValidationState, setFormValidationState] = useState({});
  const callValidation = useRef(false);

  // custom hook.
  const { formValidation, isFormValid } = useFormValidation(
    formValidationState
  );

  useEffect(() => {
    console.log("in change useEffect");
    callValidation.current && callBackAfterValidation();
  }, [formValidation]);

  // call the employee type data
  useEffect(() => {
    getEmployeeTypeList();
  }, [getEmployeeTypeList]);

  // to set the employee type data from reducer.
  useEffect(() => {
    setEmpTypeArray(employeetypes);
    setEmployeeTypeInpuFields([
      {
        label: "Employee Type",
        type: "text",
        placeholder: "Enter Employee Type",
        name: "employeeTypeValue", // this name should be equal to the employee types array key's.
        handleOnChange: (val) => {
          setEmployeeType(val);
        },
      },
    ]);
  }, [employeetypes]);

  // Function -------------------
  // on change in text field for updating, then from FormField component
  // onChange call this func and replace the value in selectedData by the key name
  // which we have assigned in the name in inputField state.
  const handleOnchangeToSelectedData = (val, field) => {
    let tempObj = selectedEmptype; // for not mutating reducer state.
    let updateObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };
    setSelectedEmptype(updateObj); // change a particular key in the selected emptype.
  };
  // toggle between the form a grid view and form .

  const toggle = () => {
    // setSelectedDesg({ id: "", val: "" });
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };
  //  on click the tile ,open the from with data filed.
  const handleEditEmployeeType = React.useCallback((val, id) => {
    setSelectedEmptype({ id: id, val: val });
    // toggle();
  }, []);

  // delete
  const handleDelEmployeeType = React.useCallback(
    (employeeTypeId) => {
      delEmployeeType(employeeTypeId);
    },
    [delEmployeeType]
  );

  const onClickToggleFromTable = React.useCallback(() => {
    setIsOpenListView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenListView, setIsOpenForm]);

  // customer hook.
  const { thead, trow } = useEmployeeTypeTable(
    emptypeArray,
    handleDelEmployeeType,
    handleEditEmployeeType,
    onClickToggleFromTable
  );

  const formValidationOnSubmitAdd = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      employeeTypeValue: {
        required: true,
        isValid: true,
        value: employeeType,
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };

  const formValidationOnSubmitUpdate = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      employeeTypeValue: {
        required: true,
        isValid: true,
        value: selectedEmptype.val.employeeTypeValue,
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
      if (selectedEmptype.id !== "") {
        // update
        console.log("updated", selectedEmptype.val);
        updateEmployeeType(selectedEmptype.val);
        setSelectedEmptype({ id: "", val: "" });
        toggle();
      } else {
        // add
        console.log("add", employeeType);
        let formData = {
          employeeTypeValue: employeeType,
        };
        addEmployeeType(formData);
        toggle();
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Empolyee Type</h3>
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
        {selectedEmptype.id !== "" ? (
          <FromEditFields
            inputFields={employeeTypeInpuFields}
            handleOnchangeToSelectedData={(val, field) =>
              handleOnchangeToSelectedData(val, field)
            }
            // handleSubmit={handleDataUpdate}
            handleSubmit={formValidationOnSubmitUpdate}
            formValidation={formValidation}
            formData={selectedEmptype}
            button={"Update"}
            toggle={toggle}
          ></FromEditFields>
        ) : (
          <FromFields
            inputFields={employeeTypeInpuFields}
            // handleSubmit={handleDataAdd}
            handleSubmit={formValidationOnSubmitAdd}
            formValidation={formValidation}
            button={"Add"}
            toggle={toggle}
          ></FromFields>
        )}
      </Collapse>
      <Collapse isOpen={isOpenGridView}>
        <GridView
          pagaData={emptypeArray}
          displayData={{ heading: "employeeTypeValue", id: "employeeTypeId" }}
          isOpenGridView={isOpenGridView}
          emptyFormField={() => setSelectedEmptype({ id: "", val: "" })}
          handleDel={handleDelEmployeeType}
          toggle={toggle}
          handleSelectedDesg={(val, id) => handleEditEmployeeType(val, id)}
        ></GridView>
      </Collapse>
      <Collapse isOpen={isOpenListView}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </Collapse>
    </div>
  );
};

EmployeeTypes.prototype = {
  getEmployeeTypeList: PropTypes.func,
  addEmployeeType: PropTypes.func,
  updateEmployeeType: PropTypes.func,
  delEmployeeType: PropTypes.func,
};

const mapStateToProps = (state) => ({
  employeetypes: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getEmployeeTypeList,
  addEmployeeType,
  updateEmployeeType,
  delEmployeeType,
})(EmployeeTypes);

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Collapse, Row, Col, Button } from "reactstrap";
import TableWithSortPagtn from "../../../components/common/TableWithSortPagtn";
import {
  GridView,
  FromFields,
  FromEditFields,
  useLeaveTypeTable,
} from "../../../components/adminSettings/index";
import {
  getLeaves,
  addLeaves,
  updateLeaves,
  delLeaves,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import useFormValidation from "../../../components/common/useFormValidation";

const Leaves = (props) => {
  const { getLeaves, addLeaves, updateLeaves, delLeaves } = props;
  const { leavetypes } = props.leavetypes;

  const [leavesArr, setleavesArr] = useState([]);
  const [leaveTypeArray, setLeaveTypeArray] = useState("");
  const [leaveType, setLeaveType] = useState("");

  const [leavePerYear, setLeavePerYear] = useState(0);
  const [leaveCarryForwarded, setLeaveCarryForwarded] = useState(0);
  const [leaveAppyPerYear, setLeaveAppyPerYear] = useState(0);

  const [selectedLeaves, setSelectedLeaves] = useState({ id: "", val: "" });
  const [leaveTypeInputFields, setLeaveTypeInputFields] = useState([]);

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
    // calls when form submited`
    callValidation.current && callBackAfterValidation();
  }, [formValidation]);

  // call the employee type data
  useEffect(() => {
    getLeaves();
  }, [getLeaves]);

  // input fileds.
  useEffect(() => {
    setleavesArr(leavetypes);
    setLeaveTypeInputFields([
      {
        label: "Leave Types",
        type: "text",
        placeholder: "Enter Leave Type",
        name: "leaveType", // this name should be equal to the leave type array key's.
        handleOnChange: (val) => {
          setLeaveType(val);
        },
      },
      {
        label: "No of Leaves Per Year",
        type: "number",
        placeholder: "Enter No of Leaves Per year",
        name: "noOfLeavesPerYear", // this name should be equal to the Leave array key's.
        defaultValue: 0,
        handleOnChange: (val) => {
          setLeavePerYear(val);
        },
      },
      {
        label: "No of Leaves Carry Forwarded",
        type: "number",
        placeholder: "Enter No of Leaves Carry Forwarded",
        name: "noOfLeavesCarryForwarded", // this name should be equal to the Leave array key's.
        defaultValue: 0,
        handleOnChange: (val) => {
          setLeaveCarryForwarded(val);
        },
      },
      {
        label: "No of Leave Applied Per Year",
        type: "number",
        placeholder: "Enter No of Leave Applied Per Year",
        name: "noOfLeavesAppliedPerYear", // this name should be equal to the Leave array key's.
        defaultValue: 0,
        handleOnChange: (val) => {
          setLeaveAppyPerYear(val);
        },
      },
    ]);
  }, [leavetypes]);

  // Function -------------------
  // on change in text field for updating, then from FormField component
  // onChange call this func and replace the value in selectedData by the key name
  // which we have assigned in the name in inputField state.
  const handleOnchangeToSelectedData = (val, field) => {
    let tempObj = selectedLeaves; // for not mutating reducer state.
    console.log(selectedLeaves);
    let updateObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };

    setSelectedLeaves(updateObj);
  };
  // toggle between the form a grid view and form .

  const toggle = () => {
    // setSelectedDesg({ id: "", val: "" });
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };

  //  on click the tile ,open the from with data filed.
  const handleEditLeaves = React.useCallback((val, id) => {
    setSelectedLeaves({ id: id, val: val });
    // toggle();
  }, []);

  // handle the dropdown change in list view.
  const handleDropDownBtnOnChange = (val) => {
    console.log(val);
  };

  const handleAddLeaves = (e) => {
    e.preventDefault();
    let formData = {
      leaveType: leaveType,
      noOfLeavesPerYear: leavePerYear !== "" ? parseFloat(leavePerYear) : 0,
      noOfLeavesCarryForwarded:
        leaveCarryForwarded !== "" ? parseFloat(leaveCarryForwarded) : 0,
      noOfLeavesAppliedPerYear:
        leaveAppyPerYear !== "" ? parseFloat(leaveAppyPerYear) : 0,
    };
    addLeaves(formData);
    toggle();
  };

  const handleUpdateLeaves = (e) => {
    e.preventDefault();
    updateLeaves(selectedLeaves.val);
    setSelectedLeaves({ id: "", val: "" });
    toggle();
  };
  // delete
  const handleDelLeaves = React.useCallback(
    (leaveTypeId) => {
      delLeaves(leaveTypeId);
    },
    [delLeaves]
  );

  const onClickToggleFromTable = React.useCallback(() => {
    setIsOpenListView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenListView, setIsOpenForm]);

  // customer hook.
  const { thead, trow } = useLeaveTypeTable(
    leavesArr,
    handleDelLeaves,
    handleEditLeaves,
    onClickToggleFromTable
  );

  const formValidationOnSubmitAdd = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      leaveType: {
        required: true,
        isValid: true,
        value: leaveType,
        errorMessage: "",
      },
      noOfLeavesPerYear: {
        required: true,
        isValid: true,
        value: leavePerYear === 0 ? "" : leavePerYear,
        errorMessage: "",
      },
      noOfLeavesCarryForwarded: {
        required: true,
        isValid: true,
        value: leaveCarryForwarded === 0 ? "" : leaveCarryForwarded,
        errorMessage: "",
      },
      noOfLeavesAppliedPerYear: {
        required: true,
        isValid: true,
        value: leaveAppyPerYear === 0 ? "" : leaveAppyPerYear,
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
      leaveType: {
        required: true,
        isValid: true,
        value: selectedLeaves.val.leaveType,
        errorMessage: "",
      },
      noOfLeavesPerYear: {
        required: true,
        isValid: true,
        value: String(selectedLeaves.val.noOfLeavesPerYear),
        errorMessage: "",
      },
      noOfLeavesCarryForwarded: {
        required: true,
        isValid: true,
        value: String(selectedLeaves.val.noOfLeavesCarryForwarded),
        errorMessage: "",
      },
      noOfLeavesAppliedPerYear: {
        required: true,
        isValid: true,
        value: String(selectedLeaves.val.noOfLeavesAppliedPerYear),
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  const callBackAfterValidation = () => {
    console.log("formValidation:", selectedLeaves.id);
    if (isFormValid) {
      // if form valid.
      if (selectedLeaves.id !== "") {
        updateLeaves(selectedLeaves.val);
        setSelectedLeaves({ id: "", val: "" });
        toggle();
      } else {
        let formData = {
          leaveType: leaveType,
          noOfLeavesPerYear: leavePerYear !== "" ? parseFloat(leavePerYear) : 0,
          noOfLeavesCarryForwarded:
            leaveCarryForwarded !== "" ? parseFloat(leaveCarryForwarded) : 0,
          noOfLeavesAppliedPerYear:
            leaveAppyPerYear !== "" ? parseFloat(leaveAppyPerYear) : 0,
        };
        addLeaves(formData);
        toggle();
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Leave Type</h3>
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
        {selectedLeaves.id !== "" ? (
          <FromEditFields
            inputFields={leaveTypeInputFields}
            handleOnchangeToSelectedData={(val, field) =>
              handleOnchangeToSelectedData(val, field)
            }
            // handleSubmit={handleUpdateLeaves}
            handleSubmit={formValidationOnSubmitUpdate}
            formValidation={formValidation}
            formData={selectedLeaves}
            button={"Update"}
            toggle={toggle}
          ></FromEditFields>
        ) : (
          <FromFields
            inputFields={leaveTypeInputFields}
            // handleSubmit={handleAddLeaves}
            handleSubmit={formValidationOnSubmitAdd}
            formValidation={formValidation}
            button={"Add"}
            toggle={toggle}
          ></FromFields>
        )}
      </Collapse>
      <Collapse isOpen={isOpenGridView}>
        <GridView
          pagaData={leavesArr}
          displayData={{ heading: "leaveType", id: "leaveTypeId" }}
          isOpenGridView={isOpenGridView}
          emptyFormField={() => setSelectedLeaves({ id: "", val: "" })}
          handleDel={handleDelLeaves}
          toggle={toggle}
          handleSelectedDesg={(val, id) => handleEditLeaves(val, id)}
        ></GridView>
      </Collapse>
      <Collapse isOpen={isOpenListView}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </Collapse>
    </div>
  );
};

Leaves.prototype = {
  getLeaves: PropTypes.func,
  addLeaves: PropTypes.func,
  updateLeaves: PropTypes.func,
  delLeaves: PropTypes.func,
};

const mapStateToProps = (state) => ({
  leavetypes: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getLeaves,
  addLeaves,
  updateLeaves,
  delLeaves,
})(Leaves);

import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Collapse, Row, Col, Button } from "reactstrap";
import {
  GridView,
  FromFields,
  FromEditFields,
  useTableWorkPrimise,
} from "../../../components/adminSettings/index";
import {
  getWorkPrimise,
  addWorkPrimise,
  updateWorkPrimise,
  delWorkPrimise,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import TableWithSortPagtn from "../../../components/common/TableWithSortPagtn";
import useFormValidation from "../../../components/common/useFormValidation";

const WorkPrimise = (props) => {
  const {
    getWorkPrimise,
    addWorkPrimise,
    updateWorkPrimise,
    delWorkPrimise,
  } = props;
  const { workPrimisesList } = props.workPrimisesList;
  const [dataArr, setDataArr] = useState([]);
  const [workPrimise, setWorkPrimise] = useState("");
  const [selectedData, setSelectedData] = useState({ id: "", val: "" });
  const [workPrimiseFormValidation, setworkPrimiseFormValidation] = useState(
    {}
  );
  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenListView, setIsOpenListView] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const callValidation = useRef(false);

  const [workPrimiseInpuFields, setWorkPrimiseInpuFields] = useState([
    {
      label: "Work Premise Type",
      type: "text",
      placeholder: "Enter Work Premise",
      value: workPrimise,
      name: "workingPremiseType", // this name should be equal to the designation array key's.
      handleOnChange: (val) => {
        setWorkPrimise(val);
      },
    },
  ]);

  useEffect(() => {
    getWorkPrimise();
  }, [getWorkPrimise]);

  useEffect(() => {
    setDataArr(workPrimisesList);
  }, [workPrimisesList]);

  // Function -------------------
  // on change in text field for updating, then from FormField component
  // onChange call this func and replace the value in selectedData by the key name
  // which we have assigned in the name in inputField state.
  const handleOnchangeToSelectedData = (val, field) => {
    let tempObj = selectedData; // for not mutating reducer state.
    let updateObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };
    setSelectedData(updateObj);
  };
  // toggle between the form a grid view and form .
  const toggle = () => {
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };
  //  on click the tile ,open the from with data filed.
  const handleEditClick = React.useCallback((val, id) => {
    setSelectedData({ id: id, val: val });
  }, []);

  const handleDataAdd = (e) => {
    e.preventDefault();
    console.log(workPrimise);
    let formData = {
      workingPremiseType: workPrimise,
      description: "",
    };
    addWorkPrimise(formData);
    setWorkPrimise("");
    toggle();
  };
  const handleDataUpdate = (e) => {
    e.preventDefault();
    let formData = selectedData.val;
    updateWorkPrimise(formData);
    setSelectedData({ id: "", val: "" });
    toggle();
  };

  // handle delete work primise.
  const handleDelWorkPrimsie = React.useCallback(
    (delId) => {
      delWorkPrimise(delId);
    },
    [delWorkPrimise]
  );

  const toggleBtn = React.useCallback(() => {
    setIsOpenGridView((prevState) => !prevState);
    setIsOpenListView((prevState) => !prevState);
  }, [setIsOpenGridView, setIsOpenListView]);

  const onClickToggleFromTable = React.useCallback(() => {
    setIsOpenListView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenListView, setIsOpenForm]);

  // make text feild empty.
  const emptyFormField = () => {
    setSelectedData({ id: "", val: "" });
  };
  const empty = () => {
    setWorkPrimiseInpuFields([
      {
        label: "Work Premise Type",
        type: "text",
        placeholder: "Enter Work Premise",
        value: workPrimise,
        name: "workingPremiseType", // this name should be equal to the designation array key's.
        handleOnChange: (val) => {
          setWorkPrimise(val);
        },
      },
    ]);
  };

  // customer hook.
  const { thead, trow } = useTableWorkPrimise(
    dataArr,
    handleDelWorkPrimsie,
    handleEditClick,
    onClickToggleFromTable
  );

  const { formValidation, isFormValid } = useFormValidation(
    workPrimiseFormValidation
  );

  useEffect(() => {
    callValidation.current && callBack();
  }, [formValidation]);

  const formValidationOnSubmitAdd = (e) => {
    e.preventDefault();

    let formValidationList = {
      // key name should be same as the input field name.
      workingPremiseType: {
        required: true,
        isValid: true,
        value: workPrimise,
        errorMessage: "",
      },
    };
    setworkPrimiseFormValidation(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  // form validation on update form.
  const formValidationOnSubmitUpdate = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      workingPremiseType: {
        required: true,
        isValid: true,
        value: selectedData.val.workingPremiseType,
        errorMessage: "",
      },
    };
    setworkPrimiseFormValidation(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  const callBack = () => {
    if (isFormValid) {
      // if form valid.
      if (selectedData.id !== "") {
        // updation.
        console.log(selectedData.val);
        let formData = selectedData.val;
        updateWorkPrimise(formData);
        setSelectedData({ id: "", val: "" });
        toggle();
      } else {
        // add.
        console.log(workPrimise);
        let formData = {
          workingPremiseType: workPrimise,
          description: "",
        };
        addWorkPrimise(formData);
        setWorkPrimise("");
        toggle();
      }
    }
  };
  return (
    <div>
      {/* {console.log(formValidation)} */}
      <Row>
        <Col>
          <h3>Work Premise</h3>
        </Col>
        <Col>
          {isOpenGridView ? (
            <Button
              color=""
              className="btn-admin-settings float-right"
              onClick={toggleBtn}
            >
              <i className="fas fa-list "></i>
            </Button>
          ) : (
            <Button
              color=""
              className="btn-admin-settings float-right"
              onClick={toggleBtn}
            >
              <i className="fas fa-th-large float-right "></i>
            </Button>
          )}
        </Col>
      </Row>
      <hr></hr>
      <Collapse isOpen={isOpenForm}>
        {selectedData.id !== "" ? (
          <FromEditFields
            inputFields={workPrimiseInpuFields}
            handleOnchangeToSelectedData={(val, field) =>
              handleOnchangeToSelectedData(val, field)
            }
            // handleSubmit={handleDataUpdate}
            handleSubmit={formValidationOnSubmitUpdate}
            formValidation={formValidation}
            formData={selectedData}
            button={"Update"}
            toggle={toggle}
          ></FromEditFields>
        ) : (
          <FromFields
            inputFields={workPrimiseInpuFields}
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
          pagaData={dataArr}
          displayData={{
            heading: "workingPremiseType",
            id: "workingPremiseId",
          }}
          isOpenGridView={isOpenGridView}
          emptyFormField={emptyFormField}
          toggle={() => {
            setIsOpenGridView(!isOpenGridView);
            setIsOpenForm(!isOpenForm);
            empty();
          }}
          handleSelectedDesg={(val, id) => handleEditClick(val, id)}
          handleDel={handleDelWorkPrimsie}
        ></GridView>
      </Collapse>

      <Collapse isOpen={isOpenListView}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </Collapse>
    </div>
  );
};

WorkPrimise.prototype = {
  getWorkPrimise: PropTypes.func,
  addWorkPrimise: PropTypes.func,
  updateWorkPrimise: PropTypes.func,
};

const mapStateToProps = (state) => ({
  workPrimisesList: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getWorkPrimise,
  addWorkPrimise,
  updateWorkPrimise,
  delWorkPrimise,
})(WorkPrimise);

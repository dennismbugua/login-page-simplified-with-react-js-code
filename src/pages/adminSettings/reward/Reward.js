import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getRewards,
  addRewards,
  updateRewards,
  delRewards,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import { Collapse, Row, Col, Button } from "reactstrap";
import {
  GridView,
  ListView,
  FromFields,
  FromEditFields,
} from "../../../components/adminSettings/index";
import useFormValidation from "../../../components/common/useFormValidation";

// Data for  list view.
const thead = ["reward Type", "reward Points"];

const Reward = (props) => {
  const { getRewards, addRewards, updateRewards, delRewards } = props;
  const { rewards } = props.rewards;
  const [dataArr, setDataArr] = useState([]);
  const [rewardDescription, setRewardDescription] = useState("");
  const [rewardPoint, setRewardPoint] = useState("");
  const [selectedData, setSelectedData] = useState({ id: "", val: "" });
  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenListView, setIsOpenListView] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  // input fileds.
  const [employeeTypeInpuFields] = useState([
    {
      label: "Reward Type",
      type: "text",
      placeholder: "Enter Reward Type",
      name: "rewardType", // this name should be equal to the designation array key's.
      handleOnChange: (val) => {
        setRewardDescription(val);
      },
    },
    {
      label: "Reward Point",
      type: "number",
      placeholder: "Enter Reward Point",
      name: "rewardPoints", // this name should be equal to the designation array key's.
      handleOnChange: (val) => {
        setRewardPoint(val);
      },
    },
  ]);
  const [formValidationState, setFormValidationState] = useState({});
  const callValidation = useRef(false);

  // custom hook.
  const { formValidation, isFormValid } = useFormValidation(
    formValidationState
  );

  useEffect(() => {
    callValidation.current && callBackAfterValidation();
  }, [formValidation]);

  useEffect(() => {
    getRewards();
  }, [getRewards]);
  useEffect(() => {
    console.log(rewards);
    let rewardListOfNotDel = rewards.filter(
      (rewards) => rewards.isActive === true
    );

    setDataArr(rewardListOfNotDel);
  }, [rewards]);

  // Function -------------------
  // on change in text field for updating, then from FormField component
  // onChange call this func and replace the value in selectedData by the key name
  // which we have assigned in the name in inputField state.
  const handleOnchangeToSelectedData = (val, field) => {
    let tempObj = selectedData;
    console.log(selectedData);
    let updateObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };
    console.log(updateObj);

    setSelectedData(updateObj);
  };
  // toggle between the form a grid view and form .

  const toggle = () => {
    // setSelectedDesg({ id: "", val: "" });
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };
  //  on click the tile ,open the from with data filed.
  const handleEditClick = (val, id) => {
    setSelectedData({ id: id, val: val });
    // toggle();
  };

  const handleDataAdd = (e) => {
    e.preventDefault();

    let formData = {
      rewardType: rewardDescription,
      rewardPoints: parseFloat(rewardPoint),
    };
    addRewards(formData);

    toggle();
  };
  const handleDataUpdate = (e) => {
    e.preventDefault();
    console.log(selectedData);
    // convert the ponts from string to float.
    selectedData.val["rewardPoints"] = parseFloat(
      selectedData.val["rewardPoints"]
    );
    updateRewards(selectedData.val);
    setSelectedData({ id: "", val: "" });
    toggle();
  };
  // handle delete rewards.
  const handleDelRewards = React.useCallback(
    (delId) => {
      delRewards(delId);
    },
    [delRewards]
  );
  // on form Add.
  const formValidationOnSubmitAdd = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      rewardType: {
        required: true,
        isValid: true,
        value: rewardDescription,
        errorMessage: "",
      },
      rewardPoints: {
        required: true,
        isValid: true,
        value: rewardPoint,
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };

  // on form update.
  const formValidationOnSubmitUpdate = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      rewardType: {
        required: true,
        isValid: true,
        value: selectedData.val.rewardType,
        errorMessage: "",
      },
      rewardPoints: {
        required: true,
        isValid: true,
        value: String(selectedData.val.rewardPoints),
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  const callBackAfterValidation = () => {
    if (isFormValid) {
      console.log("formValidation:", isFormValid);

      // if form valid.
      if (selectedData.id !== "") {
        // convert the ponts from string to float.
        selectedData.val["rewardPoints"] = parseFloat(
          selectedData.val["rewardPoints"]
        );
        updateRewards(selectedData.val);
        setSelectedData({ id: "", val: "" });
        toggle();
      } else {
        let formData = {
          rewardType: rewardDescription,
          isActive: true,
          rewardPoints: parseFloat(rewardPoint),
        };
        addRewards(formData);
        toggle();
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Rewards</h3>
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
        {selectedData.id !== "" ? (
          <FromEditFields
            inputFields={employeeTypeInpuFields}
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
          pagaData={dataArr}
          displayData={{ heading: "rewardType", id: "rewardId" }}
          isOpenGridView={isOpenGridView}
          emptyFormField={() => setSelectedData({ id: "", val: "" })}
          toggle={() => {
            setIsOpenGridView(!isOpenGridView);
            setIsOpenForm(!isOpenForm);
          }}
          handleSelectedDesg={(val, id) => handleEditClick(val, id)}
          handleDel={handleDelRewards}
        ></GridView>
      </Collapse>
      <Collapse isOpen={isOpenListView}>
        <ListView
          thead={thead}
          listData={dataArr}
          toggle={() => {
            setIsOpenListView(!isOpenListView);
            setIsOpenForm(!isOpenForm);
          }}
          handleSelectedDesg={(val, id) => handleEditClick(val, id)}
          handleDel={handleDelRewards}
        ></ListView>
      </Collapse>
    </div>
  );
};

Reward.propTypes = {
  getRewards: PropTypes.func,
  addRewards: PropTypes.func,
  updateRewards: PropTypes.func,
  delRewards: PropTypes.func,
};

const mapStateToProps = (state) => ({
  rewards: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getRewards,
  addRewards,
  updateRewards,
  delRewards,
})(Reward);

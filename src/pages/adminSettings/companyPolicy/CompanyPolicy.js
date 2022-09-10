import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Collapse, Row, Col, Button } from "reactstrap";
import TableWithSortPagtn from "../../../components/common/TableWithSortPagtn";
import {
  GridView,
  FromFields,
  FromEditFields,
  ListView,
  useComapnyPolicyTable,
} from "../../../components/adminSettings/index";
import {
  getCompanyPolicies,
  addCompanyPolicies,
  updateCompanyPolicies,
  delCompanyPolicies,
  getDepartment,
} from "../../../redux/actions/adminSettings/adminSettings.action";
import useFormValidation from "../../../components/common/useFormValidation";

const CompanyPolicies = (props) => {
  const {
    getCompanyPolicies,
    addCompanyPolicies,
    updateCompanyPolicies,
    delCompanyPolicies,
    getDepartment,
  } = props;
  const { companypolicies, departments } = props.companypolicies;

  const [companyPolicyArray, setcompanyPolicyArray] = useState([]);
  const [policyName, setPolicyName] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const [policyDepartment, setPolicyDepartment] = useState("");
  const [policyFile, setPolicyFile] = useState(null);
  const [departmentId, setDepartmentId] = useState("");

  const [selectedCompanyPolicies, setselectedCompanyPolicies] = useState({
    id: "",
    val: "",
  });
  const [companyPolicyInputFields, setcompanyPolicyInputFields] = useState([]);

  const [isOpenGridView, setIsOpenGridView] = useState(true);
  const [isOpenListView, setIsOpenListView] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formValidationState, setFormValidationState] = useState({});
  const callValidation = useRef(false);

  // call the employee type data
  useEffect(() => {
    getCompanyPolicies();
    getDepartment();
  }, [getCompanyPolicies, getDepartment]);

  // custom hook.
  const { formValidation, isFormValid } = useFormValidation(
    formValidationState
  );

  useEffect(() => {
    // calls when form submited`
    callValidation.current && callBackAfterValidation();
  }, [formValidation]);

  // input fileds.
  useEffect(() => {
    setcompanyPolicyArray(companypolicies);
    setPolicyDepartment(departments);
    setcompanyPolicyInputFields([
      {
        label: "Policy Name",
        type: "text",
        placeholder: "Enter Policy Name",
        name: "policyName", // this name should be equal to the designation array key's.
        handleOnChange: (val) => {
          setPolicyName(val);
        },
      },
      {
        label: "Description",
        type: "text",
        placeholder: "Enter Description",
        name: "description", // this name should be equal to the designation array key's.
        handleOnChange: (val) => {
          setPolicyDescription(val);
        },
      },
      {
        label: "Department",
        type: "select",
        option: departments,
        displayData: { selectedData: "departmentName", id: "departmentId" },
        name: "departmentId", // this name should be equal to the designation array key's.
        handleOnChange: (val) => {
          setDepartmentId(val);
        },
      },
      {
        label: "Upload File",
        type: "file",
        placeholder: "Upload File",
        name: "uploadPolicy", // this name should be equal to the designation array key's.
        handleOnChange: (val) => {
          setPolicyFile(val);
        },
      },
    ]);
  }, [companypolicies, departments]);

  // Function -------------------
  // on change in text field for updating, then from FormField component
  // onChange call this func and replace the value in selectedData by the key name
  // which we have assigned in the name in inputField state.
  const handleOnchangeToSelectedData = (val, field) => {
    let tempObj = selectedCompanyPolicies; // for not mutating reducer state.
    console.log(selectedCompanyPolicies);
    let updaeteObj = {
      ...tempObj,
      val: {
        ...tempObj.val,
        [field]: val,
      },
    };
    setselectedCompanyPolicies(updaeteObj);
  };
  // toggle between the form a grid view and form .

  const toggle = () => {
    // setSelectedDesg({ id: "", val: "" });
    setIsOpenGridView(!isOpenGridView);
    setIsOpenForm(!isOpenForm);
  };
  //  on click the tile ,open the from with data filed.
  const handleEditCompanyPolicies = React.useCallback((val, id) => {
    setselectedCompanyPolicies({ id: id, val: val });
    // toggle();
  }, []);

  const handleAddCompanyPolicies = (e) => {
    e.preventDefault();
    let formData = {
      policyName: policyName,
      description: policyDescription,
      departmentId: parseInt(departmentId),
      uploadPolicy: policyFile,
    };
    addCompanyPolicies(formData);
    toggle();
  };

  const handleUpdateComapanyPolicies = (e) => {
    e.preventDefault();
    updateCompanyPolicies(selectedCompanyPolicies.val);
    setselectedCompanyPolicies({ id: "", val: "" });
    toggle();
  };

  // delete
  const handleDelCompanyPolicies = React.useCallback(
    (companyPolicyId) => {
      delCompanyPolicies(companyPolicyId);
    },
    [delCompanyPolicies]
  );

  const onClickToggleFromTable = React.useCallback(() => {
    setIsOpenListView((prevState) => !prevState);
    setIsOpenForm((prevState) => !prevState);
  }, [setIsOpenListView, setIsOpenForm]);

  // customer hook.
  const { thead, trow } = useComapnyPolicyTable(
    companyPolicyArray,
    policyDepartment,
    handleDelCompanyPolicies,
    handleEditCompanyPolicies,
    onClickToggleFromTable
  );
  // add form validation.
  const formValidationOnSubmitAdd = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      policyName: {
        required: true,
        isValid: true,
        value: policyName,
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
  // update form validation.
  const formValidationOnSubmitUpdate = (e) => {
    e.preventDefault();
    let formValidationList = {
      // key name should be same as the input field name.
      policyName: {
        required: true,
        isValid: true,
        value: selectedCompanyPolicies.val.policyName,
        errorMessage: "",
      },
      departmentId: {
        required: true,
        isValid: true,
        value: String(selectedCompanyPolicies.val.departmentId),
        errorMessage: "",
      },
    };
    setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  const callBackAfterValidation = () => {
    // console.log("formValidation:", selectedCompanyPolicies.val);
    if (isFormValid) {
      // if form valid.
      if (selectedCompanyPolicies.id !== "") {
        let formData = {
          companyPolicyId: selectedCompanyPolicies.val.companyPolicyId,
          policyName: selectedCompanyPolicies.val.policyName,
          description: selectedCompanyPolicies.val.policyDescription,
          departmentId: selectedCompanyPolicies.val.departmentId,
          uploadPolicy: "policyFile",
        };
        updateCompanyPolicies(formData);
        setselectedCompanyPolicies({ id: "", val: "" });
        toggle();
      } else {
        let formData = {
          policyName: policyName,
          description: policyDescription,
          departmentId: parseInt(departmentId),
          uploadPolicy: "policyFile",
        };
        addCompanyPolicies(formData);
        toggle();
      }
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Company Policies</h3>
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
        {selectedCompanyPolicies.id !== "" ? (
          <FromEditFields
            inputFields={companyPolicyInputFields}
            handleOnchangeToSelectedData={(val, field) =>
              handleOnchangeToSelectedData(val, field)
            }
            // handleSubmit={handleUpdateComapanyPolicies}
            handleSubmit={formValidationOnSubmitUpdate}
            formValidation={formValidation}
            formData={selectedCompanyPolicies}
            button={"Update"}
            toggle={toggle}
          ></FromEditFields>
        ) : (
          <FromFields
            inputFields={companyPolicyInputFields}
            // handleSubmit={handleAddCompanyPolicies}
            handleSubmit={formValidationOnSubmitAdd}
            formValidation={formValidation}
            button={"Add"}
            toggle={toggle}
          ></FromFields>
        )}
      </Collapse>
      <Collapse isOpen={isOpenGridView}>
        <GridView
          pagaData={companyPolicyArray}
          displayData={{ heading: "policyName", id: "companyPolicyId" }}
          isOpenGridView={isOpenGridView}
          emptyFormField={() => setselectedCompanyPolicies({ id: "", val: "" })}
          handleDel={handleDelCompanyPolicies}
          toggle={toggle}
          handleSelectedDesg={(val, id) => handleEditCompanyPolicies(val, id)}
        ></GridView>
      </Collapse>
      <Collapse isOpen={isOpenListView}>
        <TableWithSortPagtn thead={thead} trow={trow}></TableWithSortPagtn>
      </Collapse>
    </div>
  );
};

CompanyPolicies.prototype = {
  getCompanyPolicies: PropTypes.func,
  addCompanyPolicies: PropTypes.func,
  updateCompanyPolicies: PropTypes.func,
  delCompanyPolicies: PropTypes.func,
};

const mapStateToProps = (state) => ({
  companypolicies: state.adminSettingReducer,
});

export default connect(mapStateToProps, {
  getCompanyPolicies,
  addCompanyPolicies,
  updateCompanyPolicies,
  delCompanyPolicies,
  getDepartment,
})(CompanyPolicies);

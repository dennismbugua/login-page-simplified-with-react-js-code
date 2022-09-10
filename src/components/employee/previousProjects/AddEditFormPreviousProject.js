import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import SelectBoxSearch from "../../common/SelectBoxSearch";
import "react-datepicker/dist/react-datepicker.css";
import useFormValidation from "../../../components/common/useFormValidation";
import { connect } from "react-redux";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
} from "reactstrap";

import { updatePreviousProjectList } from "../../../redux/actions/employee/employee.action";

const AddEditFormPreviousProject = React.memo(
  ({
    prevprojects,
    toggleForm,
    updatePreviousProject,
    addPreviousProject,
    ...props
  }) => {
    const [projectName, setProjectName] = useState("");
    const [technologiesArr, setTechnologiesArr] = useState([]);
    const [technology, setTechnology] = useState("");
    const [projectDescp, setProjectDescp] = useState("");
    const [role, setRole] = useState("");
    const [environment, setEnvironment] = useState("");

    const [formValidationState, setFormValidationState] = useState({});
    const callValidation = useRef(false);

    // let technologyarray = [];
    // technologyarray.push(prevprojects.technologies);

    useEffect(() => {
      // console.log(props.match.params.empId);
      if (Object.keys(prevprojects).length > 0) {
        let technologyarray = prevprojects.technologies;
        technologyarray = technologyarray.split(",");

        setProjectName(prevprojects.projectName);
        setRole(prevprojects.role);
        setTechnologiesArr(technologyarray);
        setEnvironment(prevprojects.environment);
        setProjectDescp(prevprojects.description);
      } else {
        console.log("add");
      }
    }, [prevprojects]);

    // Function --------------

    // append technology to array.
    const apendTechnology = React.useCallback(() => {
      setTechnologiesArr((prevState) => prevState.concat(technology));
    }, [setTechnologiesArr, technology]);

    // custom hook.
    const { formValidation, isFormValid } = useFormValidation(
      formValidationState
    );

    useEffect(() => {
      callValidation.current && callBackAfterValidation();
    }, [formValidation]);

    // on submite add form.
    const formValidationOnSubmitUpdate = (e) => {
      e.preventDefault();
      let formValidationList = {
        // key name should be same as the input field name.
        projectName: {
          required: true,
          isValid: true,
          value: projectName,
          errorMessage: "",
        },
      };
      setFormValidationState(formValidationList); //this set call the custom hook useFormValidation.
      callValidation.current = true;
    };

    const callBackAfterValidation = () => {
      if (isFormValid) {
        // if form valid.
        if (Object.keys(prevprojects).length > 0) {
          let formData = {
            workExperienceId: parseInt(prevprojects.workExperienceId),
            projectName: projectName,
            description: projectDescp,
            role: role,
            technologies: technologiesArr.toString(),
            environment: environment,
            employeeId: parseInt(props.match.params.empId),
          };
          updatePreviousProject(formData);
          toggleForm();
        } else {
          // add department
          console.log("working");
          let formData = {
            projectName: projectName,
            description: projectDescp,
            role: role,
            technologies: technologiesArr.toString(),
            environment: environment,
            employeeId: parseInt(props.match.params.empId),
          };
          addPreviousProject(formData);
          toggleForm();
        }
      }
    };

    return (
      <Form className="project-form">
        <Row form>
          <Col md={6}>
            <FormGroup className="padding-r-20">
              <Label for="exampleEmail">Project Name</Label>
              <Input
                type="text"
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
              />
              {Object.keys(formValidation).length !== 0 &&
                !formValidation?.projectName?.isValid && (
                  <span className=" " style={{ color: "red" }}>
                    {formValidation?.projectName?.errorMessage}
                  </span>
                )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="padding-l-20">
              <Label>Role</Label>
              <Input
                type="text"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4} xs={4}>
            <FormGroup className="padding-r-20 ">
              <Label>Technology</Label>
              <Input
                type="text"
                onChange={(e) => setTechnology(e.target.value)}
                value={technology}
              />
            </FormGroup>
          </Col>
          <Col
            md={1}
            xs={2}
            className="mt-4  "
            style={{ paddingRight: "20px" }}
          >
            <Button
              color=""
              className="btn-admin-settings mt-2 w-100 m-0  "
              onClick={apendTechnology}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </Col>
          <Col md={6}>
            <FormGroup className="padding-l-20 ">
              <Label className="d-block">Technologies</Label>
              {technologiesArr.map((technology, i) => (
                <Button
                  key={i}
                  type="button"
                  size="sm"
                  color="warning"
                  className="mt-2 ml-2 "
                >
                  <small>{technology}</small>
                  <i
                    className=" ml-2 fas fa-times"
                    // onClick={() => delTechnology(i)}
                  ></i>
                </Button>
              ))}
            </FormGroup>{" "}
          </Col>
          <Col md={6}>
            <FormGroup className="">
              <Label>Environment</Label>
              <Input
                type="text"
                onChange={(e) => setEnvironment(e.target.value)}
                value={environment}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label>Project Description</Label>
              <Input
                type="textarea"
                onChange={(e) => setProjectDescp(e.target.value)}
                value={projectDescp}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              type="submit"
              color=""
              className="btn-admin-settings"
              onClick={formValidationOnSubmitUpdate}
            >
              {Object.keys(prevprojects).length > 0 ? "Update" : "Add"}
            </Button>
            &nbsp;
            <Button color="" className="btn-cancel" onClick={toggleForm}>
              cancel
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default AddEditFormPreviousProject;

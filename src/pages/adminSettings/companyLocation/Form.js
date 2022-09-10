import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import useFormValidation from "../../../components/common/useFormValidation";

const FormFields = (props) => {
  // const { country, providene, pin, landMark } = props.selectedCompany;
  const [officeLocationId, setOfficeLocationId] = useState(null);
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [landMark, setLandMark] = useState("");
  const [
    companyLocationFormValidation,
    setCompanyLocationFormValidation,
  ] = useState({});
  const callValidation = useRef(false);

  // Functions.
  useEffect(() => {
    if (props.selectedCompany) {
      const {
        officeLocationId,
        address,
        phoneNo,
        pin,
        landMark,
      } = props.selectedCompany;
      setOfficeLocationId(officeLocationId);
      setAddress(address);
      setPhoneNo(phoneNo);
      setPin(pin);
      setLandMark(landMark);
    } else {
      setAddress("");
      setPhoneNo("");
      setPin("");
      setLandMark("");
    }
  }, [props.selectedCompany]);

  // custom hook.
  const { formValidation, isFormValid } = useFormValidation(
    companyLocationFormValidation
  );

  useEffect(() => {
    callValidation.current && callBackAfterValidation();
  }, [formValidation]);

  const formValidationOnSubmit = () => {
    let formValidationList = {
      // key name should be same as the input field name.
      address: {
        required: true,
        isValid: true,
        value: address,
        errorMessage: "",
      },
      pin: {
        required: true,
        isValid: true,
        value: pin,
        errorMessage: "",
      },
    };
    setCompanyLocationFormValidation(formValidationList); //this set call the custom hook useFormValidation.
    callValidation.current = true;
  };
  const callBackAfterValidation = () => {
    if (isFormValid) {
      // if form valid.
      if (props.selectedCompany) {
        let formData = {
          officeLocationId,
          address,
          pin,
          phoneNo,
          landMark,
        };
        props.handleUpdateCompanyLocation(formData);
      } else {
        let formData = {
          address,
          pin,
          phoneNo,
          landMark,
        };
        props.handleAddCompanyLocation(formData);
      }
    }
  };

  return (
    <Container>
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">address</Label>
              <Input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              {
                // Object.keys(formValidation).length !== 0 &&
                !formValidation?.address?.isValid && (
                  <span className=" " style={{ color: "red" }}>
                    {formValidation?.address?.errorMessage}
                  </span>
                )
              }
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="providence">Phone No.</Label>
              <Input
                type="text"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={[phoneNo]}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={2}>
            <FormGroup>
              <Label for="Pin">Pin</Label>
              <Input
                type="text"
                onChange={(e) => setPin(e.target.value)}
                value={pin}
              />
              {
                // Object.keys(formValidation).length !== 0 &&
                !formValidation?.pin?.isValid && (
                  <span className=" " style={{ color: "red" }}>
                    {formValidation?.pin?.errorMessage}
                  </span>
                )
              }
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="landMark">Land Mark</Label>
              <Input
                type="text"
                onChange={(e) => setLandMark(e.target.value)}
                value={landMark}
              />
            </FormGroup>
          </Col>
          <Col md={4} className="companyLocation-submit">
            {/* <Button
              className="companyLocation-submit"
              onClick={handleSubmitForm}
            >
              {props.selectedCompany ? "Update" : "Add"}
            </Button> */}
            <Button
              color=""
              className="btn-admin-settings"
              // onClick={handleSubmitForm}
              onClick={formValidationOnSubmit}
            >
              {props.selectedCompany ? "Update" : "Add"}
            </Button>
            &nbsp;
            <Button
              color=""
              className="btn-cancel"
              onClick={props.toogleFromAddEdit}
            >
              cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FormFields;

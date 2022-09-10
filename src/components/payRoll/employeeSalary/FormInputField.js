import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const FormInputField = ({
  label,
  type,
  name,
  handleOnBlur,
  handleOnchange,
  disable,
  value,
}) => {
  return (
    <FormGroup>
      <Label for="exampletext">{label}</Label>
      <input
        className="form-control"
        type={type}
        name={name}
        onBlur={handleOnBlur !== undefined ? (e) => handleOnBlur(e) : null}
        onChange={
          handleOnchange !== undefined ? (e) => handleOnchange(e) : null
        }
        disabled={disable}
        value={value}
      />
    </FormGroup>
  );
};

export default FormInputField;

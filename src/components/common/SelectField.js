import React, { Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default function InputField(props) {
  return (
    <Fragment>
      <FormGroup>
        {props.label ? <Label>{props.label}</Label> : null}
        <Input
          type="select"
          name="roll"
          onChange={(e) => props.handleOnChange(e.target.value)}
        >
          {props.options.map((opt, i) => {
            return <option value={opt}>{opt}</option>;
          })}
        </Input>
      </FormGroup>
    </Fragment>
  );
}

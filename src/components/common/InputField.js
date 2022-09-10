import React, { Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default function InputField(props) {
  return (
    <Fragment>
      <FormGroup>
        {props.label ? <Label>{props.label}</Label> : ""}

        <Input
          type={props.type}
          placeholder="with a placeholder"
          onChange={(e) => props.handleOnChange(e.target.value)}
          //   onChange={(e) => props.onChange(e.target.value)}
        />
      </FormGroup>
    </Fragment>
  );
}

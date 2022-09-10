import React, { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Example = (props) => {
  return (
    <div>
      <FormGroup check>
        <Label check className="switch">
          <Input
            type="checkbox"
            className="toggleBtn"
            onChange={(e) => props.handleToggleBtnChange(e.target.checked)}
          />
          <span class="slider round"></span>
        </Label>
      </FormGroup>
    </div>
  );
};

export default Example;

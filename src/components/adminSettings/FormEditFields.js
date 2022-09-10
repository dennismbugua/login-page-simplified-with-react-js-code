import React, { Fragment } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const FormEditFields = (props) => {
  const { inputFields, formValidation } = props;
  return (
    <Form onSubmit={props.handleSubmit}>
      {inputFields !== undefined
        ? inputFields.map((val, i) => {
            return (
              <FormGroup key={i}>
                {/* {console.log(props.formData.val[val.name])} */}
                <Label>{val.label}</Label>
                {val.type === "text" || val.type === "number" ? (
                  <Input
                    type={val.type}
                    placeholder={val.placeholder}
                    onChange={(e) => {
                      val.handleOnChange(e.target.value);
                      props.handleOnchangeToSelectedData(
                        e.target.value,
                        val.name
                      );
                    }}
                    value={props.formData ? props.formData.val[val.name] : null}
                  />
                ) : null}
                {val.type === "file" ? (
                  <Input
                    type={val.type}
                    placeholder={val.placeholder}
                    onChange={(e) => {
                      val.handleOnChange(e.target.files[0]);
                      props.handleOnchangeToSelectedData(
                        e.target.files[0],
                        val.name
                      );
                    }}
                    // value={props.formData ? props.formData.val[val.name] : null}
                  />
                ) : null}
                {val.type === "select" ? (
                  <Fragment>
                    {console.log(props.formData.val.departmentId)}
                    <Input
                      type={val.type}
                      placeholder={val.placeholder}
                      onChange={(e) => {
                        val.handleOnChange(e.target.value);
                        props.handleOnchangeToSelectedData(
                          e.target.value,
                          val.name
                        );
                      }}
                    >
                      {val.option.map((el, i) => (
                        <option
                          key={i}
                          value={el[val.displayData["id"]]}
                          selected={
                            parseInt(el[val.displayData["id"]]) ===
                            parseInt(props.formData.val.departmentId)
                              ? true
                              : false
                          }
                        >
                          {el[val.displayData["selectedData"]]}
                        </option>
                      ))}
                    </Input>
                  </Fragment>
                ) : null}
                {Object.keys(formValidation)?.length !== 0 &&
                  !formValidation?.[val.name]?.isValid && (
                    <span className=" " style={{ color: "red" }}>
                      {formValidation?.[val.name]?.errorMessage}
                    </span>
                  )}
              </FormGroup>
            );
          })
        : null}
      <Button
        color=""
        className="btn-admin-settings"
        onClick={props.handleSubmit}
      >
        {props.button}
      </Button>{" "}
      &nbsp;
      <Button color="" className="btn-cancel" onClick={props.toggle}>
        cancel
      </Button>
    </Form>
  );
};

export default FormEditFields;

import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

const FormFields = (props) => {
  return (
    <Container>
      <Form className="" onSubmit={props.handleSubmit}>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="department">Department</Label>
              <Input
                type="text"
                name="department"
                placeholder="Enter the Department"
                onChange={(e) => props.handleOnchangeDepartment(e.target.value)}
                value={props.department ? props.department.department : ""}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="" className="btn-admin-settings ">
          {props.button}
        </Button>
        &nbsp;
        <Button
          color=""
          className="btn-cancel "
          onClick={props.handleToggleForm}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default FormFields;

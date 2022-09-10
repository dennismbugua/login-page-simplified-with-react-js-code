import React from "react";
import SelectBoxSearch from "../../common/SelectBoxSearch";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

const AddEdit = React.memo(({ fromComponent, empList, toggleAddEditForm }) => {
  return (
    <div className="" style={{ padding: "2rem 17rem" }}>
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input type="text" />
            </FormGroup>
            {fromComponent === "addition" && (
              <FormGroup>
                <Label for="exampleEmail">Category</Label>
                <Input type="select">
                  <option>Selecte Category</option>
                  <option>Monthly Renumeration</option>
                  <option>Additional Renumeration</option>
                </Input>
              </FormGroup>
            )}
            <div className="mb-2">
              <span className="d-inline-block">unit calculation</span>
              <Label check className="switch d-block">
                <Input
                  type="checkbox"
                  className="toggleBtn"
                  // onChange={(e) =>
                  //   props.handleToggleBtnChange(
                  //     Object.keys(moduleName),
                  //     e.target.checked
                  //   )
                  // }
                  // moduleName give as obj
                  // moduleName = {Employee: true}.
                  // Object.keys(moduleName) = Employee
                  // moduleName[Object.keys(moduleName)] = true.
                  // checked={moduleName[Object.keys(moduleName)]}
                />
                <span className="slider round"></span>
              </Label>
            </div>

            <FormGroup>
              <Label for="exampleEmail">Amount</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input
                  placeholder="Amount"
                  min={0}
                  max={100}
                  type="number"
                  step="1"
                />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <div className="d-flex">
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" /> No Assignee
                </Label>
              </FormGroup>
              <FormGroup check className="ml-3">
                <Label check>
                  <Input type="radio" name="radio1" /> All Employees
                </Label>
              </FormGroup>
              <FormGroup check className="ml-3">
                <Label check>
                  <Input type="radio" name="radio1" /> Select Employees
                </Label>
              </FormGroup>
            </div>
            <div className="  p-2">
              <SelectBoxSearch options={empList}></SelectBoxSearch>
            </div>
            <div className="text-center mt-3">
              <Button outline color="primary">
                Add
              </Button>
              <Button outline color="danger" onClick={toggleAddEditForm}>
                Cancel
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
});

export default AddEdit;

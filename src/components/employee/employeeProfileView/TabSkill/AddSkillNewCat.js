import React from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";

const AddSkillNewCat = ({
  skills,
  handleOnchangeNewSkill,
  handleOnchangeExpertLevel,
  handleAddNewSkill,
  toggleAddForm,
}) => {
  return (
    <div>
      {/* <Card className="flex-fill">
        <CardBody>
          <CardTitle>
            <h3>{whichCategorySkill}</h3>
          </CardTitle> */}

      <Form>
        <Row form>
          <Col md={8}>
            {/* <FormGroup>
              <Label for="exampleEmail">Skill</Label>
              <Input
                type="text"
                className="form-control"
                placeholder="Add Skill"
                onChange={(e) => handleInputChangeSkillName(e.target.value)}
              />
            </FormGroup> */}
            <FormGroup>
              <Label>Skill</Label>
              <Input
                type="select"
                name="select"
                onChange={(e) => handleOnchangeNewSkill(e.target.value)}
              >
                <option value="">select Skill</option>
                {skills.map((el) => (
                  <option value={el.skillId}>{el.skillName}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>Strength</Label>
              <Input
                type="select"
                name="select"
                onChange={(e) => handleOnchangeExpertLevel(e.target.value)}
              >
                <option value="">select Strength</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="10">9</option>
                <option value="10">10</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              color=""
              className="btn-admin-settings border border-primary border-right-0  w-50"
              onClick={handleAddNewSkill}
            >
              <i className="fas fa-check"></i>
            </Button>
            <Button
              color=""
              className=" btn-admin-settings border border-primary  w-50 "
              onClick={toggleAddForm}
            >
              <i className="fas fa-times"></i>
            </Button>
          </Col>
        </Row>
      </Form>
      {/* </CardBody>
      </Card> */}
    </div>
  );
};

export default AddSkillNewCat;

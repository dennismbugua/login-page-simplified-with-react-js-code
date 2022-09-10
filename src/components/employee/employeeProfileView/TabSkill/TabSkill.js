import React, { useState, useEffect, useRef } from "react";
import { Card, CardTitle, Row, Col, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  getEmpSkillById,
  addEmpSkill,
  delEmpSkillById,
} from "../../../../redux/actions/employee/employee.action";
import api from "../../../../apis/api";
import { AddBtnSkill, AddSkillNewCat } from "./";

const btnClr = ["primary", "success", "warning", "info", "danger"];
const skillCat = [
  "technologies",
  "Web Based Languages",
  "Desktop Based Languages",
  "Mobile App Languages",
  "Networking Technologies",
  "CRM",
  "Cloud Solutions",
  "SQL Database Languages",
  "NoSQL Database Languages",
  "Design Patterns",
  "Development Tools",
];

// CardAddSkill child component. ------------------------------------------
const CardAddSkill = ({ skillTitile, ...props }) => (
  <Card className="flex-fill">
    <CardBody>
      <CardTitle>
        <h3>{skillTitile}</h3>
      </CardTitle>
      {props.children}
    </CardBody>
  </Card>
);

// Parent Component. ------------------------------------------------------------------------

const TabSkill = React.memo(({ employeeId, ...props }) => {
  const { getEmpSkillById, addEmpSkill, delEmpSkillById } = props;
  const { empSkill } = props.selectEmp;

  const [whichCategorySkill, setWhichCategorySkill] = useState("");
  const [newSkillId, setNewSkillId] = useState("");
  const [expertLevel, setExpertLevel] = useState("");

  const [skills, setSkills] = useState([]);
  const [checkSkillCategory, setCheckSkillCategory] = useState([]);
  const [isOpenAddSkillCard, setIsOpenAddSkillCard] = useState(false);
  const inputEl = useRef(null);

  // Get employee skill's employee.
  useEffect(() => {
    getEmpSkillById(employeeId);
  }, []);

  // Get all the skill's for dorpdown.
  useEffect(() => {
    async function fetchSkills() {
      const allSkills = await api.skill().getAllSkills();
      setSkills(allSkills.data);
    }
    fetchSkills();
  }, []);

  useEffect(() => {
    let tempArr = [];
    empSkill.map((el) => tempArr.push(el.skillCategoryName));
    //keep already in skills to a state, for checking to show/no add card.
    setCheckSkillCategory(tempArr);
  }, [empSkill]);

  // Functions. --------------------------------------------------------------
  // Handle Popover Button, to show whether new skill category add or show add form in already in category.
  const handleClickAddBtn = React.useCallback(
    (whichSkill) => {
      console.log(whichSkill);
      console.log(checkSkillCategory);
      if (!checkSkillCategory.includes(whichSkill)) {
        setIsOpenAddSkillCard(true);
        inputEl.current.scrollIntoView({ behavior: "smooth" });
      } else {
        setIsOpenAddSkillCard(false);
      }
      setWhichCategorySkill(whichSkill);
    },
    [setWhichCategorySkill, checkSkillCategory, inputEl]
  );

  // close btn.
  const handleCloseAddFrom = React.useCallback(() => {
    setWhichCategorySkill("");
  }, []);

  // add new skill.-------------------------------------------------------
  const handleAddNewSkill = () => {
    console.log(newSkillId, whichCategorySkill);
    let formData = {
      employeeId: parseInt(employeeId),
      skillId: parseInt(newSkillId),
      expertLevel: parseInt(expertLevel),
      // lastUsed: new Date(),
      skillName: "string",
    };
    addEmpSkill(formData);
    // addSkill(newSkill, skillId, whichCategorySkill);
    setIsOpenAddSkillCard(false);
    handleCloseAddFrom();
  };

  // Close add form.------------------------------------------------
  const toggleAddForm = () => {
    setIsOpenAddSkillCard((prevState) => !prevState);
  };

  // Handle skill name change. ---------------------------------------------
  const handleOnchangeNewSkill = (skillId) => {
    setNewSkillId(skillId);
  };

  // Handle expert level change. ---------------------------------------------
  const handleOnchangeExpertLevel = (expertLevel) => {
    setExpertLevel(expertLevel);
  };

  // Handle to delete a skill, pass employee id to fetch after deleted data's.--------------
  const handleSkillDelete = (skillId) => {
    delEmpSkillById(skillId, employeeId);
  };

  return (
    <div className="skill-box ">
      {/* {empSkill.length > 0 ? ( */}
      <Row>
        {empSkill.map((empSkill, i) => (
          <Col key={i} md="6">
            {/* Already in skill categories. -------------------------------------------- */}
            <Card className="flex-fill">
              <CardBody>
                <CardTitle>
                  <h3>
                    {empSkill.skillCategoryName}
                    <span
                      href="#"
                      className="edit-icon"
                      onClick={() =>
                        handleClickAddBtn(empSkill.skillCategoryName)
                      }
                    >
                      <i className="fas fa-plus"></i>
                    </span>
                  </h3>
                </CardTitle>
                <ul className="personal-info">
                  <li>
                    {empSkill?.skillName?.map((skillName, i) => (
                      <Button key={i} color={btnClr[i]} className="mr-1 mb-1">
                        {skillName.skillName}
                        <i
                          className="fas fa-times ml-2"
                          onClick={() =>
                            handleSkillDelete(skillName.employeeSkillId)
                          }
                        ></i>
                      </Button>
                    ))}
                  </li>
                </ul>
                {/* Show add form of a corresponding skill category. */}
                {whichCategorySkill === empSkill.skillCategoryName ? (
                  <AddSkillNewCat
                    whichCategorySkill={whichCategorySkill}
                    // skillId={empSkill.skillId}
                    // skills={skills.filter((el) => el.skillCategoryId === 1)}
                    skills={skills}
                    handleOnchangeNewSkill={handleOnchangeNewSkill}
                    handleOnchangeExpertLevel={handleOnchangeExpertLevel}
                    handleAddNewSkill={handleAddNewSkill}
                    toggleAddForm={handleCloseAddFrom}
                  ></AddSkillNewCat>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        ))}
        {/* div for adding skill which is not alredy present in DOM -------------------- */}
        <Col md="6">
          {/* ref to scroll to down */}
          <div ref={inputEl}>
            {isOpenAddSkillCard && (
              <CardAddSkill skillTitile={whichCategorySkill}>
                <AddSkillNewCat
                  whichCategorySkill={whichCategorySkill}
                  // skillId={10}
                  skills={skills}
                  handleOnchangeNewSkill={handleOnchangeNewSkill}
                  handleOnchangeExpertLevel={handleOnchangeExpertLevel}
                  handleAddNewSkill={handleAddNewSkill}
                  toggleAddForm={toggleAddForm}
                ></AddSkillNewCat>
              </CardAddSkill>
            )}
          </div>
        </Col>
      </Row>
      {/* Add Skill button.------------------------------------------------- */}
      <AddBtnSkill
        skillCat={skillCat}
        handleClickAddBtn={handleClickAddBtn}
      ></AddBtnSkill>
    </div>
  );
});

const mapStateToProps = (state) => ({
  selectEmp: state.empReducer,
});

export default connect(mapStateToProps, {
  getEmpSkillById,
  addEmpSkill,
  delEmpSkillById,
})(TabSkill);

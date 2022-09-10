import React, { Fragment } from "react";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

const AddBtnSkill = ({ skillCat, handleClickAddBtn }) => {
  return (
    <Fragment>
      <UncontrolledPopover trigger="legacy" placement="top" target="addSkill">
        <PopoverHeader>Add Skill</PopoverHeader>
        <PopoverBody>
          <div className="skill-popover">
            {skillCat.map((el, i) => (
              <Button
                color="secondary"
                className="m-1"
                outline
                onClick={() => handleClickAddBtn(el.toLowerCase())}
              >
                {el}
              </Button>
            ))}
          </div>
        </PopoverBody>
      </UncontrolledPopover>
      <Button color="primary" id="addSkill" outline className="skill-add-btn">
        <i className="fa fa-plus"></i>
      </Button>
    </Fragment>
  );
};

export default AddBtnSkill;

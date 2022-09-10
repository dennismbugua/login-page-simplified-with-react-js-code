// <- ViewProject.js
import React, { useState, Fragment, useEffect } from "react";
import SelectBoxSearch from "../../common/SelectBoxSearch";

import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

const TeamProject = React.memo(({ team, empList }) => {
  const [members, setMembers] = useState([]);
  const [popoverOpenMember, setPopoverOpenMember] = useState(false);

  useEffect(() => {
    setMembers(team);
  }, [team]);

  // Functions. ---------
  const toggle = () => setPopoverOpenMember(!popoverOpenMember);

  // append member to array.
  const apendMember = React.useCallback(
    (member) => {
      let memberData = {
        employeeName: member.label,
        profilePicture: member.value.profilePicture,
      };
      setMembers((prevState) => prevState.concat(memberData));
    },
    [setMembers]
  );
  // delete the selected member.
  const delMemeber = React.useCallback(
    (index) => {
      const filteredMembers = members
        .slice(0, index)
        .concat(members.slice(index + 1, members.length));
      setMembers(filteredMembers);
    },

    [members]
  );

  console.log("TeamProject");

  return (
    <Fragment>
      <Card className="project-view-crad mb-4">
        <CardBody className="project-user">
          <CardTitle>
            <h4 className="project-title d-inline">
              {/* <a href={`/viewProject/${project.projectId}`}>
                    {project.projectName}
                  </a> */}
              Project Team
              <Button
                className="d-inline float-right"
                outline
                color="primary"
                size="sm"
                id="PopoverMember"
                type="button"
              >
                {!popoverOpenMember ? (
                  <i className="fas fa-plus"></i>
                ) : (
                  <i className="fas fa-times "></i>
                )}{" "}
              </Button>
            </h4>
          </CardTitle>
          <ul className="list-box ">
            {members.map((member, i) => (
              <li key={i}>
                {/* <a href="profile.html"> */}
                <div className="list-item">
                  <div className="list-left">
                    <h4 key={i} className="form-avatar">
                      <span className="avatar">
                        <img
                          alt=""
                          src={require(`../../../img/employee/${member.profilePicture}`)}
                        />
                        <div className="overlay">
                          <div className="text">
                            <i
                              className="fas fa-times user-del-icon"
                              onClick={() => delMemeber(i)}
                            ></i>
                          </div>
                        </div>
                      </span>
                    </h4>
                  </div>
                  <div className="list-body">
                    <span className="message-author">
                      {member.employeeName}
                    </span>
                    <div className="clearfix"></div>
                    <span className="message-content">Web Desinger</span>
                  </div>
                </div>
                {/* </a> */}
              </li>
            ))}
          </ul>
          <Popover
            placement="top"
            isOpen={popoverOpenMember}
            target="PopoverMember"
            toggle={toggle}
          >
            <PopoverHeader style={{ minWidth: "100px" }}>
              Add Members
            </PopoverHeader>
            <PopoverBody style={{ minWidth: "200px" }}>
              <SelectBoxSearch
                options={empList}
                onChange={apendMember}
              ></SelectBoxSearch>
            </PopoverBody>
          </Popover>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default TeamProject;

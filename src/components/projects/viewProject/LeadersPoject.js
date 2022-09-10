// <- ViewProject.js
import React, { useState, Fragment, useEffect } from "react";
import SelectBoxSearch from "../../common/SelectBoxSearch";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

const LeadersPoject = React.memo(({ leaders, empList }) => {
  console.log("LeaderProject");
  const [leadersArr, setLeadersArr] = useState([]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    setLeadersArr(leaders);
  }, [leaders]);

  const toggle = () => setPopoverOpen(!popoverOpen);

  // append leader to array.
  const apendLeader = React.useCallback(
    (leader) => {
      let leaderData = {
        managerId: leader.value.employeeId,
        managerName: leader.label,
        managerPicture: leader.value.profilePicture,
      };
      setLeadersArr(leaderData);
    },
    [setLeadersArr]
  );
  // delete the selected leader.
  const delLeader = React.useCallback(
    (index) => {
      const filteredLeaders = leadersArr
        .slice(0, index)
        .concat(leadersArr.slice(index + 1, leadersArr.length));
      setLeadersArr(filteredLeaders);
    },
    [leadersArr]
  );
  return (
    <Fragment>
      <Card className="project-view-crad mb-4 ">
        <CardBody className="project-user">
          <CardTitle>
            <h4 className="project-title d-inline ">Leaders</h4>
            <Button
              className="d-inline float-right "
              outline
              color="primary"
              size="sm"
              id="Popover1"
              type="button"
            >
              {!popoverOpen ? (
                <i className="fas fa-plus"></i>
              ) : (
                <i className="fas fa-times "></i>
              )}
            </Button>
          </CardTitle>
          {leadersArr.managerPicture !== undefined && (
            <ul className="list-box ">
              {/* {leadersArr.map((leader, i) => ( */}
              <li>
                {/* <a href="profile.html"> */}
                <div className="list-item">
                  <div className="list-left">
                    <h4 className="form-avatar">
                      <span className="avatar">
                        <img
                          alt=""
                          src={require(`../../../img/employee/${leadersArr.managerPicture}`)}
                        />
                        <div className="overlay">
                          <div className="text">
                            <i
                              className="fas fa-times user-del-icon"
                              onClick={() => delLeader(leadersArr.managerId)}
                            ></i>
                          </div>
                        </div>
                      </span>
                    </h4>
                  </div>
                  <div className="list-body">
                    <span className="message-author">
                      {leadersArr.managerName}
                    </span>
                    <div className="clearfix"></div>
                    <span className="message-content">Team Leader</span>
                  </div>
                </div>
                {/* </a> */}
              </li>
              {/* ))} */}
            </ul>
          )}

          <Popover
            placement="top"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={toggle}
          >
            <PopoverHeader style={{ minWidth: "100px" }}>
              Add Leaders
            </PopoverHeader>
            <PopoverBody>
              <Row style={{ minWidth: "200px" }}>
                <Col>
                  <SelectBoxSearch
                    options={empList}
                    onChange={apendLeader}
                  ></SelectBoxSearch>
                </Col>
              </Row>
            </PopoverBody>
          </Popover>
        </CardBody>
      </Card>
    </Fragment>
  );
});

export default LeadersPoject;

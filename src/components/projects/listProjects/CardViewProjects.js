import React, { Fragment } from "react";
import { Col, Card, CardBody, CardTitle, Progress } from "reactstrap";
import DropDownActions from "../../common/DropDownActions";

const CardViewProjects = React.memo((props) => {
  const { projectList, handleProjectEdit, handleDeleteProject } = props;
  return (
    <Fragment>
      {projectList.length > 0 &&
        projectList.map(
          (ListOfProjects, i) => (
            // ListOfProjects.projectList.map((project) => (
            <Col
              key={ListOfProjects.projectList[0].projectID}
              md={4}
              sm={6}
              xl={3}
            >
              <Card className="project-crad mb-4">
                <CardBody>
                  <CardTitle>
                    <h4 className="project-title">
                      <a
                        href={`/viewProject/${ListOfProjects.projectList[0].projectID}`}
                      >
                        {ListOfProjects.projectList[0].projectName}
                      </a>
                      <div className="dropDown-action">
                        <DropDownActions
                          selectedOpt={ListOfProjects.projectList[0].status}
                          dropDownOption={[
                            {
                              action: "Edit",
                              handleAction: () =>
                                handleProjectEdit(
                                  ListOfProjects.projectList[0]
                                ),
                            },
                            {
                              action: "Delete",
                              handleAction: () =>
                                handleDeleteProject(
                                  ListOfProjects.projectList[0].projectID
                                ),
                            },
                          ]}
                        ></DropDownActions>
                      </div>
                    </h4>
                  </CardTitle>
                  <small className="block text-ellipsis m-b-15">
                    <span className="text-xs">1</span>{" "}
                    <span className="text-muted">open tasks, </span>
                    <span className="text-xs">9</span>{" "}
                    <span className="text-muted">tasks completed</span>
                  </small>
                  <span className="text-muted mt-3 project-description">
                    {ListOfProjects.projectList[0].projectDescription.substring(
                      0,
                      180
                    ) + "..."}
                  </span>
                  <div className="mt-3">
                    <h4 className="project-title mb-1">Deadline :</h4>
                    <div className="text-muted">
                      {" "}
                      {ListOfProjects.projectList[0].endDate}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className="project-title">Project Leader :</h4>
                    <ul className="team-members">
                      {/* {project.projectLeaders.map((leader, i) => ( */}
                      <li>
                        <a
                          href="#null"
                          data-toggle="tooltip"
                          title={ListOfProjects.projectList[0]?.managerName}
                        >
                          <img
                            alt=""
                            src={require(`../../../img/employee/${
                              ListOfProjects.projectList[0]?.managerPicture ??
                              "user.png"
                            }`)}
                          />
                        </a>
                      </li>
                      {/* ))} */}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <h4 className="project-title">Team Members :</h4>
                    <ul className="team-members">
                      {ListOfProjects.projectList[0].projectMembersList.map(
                        (member, i) => (
                          <li key={i}>
                            <a
                              href="#null"
                              data-toggle="tooltip"
                              title="Jeffery Lalor"
                            >
                              <img
                                alt=""
                                src={require(`../../../img/employee/${member.profilePicture}`)}
                              />
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="mt-2 mb-1">
                    Progress
                    <span className="text-success float-right">40%</span>
                  </div>
                  <Progress value="40" style={{ height: "6px" }}></Progress>
                </CardBody>
              </Card>
            </Col>
          )
          // ))
        )}
    </Fragment>
  );
});

export default CardViewProjects;

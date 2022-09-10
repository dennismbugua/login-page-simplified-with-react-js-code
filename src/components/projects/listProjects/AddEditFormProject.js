import React, { useState, useEffect } from "react";
import SelectBoxSearch from "../../common/SelectBoxSearch";
import "react-datepicker/dist/react-datepicker.css";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
} from "reactstrap";

const AddEditFormProject = React.memo(
  ({
    selectedProject,
    empList,
    skillList,
    toogleFromProjectAddEditForm,
    handleAddProject,
    handleUpdateProject,
  }) => {
    const [projectName, setProjectName] = useState("");
    const [client, setClient] = useState("");
    const [domain, setDomain] = useState("");
    const [sourceCodePath, setSourceCodePath] = useState("");
    const [technologiesArr, setTechnologiesArr] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [estResourceCost, setEstResourceCost] = useState(0);
    const [projectBudget, setProjectBudget] = useState(0);
    const [managementCost, setManagementCost] = useState(0);
    const [estHrPerManDays, setEstHrPerManDays] = useState(0);
    const [status, setStatus] = useState("");
    const [uploadFiles, setUploadFiles] = useState("");
    const [projectCompletion, setProjectCompletion] = useState(0);

    const [leaders, setLeaders] = useState({});
    const [members, setMembers] = useState([]);
    const [projectDescp, setProjectDescp] = useState("");

    useEffect(() => {
      if (selectedProject) {
        setProjectName(selectedProject.projectName);
        setClient(selectedProject.clientName);
        setDomain(selectedProject.domain);
        setSourceCodePath(selectedProject.sourceCodePath);
        setTechnologiesArr(selectedProject?.projectTechnologyList);
        setStartDate(new Date(selectedProject.startDate));
        setEndDate(new Date(selectedProject.endDate));
        setEstResourceCost(selectedProject.estimatedCost);
        setProjectBudget(selectedProject.projectBudget);
        setManagementCost(selectedProject.managementCost);
        setEstHrPerManDays(selectedProject.estimatedHours);
        setStatus(selectedProject.activeStatus);
        setLeaders({
          leaderId: selectedProject.managerID,
          leaderName: selectedProject.manageName,
          leaderPicture: selectedProject.managerPicture,
        });
        setMembers(selectedProject.projectMembersList);
        setProjectDescp(selectedProject.projectDescription);
      } else {
        console.log("add");
      }
    }, [selectedProject]);

    // Function --------------
    // on change the technology select box.
    const handleOnchangeTechnology = React.useCallback((e) => {
      let skillName = e.target[e.target.selectedIndex].getAttribute(
        "data-skillName"
      );
      let skillId = parseInt(e.target.value);
      let skillCategoryId = parseInt(
        e.target[e.target.selectedIndex].getAttribute("data-skillCategoryId")
      );
      let technologyData = {
        skillName: skillName,
        skillId: skillId,
        isSelected: true,
        skillCategoryId: skillCategoryId,
      };
      setTechnologiesArr((prevState) => prevState.concat(technologyData));
      console.log(technologyData);
      // apendTechnology(technologyData);
    }, []);

    // delete the selected leader.
    const delTechnology = React.useCallback(
      (index) => {
        let delTechnologyArr = technologiesArr;
        let tempArr = delTechnologyArr.filter((el) => el.skillId !== index);
        setTechnologiesArr(tempArr);
      },
      [technologiesArr]
    );

    // append leader to array.
    const apendLeader = React.useCallback(
      (leader) => {
        let leaderData = {
          leaderId: leader.value.employeeId,
          leaderName: leader.label,
          leaderPicture: leader.value.profilePicture,
        };
        setLeaders(leaderData);

        // setLeaders((prevState) => prevState.concat(leaderData));
      },
      [setLeaders]
    );

    // append member to array.
    const apendMember = React.useCallback(
      (member) => {
        let memberData = {
          memberName: member.label,
          profilePicture: member.value.profilePicture,
          projectName: projectName,
          projectID: 0,
          employeeId: member.value.employeeId,
          roleID: 1,
        };
        setMembers((prevState) => prevState.concat(memberData));
      },
      [setMembers, projectName]
    );
    // delete the selected leader.
    const delLeader = React.useCallback((index) => {
      const filteredLeaders = {};
      setLeaders(filteredLeaders);
    }, []);
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

    const handleSubmitForm = (e) => {
      e.preventDefault();
      if (selectedProject) {
        let formData = {
          projectID: parseInt(selectedProject.projectID),
          projectName: projectName,
          projectType: "string",
          logoImage: "string",
          clientName: client,
          startDate: startDate,
          endDate: endDate,
          technology: "string",
          estimatedHours: parseInt(estHrPerManDays),
          domain: domain,
          managerID: leaders.leaderId,
          projectDescription: projectDescp,
          uploadFiles: "string",
          sourceCodePath: sourceCodePath,
          estimatedCost: parseInt(estResourceCost),
          projectBudget: parseInt(projectBudget),
          managementCost: parseInt(managementCost),
          projectStatus: 1,
          projectCompletion: parseInt(projectCompletion),
          createdBy: 0,
          createdOn: "2020-07-10T11:39:40.991Z",
          updatedBy: 0,
          updatedOn: "2020-07-10T11:39:40.991Z",
          activeStatus: true,
          skillName: "string",
          skillList: technologiesArr,
          projectMembersList: members,
        };
        console.log("in update");
        handleUpdateProject(formData);
      } else {
        let formData = {
          projectName: projectName,
          projectType: "string",
          logoImage: "string",
          clientName: client,
          startDate: startDate,
          endDate: endDate,
          technology: "string",
          estimatedHours: parseInt(estHrPerManDays),
          domain: domain,
          managerID: leaders.leaderId,
          projectDescription: projectDescp,
          uploadFiles: "string",
          sourceCodePath: sourceCodePath,
          estimatedCost: parseInt(estResourceCost),
          projectBudget: parseInt(projectBudget),
          managementCost: parseInt(managementCost),
          projectStatus: parseInt(status),
          projectCompletion: parseInt(projectCompletion),
          createdBy: 0,
          createdOn: "2020-07-10T11:39:40.991Z",
          updatedBy: 0,
          updatedOn: "2020-07-10T11:39:40.991Z",
          activeStatus: true,
          skillName: "string",
          // skillList: [
          //   {
          //     skillId: technology.skillId,
          //     skillName: "string",
          //     isSelected: true,
          //     skillCategoryId: technology.skillCategoryId,
          //   },
          //   {
          //     skillId: 7,
          //     skillName: "string",
          //     isSelected: true,
          //     skillCategoryId: 1,
          //   },
          // ],
          // projectMembersList: [
          //   {
          //     projectMemberID: 0,
          //     projectName: "string",
          //     projectID: 0,
          //     employeeId: 0,
          //     roleID: 0,
          //     assignedOn: "2020-07-14T09:13:03.720Z",
          //     assignedBy: 0,
          //   },
          // ],
          skillList: technologiesArr,
          projectMembersList: members,
        };
        handleAddProject(formData);
      }
      toogleFromProjectAddEditForm();
    };

    return (
      <Form className="project-form">
        <Row form>
          <Col md={6}>
            <FormGroup className="padding-r-20">
              <Label for="exampleEmail">Project Name</Label>
              <Input
                type="text"
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="padding-l-20">
              <Label>Client </Label>
              <Input
                type="text"
                onChange={(e) => setClient(e.target.value)}
                value={client}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup className="padding-r-20">
              <Label>Domain</Label>
              <Input
                type="text"
                onChange={(e) => setDomain(e.target.value)}
                value={domain}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="padding-l-20">
              <Label>Source Code Path</Label>
              <Input
                type="text"
                onChange={(e) => setSourceCodePath(e.target.value)}
                value={sourceCodePath}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={3} className="float-center">
            <FormGroup>
              <Label>Start Date</Label>
              <Input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
              {/* <DatePicker
                selected={startDate}
                onChange={handleChangeStartDate}
              /> */}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="padding-r-20">
              <Label>End Date</Label>
              <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label>Estimated Resource Cost</Label>
              <Input
                type="number"
                onChange={(e) => setEstResourceCost(e.target.value)}
                value={estResourceCost}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="padding-r-20">
              <Label>Project Budget </Label>
              <Input
                type="number"
                onChange={(e) => setProjectBudget(e.target.value)}
                value={projectBudget}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup className="padding-l-20">
              <Label>Management Cost </Label>
              <Input
                type="number"
                onChange={(e) => setManagementCost(e.target.value)}
                value={managementCost}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Estimate Hour/Man-days</Label>
              <Input
                type="number"
                onChange={(e) => setEstHrPerManDays(e.target.value)}
                value={estHrPerManDays}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={5} xs={10}>
            <FormGroup>
              <Label>Technology</Label>
              <Input
                type="select"
                // onChange={(e) => setTechnology(e.target.value)}
                onChange={(e) => handleOnchangeTechnology(e)}

                // value={technology}
              >
                <option value=""> selcte technologies</option>
                {skillList.map((el) => (
                  <option
                    key={el.skillId}
                    value={el.skillId}
                    data-skillCategoryId={el.skillCategoryId}
                    data-skillName={el.skillName}
                  >
                    {el.skillName}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col
            md={1}
            xs={2}
            className="mt-4  "
            style={{ paddingRight: "20px" }}
          ></Col>
          <Col md={6}>
            <FormGroup className="padding-l-20 ">
              <Label className="d-block">Technologies</Label>
              {/* <ul className="bg-dark "> */}
              {technologiesArr?.map((technology, i) => (
                // <li key={i} className="d-inline ml-2 ">
                <Button
                  key={technology.skillId}
                  type="button"
                  size="sm"
                  color="warning"
                  className="mt-2 ml-2 "
                >
                  <small> {technology.skillName}</small>
                  <i
                    className=" ml-2 fas fa-times"
                    onClick={() => delTechnology(technology.skillId)}
                  ></i>
                </Button>
                // </li>
              ))}
              {/* </ul> */}
            </FormGroup>{" "}
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup className="padding-r-20">
              <Label>Add Project Leader</Label>
              <SelectBoxSearch
                options={empList}
                onChange={apendLeader}
              ></SelectBoxSearch>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="padding-l-20">
              <Label className="d-block">Project Leader</Label>

              {/* {leaders.map((leader, i) => ( */}
              {leaders.leaderPicture ? (
                <h4 className="form-avatar">
                  <span className="avatar">
                    <img
                      alt=""
                      src={require(`../../../img/employee/${leaders?.leaderPicture}`)}
                    />
                    <div className="overlay">
                      <div className="text">
                        <i
                          className="fas fa-times user-del-icon"
                          onClick={() => delLeader(leaders.leaderId)}
                        ></i>
                      </div>
                    </div>
                  </span>
                </h4>
              ) : null}

              {/* ))} */}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup className="padding-r-20">
              <Label>Add Team Members</Label>
              <SelectBoxSearch
                options={empList}
                onChange={apendMember}
              ></SelectBoxSearch>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="padding-l-20">
              <Label className="d-block"> Team Members</Label>
              {members.map((member, i) => (
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
              ))}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label>Status</Label>
              <Input type="select" onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option
                  value="1"
                  selected={status === "new" ? "selected" : null}
                >
                  New
                </option>
                <option
                  value="2"
                  selected={status === "inProgress" ? "selected" : null}
                >
                  In Progress
                </option>
                <option
                  value="3"
                  selected={status === "completed" ? "selected" : null}
                >
                  Completed
                </option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup className="padding-r-20">
              <Label>Completed</Label>
              <Input
                type="number"
                onChange={(e) => setProjectCompletion(e.target.value)}
                value={projectCompletion}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="padding-l-20">
              <Label></Label>
              <Input
                type="file"
                name="file"
                onChange={(e) => setUploadFiles(e.target.files[0])}
              />
              <FormText color="muted">
                Upload usefull links, and docs about the Project.
              </FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label>Project Description</Label>
              <Input
                type="textarea"
                onChange={(e) => setProjectDescp(e.target.value)}
                value={projectDescp}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              // type="submit"
              color=""
              className="btn-admin-settings"
              onClick={handleSubmitForm}
            >
              {selectedProject ? "Update" : "Add"}
            </Button>
            &nbsp;
            <Button
              type="button"
              color=""
              className="btn-cancel"
              onClick={toogleFromProjectAddEditForm}
            >
              cancel
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
);

export default AddEditFormProject;

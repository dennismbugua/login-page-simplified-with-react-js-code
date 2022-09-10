// <- TaskManagment.js
import React, { useState, useEffect, Fragment } from "react";
import { Button, Input, Row, Col, Form } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEditTask = React.memo(
  ({
    handleClsAddEditTaskForm,
    handleAddUpdateTask,
    selectedTask,
    taskProjectInfo,
    addOrEdit,
  }) => {
    const [createdDate, setCreatedDate] = useState(new Date());
    const [taskTitle, setTaskTitle] = useState("");
    const [hourSpent, setHourSpent] = useState("");
    const [hourBillable, setHourBillable] = useState("");
    const [status, setStatus] = useState("new");
    const [description, setDescription] = useState("");

    useEffect(() => {
      if (addOrEdit === "edit") {
        setTaskTitle(selectedTask.taskTitle);
        setCreatedDate(new Date(selectedTask.createdDate));
        setHourSpent(selectedTask.hourSpent);
        setHourBillable(selectedTask.hourBillable);
        setStatus(selectedTask.status);
        setDescription(selectedTask.description);
      } else {
        setTaskTitle("");
        setCreatedDate(new Date());
        setHourSpent("");
        setHourBillable("");
        setStatus("new");
        setDescription(" ");
      }
    }, [selectedTask, addOrEdit]);

    // Functions.
    // handle change date in DOJ
    const handleChangeStartDate = (date) => {
      setCreatedDate(date);
    };

    // handle form submite.
    const handleSubmitForm = (e) => {
      e.preventDefault();
      let formDate = {
        empId: 29,
        empName: "waston",
        projectId: taskProjectInfo.projectId,
        projectName: taskProjectInfo.projectName,
        taskId:
          addOrEdit === "edit"
            ? selectedTask.taskId
            : Math.floor(Math.random() * 100) + 1,
        taskTitle: taskTitle,
        createdBy: "User",
        createdDate: `${
          createdDate.getMonth() + 1
        }-${createdDate.getDate()}-${createdDate.getFullYear()}`,
        hourSpent: hourSpent,
        hourBillable: hourBillable,
        status: status,
        description: description,
      };
      handleAddUpdateTask(formDate);
    };
    return (
      <Fragment>
        <Form>
          <div className="fixed-header">
            <div>
              <Button size="sm" outline className="secondary">
                <i className="fas fa-check"></i> Mark Completed
              </Button>
              <div className="d-inline float-right ">
                <Button color="" onClick={handleClsAddEditTaskForm}>
                  <i className="fas fa-times text-muted"></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="task-details">
            <div className="chat-wrap-inner">
              <div className="chats">
                <Input
                  type="text"
                  placeholder="Task Title"
                  onChange={(e) => setTaskTitle(e.target.value)}
                  value={taskTitle}
                />
                <div className="task-header">
                  <div className="assignee-info">
                    <div className="avatar">
                      <img
                        alt=""
                        src={require("../../../img/employee/avatar-01.jpg")}
                      />
                    </div>
                    <div className="assigned-info">
                      <div className="task-head-title">Assigned To</div>
                      <div className="task-assignee">John Doe</div>
                    </div>
                  </div>
                  <div className="task-due-date">
                    <div className="due-icon">
                      <span>
                        <i className="fas fa-calendar-alt text-muted"></i>
                      </span>
                    </div>
                    <div className="due-info">
                      <div className="task-head-title">Created</div>
                      <div className="due-date">
                        <DatePicker
                          selected={createdDate}
                          onChange={handleChangeStartDate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="task-data ">
                  <ul className="personal-info">
                    <li>
                      <div className="title">Hours Spent</div>
                      <div className="text">
                        <Input
                          type="text"
                          onChange={(e) => setHourSpent(e.target.value)}
                          value={hourSpent}
                        />
                      </div>
                    </li>
                    <li>
                      <div className="title">Hours Billable </div>
                      <div className="text text-left">
                        {" "}
                        <Input
                          type="text"
                          onChange={(e) => setHourBillable(e.target.value)}
                          value={hourBillable}
                        />
                      </div>
                    </li>
                    <li>
                      <div className="title status">Status </div>
                      <div className="text text-left">
                        {" "}
                        <Input
                          type="select"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option
                            value="new"
                            selected={status === "new" ? true : null}
                          >
                            New
                          </option>
                          <option
                            value="inProgress"
                            selected={status === "inProgress" ? true : null}
                          >
                            In progress
                          </option>
                          <option
                            value="completed"
                            selected={status === "completed" ? true : null}
                          >
                            Completed
                          </option>
                        </Input>
                      </div>
                    </li>
                  </ul>
                  <div className="p-2 ">
                    <span className="description-title">Description</span>
                    <span className="description w-100">
                      <Input
                        type="textarea"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </span>
                  </div>
                  <Row>
                    <Col className="text-center mt-2">
                      <Button
                        type="submit"
                        color=""
                        className="btn-admin-settings"
                        onClick={handleSubmitForm}
                      >
                        {/* {selectProject ? "Update" : "Add"} */}
                        {addOrEdit === "add" ? "Add" : "Update"}
                      </Button>
                      &nbsp;
                      <Button
                        color=""
                        className="btn-cancel"
                        onClick={handleClsAddEditTaskForm}
                      >
                        cancel
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Fragment>
    );
  }
);

export default AddEditTask;

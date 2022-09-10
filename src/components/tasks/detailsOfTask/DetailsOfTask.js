// <- TaskManagment.js
import React, { Fragment } from "react";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

const TaskAction = ({ employeeName, activity, date }) => (
  <div className="task-information ">
    <span className="task-info-line">
      <span className="task-user">{employeeName}</span>
      <span className=" ml-2 task-info-subject ">{activity}</span>
      <div className="task-time">{String(date).substr(0, 16)}</div>
    </span>
  </div>
);

// chat message body.
const ChatBody = ({ employeeName, employeePicture, message }) => (
  <Fragment>
    <div className="chat-body ">
      <div className="content">
        <div className="avatar">
          <img
            alt=""
            src={require(`../../../img/employee/${employeePicture}`)}
          />
        </div>
        <div className="message-body">
          <div className="chat-user">
            <span className="name">{employeeName}</span>
            <span className="ml-2 time text-muted">8:30 am</span>
          </div>
          <div className="chat-message text-muted">{message}</div>
        </div>
      </div>
    </div>
  </Fragment>
);

// Chat Footer.
const ChatFooter = () => (
  <div className="chat-footer">
    <div className="message-bar">
      <div className="message-inner">
        <a className="link attach-icon" href="#">
          <i className="fa fa-paperclip"></i>
        </a>
        <div className="">
          <InputGroup>
            <Input placeholder="" />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="fas fa-paper-plane"></i>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
    <div className="p-1">
      <span className="mr-1">Members</span>
      <div className="avatar">
        <img alt="" src={require("../../../img/employee/avatar-01.jpg")} />
      </div>
      <div className="avatar">
        <img alt="" src={require("../../../img/employee/avatar-02.jpg")} />
      </div>
    </div>
  </div>
);

const DetailsOfTask = React.memo(({ selectedTask, handleAddEditTaskForm }) => {
  return (
    <Fragment>
      <div className="fixed-header">
        <div>
          <Button size="sm" outline className="secondary">
            <i className="fas fa-check"></i> Mark Completed
          </Button>
          <div className="d-inline float-right ">
            <Button color="" onClick={() => handleAddEditTaskForm("edit")}>
              <i className="fas fa-edit text-muted"></i>
            </Button>
          </div>
        </div>
      </div>
      {selectedTask ? (
        <div className="task-details ">
          <div className="chat-wrap-inner">
            <div className="chats ">
              <h4>{selectedTask.taskTitle}</h4>
              <div className="task-header ">
                <div className="assignee-info  ">
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
                    <div className="due-date">{selectedTask.createdDate}</div>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="task-data ">
                <ul className="personal-info">
                  <li>
                    <div className="title">Hours Spent</div>
                    <div className="text">{selectedTask.hoursSpent} hr</div>
                  </li>
                  <li>
                    <div className="title">Hours Billable </div>
                    <div className="text ">{selectedTask.hoursBillable} hr</div>
                  </li>
                  <li>
                    <div className="title status">Status </div>
                    <div className="text">{selectedTask.status}</div>
                  </li>
                </ul>
                <div className="mb-1">
                  <span className="description-title ">Description</span>
                  <span className="description ">
                    {selectedTask.description}
                  </span>
                </div>
              </div>
              <hr></hr>
            </div>
            <div className="task-activity">
              <TaskAction
                employeeName={"Jerry Malikakal"}
                activity={"Created Task"}
                date={new Date()}
              ></TaskAction>
              <TaskAction
                employeeName={"Waston Don"}
                activity={"Assign to Jerry "}
                date={new Date()}
              ></TaskAction>

              <ChatBody
                employeeName={"Jerry Malikakal"}
                employeePicture={"avatar-06.png"}
                message={
                  "hello, please help to solve db inertion of image. got stuck with JPF and PNG file import."
                }
              ></ChatBody>
              <ChatBody
                employeeName={"Waston"}
                employeePicture={"avatar-01.jpg"}
                message={"hi jerry, please update yesterday status."}
              ></ChatBody>
            </div>
          </div>
          <ChatFooter></ChatFooter>
        </div>
      ) : (
        "No Task"
      )}
    </Fragment>
  );
});

export default DetailsOfTask;

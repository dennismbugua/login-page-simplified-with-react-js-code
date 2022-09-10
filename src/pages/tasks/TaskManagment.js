import React, { useState, useEffect, Fragment, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { connect } from "react-redux";
import Calendar from "../../components/common/Calendar";
import {
  DetailsOfTask,
  ListTask,
  AddEditTask,
  AllTaskCalender,
} from "../../components/tasks/index";
import {
  addTask,
  updateTask,
  delTask,
  getAllTaskOfEmployee,
} from "../../redux/actions/task/task.action";
import { Row, Col, Collapse, Button } from "reactstrap";

const TaskManagment = (props) => {
  const { delTask, addTask, updateTask, getAllTaskOfEmployee } = props;

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 604px)" });
  //   const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const { empTask, taskProjectInfo } = props.empTask;
  const [isOpenDetailsOfTask, setIsOpenDetailsOfTask] = useState(
    isTabletOrMobile ? false : true
  );
  const [taskList, setTaskList] = useState([]);
  const [isOpenAddEditForm, setIsOpenAddEditForm] = useState(false);
  const [isOpenListTask, setIsOpenListTask] = useState(true);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOpenAllTaskCalendar, setIsOpenAllTaskCalendar] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const addOrEdit = useRef("");

  // api calls.
  useEffect(() => {
    getAllTaskOfEmployee(31);
  }, []);

  useEffect(() => {
    console.log(empTask);

    let selectedTask = empTask.filter(
      (el) => el.projectID === taskProjectInfo.projectId
    );
    console.log(selectedTask[0]);
    // initial rendring select the 1st task.
    setSelectedTask(selectedTask[0]);
  }, [taskProjectInfo, empTask]);

  useEffect(() => {
    let taskList = empTask.filter(
      (el) => el.projectID === taskProjectInfo.projectId
    );
    setTaskList(taskList);
  }, [empTask, taskProjectInfo]);

  // handle selection of a task from ListTask.js
  const handleSelectedTask = React.useCallback(
    (taskData) => {
      // set the task id
      setSelectedTask(taskData);
      // if in mobile browser.
      return isTabletOrMobile
        ? (setIsOpenDetailsOfTask((prevstate) => !prevstate),
          setIsOpenListTask((prevstate) => !prevstate))
        : null;
    },
    [setSelectedTask, isTabletOrMobile]
  );

  // open add form.
  const handleAddEditTaskForm = React.useCallback(
    (whichAction) => {
      addOrEdit.current = whichAction;
      console.log(addOrEdit.current);

      setIsOpenAddEditForm((prevstate) => !prevstate);
      setIsOpenDetailsOfTask((prevstate) =>
        isTabletOrMobile ? false : !prevstate
      );
    },
    [setIsOpenAddEditForm, isTabletOrMobile]
  );

  // handle close form and open list from viewer in mobil.
  const handleClsAddEditTaskForm = React.useCallback(() => {
    handleAddEditTaskForm();
    isTabletOrMobile && setIsOpenListTask(true);
  }, [handleAddEditTaskForm, isTabletOrMobile]);

  // handle submite form ADD UPDATE.
  const handleAddUpdateTask = React.useCallback(
    (formData) => {
      console.log("handleAddUpdateTask");

      if (addOrEdit.current === "add") {
        addTask(formData);
      } else {
        updateTask(formData, formData.taskId);
      }
    },
    [addTask, updateTask]
  );

  // handle task delete from ListTask.js
  const handleDelTask = React.useCallback(
    (delId) => {
      delTask(delId);
    },
    [delTask]
  );

  // onchange the date in calendar , take the date and pass to reducer.
  const handleOnChangeTaskDate = React.useCallback(
    (date) => {
      let filterTaskListByDate = empTask.filter(
        (el) =>
          new Date(el.createdDate).getTime() === date.getTime() &&
          el.projectId === taskProjectInfo.projectId
      );
      console.log(filterTaskListByDate);
      setSelectedTask(filterTaskListByDate[0]);
      setTaskList(filterTaskListByDate);

      handleClsCalendar();
    },
    [taskList]
  );

  // handle click calender icon. ie: open calender, close detailsOfTask.
  const handleOpenCalendar = React.useCallback(() => {
    setIsOpenDetailsOfTask(false);
    setIsOpenAddEditForm(false);
    setIsOpenCalendar(true);
  }, []);

  const handleClsCalendar = React.useCallback(() => {
    setIsOpenCalendar(false);
    setIsOpenDetailsOfTask(true);
  }, []);

  // handle toggel AllTaskCalendar.
  const handleToggleAllTaskCalendar = React.useCallback(() => {
    setIsOpenAllTaskCalendar((prevstate) => !prevstate);
  }, [setIsOpenAllTaskCalendar]);

  return (
    <Row style={{ marginTop: "-20px" }}>
      {!isOpenAllTaskCalendar ? (
        <Fragment>
          <Col xs={12} sm={7} md={7} lg={7} className="pr-0 ">
            {/* list of all task in center */}
            <Collapse isOpen={isOpenListTask}>
              <ListTask
                handleAddEditTaskForm={handleAddEditTaskForm}
                handleSelectedTask={handleSelectedTask}
                handleDelTask={handleDelTask}
                handleOpenCalendar={handleOpenCalendar}
                handleToggleAllTaskCalendar={handleToggleAllTaskCalendar}
                empTask={taskList}
                taskProjectInfo={taskProjectInfo}
              ></ListTask>
            </Collapse>
          </Col>

          <Col xs={12} sm={5} md={5} lg={5} className="pl-0 task-chat-view ">
            <Fragment>
              {/* right section, details of a particular task. */}
              <Collapse isOpen={isOpenDetailsOfTask}>
                <DetailsOfTask
                  handleAddEditTaskForm={handleAddEditTaskForm}
                  selectedTask={selectedTask}
                ></DetailsOfTask>
              </Collapse>

              {/* add edit form */}
              <Collapse isOpen={isOpenAddEditForm}>
                <AddEditTask
                  handleEditTaskForm={handleAddEditTaskForm}
                  handleAddUpdateTask={handleAddUpdateTask}
                  handleClsAddEditTaskForm={handleClsAddEditTaskForm}
                  selectedTask={selectedTask}
                  taskProjectInfo={taskProjectInfo}
                  addOrEdit={addOrEdit.current}
                ></AddEditTask>
              </Collapse>

              {/* day selection calendar. */}
              <Collapse isOpen={isOpenCalendar}>
                <div className="fixed-header ">
                  <div>
                    <Button size="sm" color="" className="text-muted">
                      Calender
                    </Button>
                    <div className="d-inline float-right ">
                      <Button color="" onClick={handleClsCalendar}>
                        <i className="fas fa-times text-muted"></i>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="task-details ">
                  <Calendar
                    handleDateSelection={handleOnChangeTaskDate}
                  ></Calendar>
                </div>
              </Collapse>
            </Fragment>
          </Col>
        </Fragment>
      ) : (
        <Col sm={12}>
          <AllTaskCalender
            handleToggleAllTaskCalendar={handleToggleAllTaskCalendar}
          ></AllTaskCalender>
        </Col>
      )}

      {/* Task Calender that shows all the tasks of that employee. */}
    </Row>
  );
};

const mapStateToProps = (state) => ({
  empTask: state.taskReducer,
});

export default connect(mapStateToProps, {
  addTask,
  updateTask,
  delTask,
  getAllTaskOfEmployee,
})(TaskManagment);

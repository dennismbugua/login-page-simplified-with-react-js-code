import React, { useState, useEffect, Fragment } from "react";
// import { connect } from "react-redux";
// import { getAllTaskOfProject } from "../../redux/actions/task/task.action";
import { TopRowTaskBoard, Board } from "../../components/tasks";
import api from "../../apis/api";

const TaskBoard = (props) => {
  const [taskList, setTaskList] = useState([]);

  // Api call...
  useEffect(() => {
    let projectId = props.match.params.projectId;
    // getAllTaskOfProject(54);
    const fetchTaskApi = async () => {
      let response = await api.projectIssue().GetAllProjectIssueList();
      if (response.status === 200) {
        let allTask = response.data;
        let selectedProjectTask = allTask.filter(
          (el) => el.projectID === parseInt(projectId)
        );
        console.log(selectedProjectTask);

        setTaskList(selectedProjectTask);
      }
    };
    fetchTaskApi();
  }, []);

  return (
    <Fragment>
      <TopRowTaskBoard></TopRowTaskBoard>
      <Board tasksOfProject={taskList}></Board>
    </Fragment>
  );
};

// const mapStateToProps = (state) => ({
//   tasksOfProject: state.taskReducer,
// });

export default TaskBoard;

// export default connect(mapStateToProps, { getAllTaskOfProject })(TaskBoard);

import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_EMP_WORKING_PROJECTS,
  GET_EMP_WORKING_PROJECTS_SUCCESS,
  GET_EMP_TASK_SUCCESS,
  GET_EMP_TASK,
  GET_ALL_TASK_OF_PROJECT,
  GET_ALL_TASK_OF_PROJECT_SUCCESS,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  DEL_TASK,
  DEL_TASK_SUCCESS,
} from "../redux/actions/actionType";
import api from "../apis/api";
import { tasks } from "../datas/tasks";
import { projectsList } from "../datas/projects";

// Api Functions.
function* getEmployeeWorkingProjectsApi(employeeId) {
  // api call all task .
  // api call all projects of corresponding employee.
  const empWorkingProjects = yield api
    .project()
    .getProjectsOfEmployee(employeeId);

  let empTask = tasks.filter((el) => el.employeeId === employeeId);
  let projectNames = [];

  return { empTask, projectNames, empWorkingProjects: empWorkingProjects.data };
}

function* getEmployeeTaskApi(employeeId) {
  // api call.
  let projectIssueList = yield api.projectIssue().GetAllProjectIssueList();
  // console.log(projectIssueList.data);

  let response = yield api.task().getAllTaskOfEmployee(employeeId);
  // return projectIssueList.data;

  return response.data;
}

function getAllTaskOfProjectsApi(projectId) {
  let projectTaskList = tasks.filter((el) => el.projectId === projectId);

  return { projectTaskList };
}
function addTaskApi(formData, taskProjectId) {
  // api call to add task.
}

function updateTaskApi(formData, taskProjectId) {
  // api call to update task.
}

function delTaskApi(delId) {
  //api call
}

// --------------------------------------------------------------------------------------
// get all the task of a particular employee.
export function* handleGetEmployeeWorkingProjects(empId) {
  try {
    const { empTask, projectNames, empWorkingProjects } = yield call(
      getEmployeeWorkingProjectsApi,
      empId.payload
    );
    yield put({
      type: GET_EMP_WORKING_PROJECTS_SUCCESS,
      payload: { empTask, projectNames, empWorkingProjects },
    });
  } catch (error) {
    console.log(error);
  }
}
// get all tasks of a particular project.
export function* handleGetAllTaskOfProject({ payload }) {
  try {
    const projectId = payload;

    const { projectTaskList } = yield call(getAllTaskOfProjectsApi, projectId);

    yield put({
      type: GET_ALL_TASK_OF_PROJECT_SUCCESS,
      payload: projectTaskList,
    });
  } catch (error) {
    console.log(error);
  }
}

// add task
export function* handleAddTask({ payload }) {
  try {
    yield call(addTaskApi, payload.formData, payload.taskProjectId);
    yield put({
      type: ADD_TASK_SUCCESS,
      formData: payload.formData,
      taskProjectId: payload.taskProjectId,
    });
  } catch (error) {
    console.log(error);
  }
}

// update task
export function* handleUpdateTask({ payload }) {
  try {
    yield call(updateTaskApi, payload.formData, payload.taskId);
    yield put({
      type: UPDATE_TASK_SUCCESS,
      formData: payload.formData,
      taskId: payload.taskId,
    });
  } catch (error) {
    console.log(error);
  }
}

//  delete task.
export function* handleDelTask(delId) {
  try {
    yield call(delTaskApi, delId.payload);
    yield put({ type: DEL_TASK_SUCCESS, payload: delId.payload });
  } catch (error) {
    console.log(error);
  }
}

// handle to get all tasks of a particular employee.
export function* handleGetEmployeeTask({ payload }) {
  try {
    let employeeId = payload;
    let response = yield call(getEmployeeTaskApi, employeeId);
    yield put({ type: GET_EMP_TASK_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* taskWatchFun() {
  yield takeLatest(GET_EMP_WORKING_PROJECTS, handleGetEmployeeWorkingProjects);
  yield takeLatest(ADD_TASK, handleAddTask);
  yield takeLatest(UPDATE_TASK, handleUpdateTask);
  yield takeLatest(DEL_TASK, handleDelTask);
  yield takeLatest(GET_ALL_TASK_OF_PROJECT, handleGetAllTaskOfProject);

  yield takeLatest(GET_EMP_TASK, handleGetEmployeeTask);
}

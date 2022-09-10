import { call, put, takeLatest } from "redux-saga/effects";

import {
  GET_PROJECT_LIST,
  GET_PROJECT_LIST_SUCCES,
  GET_PROJECT_LIST_OF_EMPLOYEE,
  GET_PROJECT_LIST_OF_EMPLOYEE_SUCCESS,
  GET_SELECT_PROJECT,
  GET_SELECT_PROJECT_SUCCESS,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  DEL_PROJECT,
  DEL_PROJECT_SUCCESS,
} from "../redux/actions/actionType";
import { projectsList } from "../datas/projects"; //Dummy Data.
import api from "../apis/api";

// Api Functions.
function getProjectListApi() {
  // api call.
  return { projectsList };
}
function* getProjectListOfEmployeeApi(employeeId) {
  // api call.
  const response = yield api.project().getProjectsOfEmployee(employeeId);
  return response;
}

function getSelectProject(projectId) {
  // api call.
  let projectDate = projectsList.filter(
    (ele) => String(ele.projectId) === projectId
  );
  return { projectDate };
}

function addProject(formData) {
  const response = api.project().addProject(formData);
  return response.data;
}
function updateProjectApi(formData) {
  api.project().editProject(formData);
}
function delProjectApi(delId) {
  const res = api.project().delProject(delId);
  return res;
}

// get all the projects.
export function* handleGetProjectList() {
  try {
    const { projectsList } = yield call(getProjectListApi);

    yield put({ type: GET_PROJECT_LIST_SUCCES, payload: projectsList });
  } catch (error) {
    console.log(error);
  }
}

// to get the project list of corresponding employee.
export function* handleGetProjectListOfEmployee({ payload }) {
  try {
    let employeeId = payload;
    const response = yield call(getProjectListOfEmployeeApi, employeeId);
    yield put({
      type: GET_PROJECT_LIST_OF_EMPLOYEE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
}

// get the selected project deatils.
export function* handleGetSelectProject(projectId) {
  try {
    const { projectDate } = yield call(getSelectProject, projectId.payload);
    yield put({ type: GET_SELECT_PROJECT_SUCCESS, payload: projectDate });
  } catch (error) {
    console.log(error);
  }
}

// add project.
export function* handleAddProject({ payload }) {
  try {
    let formData = payload;
    const resAddProject = yield call(addProject, formData);
    yield put({ type: ADD_PROJECT_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}

// update project.
export function* handleUpdateProject({ payload }) {
  try {
    let formData = payload;

    const response = yield call(updateProjectApi, formData);
    yield put({ type: UPDATE_PROJECT_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}

// delete project.
export function* handleDelProject({ payload }) {
  try {
    let delId = payload;

    const response = yield call(delProjectApi, delId);
    yield put({ type: DEL_PROJECT_SUCCESS, payload: delId });
  } catch (error) {
    console.log(error);
  }
}

// watch function

export function* projectWatachFun() {
  yield takeLatest(GET_PROJECT_LIST, handleGetProjectList);
  yield takeLatest(
    GET_PROJECT_LIST_OF_EMPLOYEE,
    handleGetProjectListOfEmployee
  );
  yield takeLatest(GET_SELECT_PROJECT, handleGetSelectProject);
  yield takeLatest(ADD_PROJECT, handleAddProject);
  yield takeLatest(UPDATE_PROJECT, handleUpdateProject);
  yield takeLatest(DEL_PROJECT, handleDelProject);
}

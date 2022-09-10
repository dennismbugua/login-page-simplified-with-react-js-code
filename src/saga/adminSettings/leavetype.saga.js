import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_LEAVETYPES,
    ADD_LEAVETYPES,    
    UPDATE_LEAVETYPES,
    DELETE_LEAVETYPES,
    GET_LEAVETYPES_SUCCESS,
    ADD_LEAVETYPES_SUCCESS,
    UPDATE_LEAVETYPES_SUCCESS,
    DELETE_LEAVETYPES_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// api function.
function getLeavesApi()  {
  // api for get employeetype
 const response = api.dbLeaveTypes().GetLeaveTypes();
  return response;
}
function addLeavesApi(formData) {
  // api for add  employeetype.
  api.dbLeaveTypes().AddEditLeaveTypes(formData);
}
function updateLeavesApi(formData) {
  // api for update  employeetype.
  api.dbLeaveTypes().AddEditLeaveTypes(formData);
}
function deleteLeavesApi(delId) {
  // api for delete  employeetype.
  const response = api.dbLeaveTypes().DeleteLeaveTypes(delId);
  return response;
}

export function* handleGetLeaves() {
  try {
    const response = yield call(getLeavesApi);
    yield put({ type: GET_LEAVETYPES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
export function* handleAddLeaves({ payload }) {
  try {
    yield call(addLeavesApi, payload);
    yield put({ type: ADD_LEAVETYPES_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
export function* handleUpdateLeaves({ payload }) {
  try {
    let formData = payload;
    yield call(updateLeavesApi, formData);
    yield put({ type: UPDATE_LEAVETYPES_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
export function* handleDeleteLeaves({ payload }) {
  try {
    yield call(deleteLeavesApi, payload);
    yield put({ type: DELETE_LEAVETYPES_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

// watach function.
export function* leavetypeWatchFun() {
  yield takeLatest(GET_LEAVETYPES, handleGetLeaves);
  yield takeLatest(ADD_LEAVETYPES, handleAddLeaves);
  yield takeLatest(UPDATE_LEAVETYPES, handleUpdateLeaves);
  yield takeLatest(DELETE_LEAVETYPES, handleDeleteLeaves);
}
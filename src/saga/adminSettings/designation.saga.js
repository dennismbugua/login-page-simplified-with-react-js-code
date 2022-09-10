import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_DESIGNATION,
  GET_DESIGNATION_SUCCESS,
  ADD_DESIGINATION_SUCCESS,
  ADD_DESIGINATION,
  UPDATE_DESIGNATION,
  UPDATE_DESIGNATION_SUCCESS,
  DEL_DESIGNATION,
  DEL_DESIGNATION_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// api function.
function* getDesignationApi() {
  // api for get designations
  const response =  yield api.dbDesignation().GetAllDesignations();
  return response;
}

function addDesignation(formData) {
  // api for add designation.
  api.dbDesignation().AddEditDesignation(formData);
}
function updateDesignationApi(formData) {
  // api for update designation.
  api.dbDesignation().AddEditDesignation(formData);
}
function delDesignationApi(delId) {
  // api for delete designation
  const response = api.dbDesignation().DeleteDesignation(delId);
  return response;
}

// get designation list.
export function* handleGetDesignation() {
  try {
    const designationData = yield call(getDesignationApi);
    yield put({ type: GET_DESIGNATION_SUCCESS, payload: designationData.data });
  } catch (error) {
    console.log(error);
  }
}
export function* handleAddDesignation({ payload }) {
  try {
    yield call(addDesignation, payload);
    console.log(payload);
    yield put({ type: ADD_DESIGINATION_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
export function* handleUpdateDesignation({ payload }) {
  try {
    yield call(updateDesignationApi, payload);
    yield put({ type: UPDATE_DESIGNATION_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
export function* handleDelDesigantion({ payload }) {
  try {
    yield call(delDesignationApi, payload);
    yield put({ type: DEL_DESIGNATION_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* designationWatchFun() {
  yield takeLatest(GET_DESIGNATION, handleGetDesignation);
  yield takeLatest(ADD_DESIGINATION, handleAddDesignation);
  yield takeLatest(UPDATE_DESIGNATION, handleUpdateDesignation);
  yield takeLatest(DEL_DESIGNATION, handleDelDesigantion);
}

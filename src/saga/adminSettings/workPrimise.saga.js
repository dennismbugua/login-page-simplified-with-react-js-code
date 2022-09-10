import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import api from "../../apis/api";
import {
  GET_WORKPRIMISE,
  GET_WORKPRIMISE_SUCCESS,
  ADD_WORKPRIMISE,
  ADD_WORKPRIMISE_SUCCESS,
  UPDATE_WORKPRIMISE,
  UPDATE_WORKPRIMISE_SUCCESS,
  DEL_WORKPRIMISE,
  DEL_WORKPRIMISE_SUCCESS,
} from "../../redux/actions/actionType";

// Api function.
function* getWorkPrimiseApi() {
  let tempArr = [];
  const response = yield api.workPrimise().getAll();
  for (let i = 0; i < response.data.length; i++) {
    const { data } = response;
    tempArr.push({
      workPremise: data[i].workingPremiseType,
      id: data[i].workingPremiseId,
      description: data[i].description,
    });
  }
  // return tempArr;
  return response;
}
function* addEditWorkPrimise(formData) {
  const response = yield api.workPrimise().addEdit(formData);
  console.log(response.data);
}
function delWorkPrimise(delId) {
  api.workPrimise().del(delId);
}

// handle get all work primises.
export function* handleGetWorkPrimise() {
  try {
    const response = yield call(getWorkPrimiseApi);
    yield put({ type: GET_WORKPRIMISE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
// handle add work primise.
export function* handleAddWorkPrimise({ payload }) {
  try {
    let formData = payload;
    const respone = yield call(addEditWorkPrimise, formData);
    yield put({ type: ADD_WORKPRIMISE_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
// handle update work primise.
export function* handleUpdateWorkPrimise({ payload }) {
  try {
    let formData = payload;
    const respone = yield call(addEditWorkPrimise, formData);
    yield put({ type: UPDATE_WORKPRIMISE_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
// handle work primise.
export function* handleDelWorkPrimise({ payload }) {
  try {
    let delId = payload;
    yield call(delWorkPrimise, delId);
    yield put({ type: DEL_WORKPRIMISE_SUCCESS, payload: delId });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* workPrimiseWatchFunc() {
  yield takeLatest(GET_WORKPRIMISE, handleGetWorkPrimise);
  yield takeLatest(ADD_WORKPRIMISE, handleAddWorkPrimise);
  yield takeLatest(UPDATE_WORKPRIMISE, handleUpdateWorkPrimise);
  yield takeLatest(DEL_WORKPRIMISE, handleDelWorkPrimise);
}

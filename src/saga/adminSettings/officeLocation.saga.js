import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_OFFICELOCATION,
  GET_OFFICELOCATION_SUCCESS,
  ADD_OFFICELOCATION,
  ADD_OFFICELOCATION_SUCCESS,
  DEL_OFFICELOCATION,
  UPDATE_OFFICELOCATION,
  DEL_OFFICELOCATION_SUCCESS,
  UPDATE_OFFICELOCATION_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// Api Functions.
function* getOfficeLocationApi() {
  let tempArr = [];
  const response = yield api.officeLocation().getAllOfficeLocation();

  for (let i = 0; i < response.data.length; i++) {
    const { data } = response;

    tempArr.push({
      officeLocationId: data[i].officeLocationId,
      address: data[i].address,
      phoneNo: data[i].phoneNo,
      pin: data[i].pin,
      landMark: data[i].landMark,
    });
  }
  return tempArr;
}
//  add office location api.
function addOfficeLocationApi(formData) {
  api.officeLocation().addEditOfficeLocation(formData);
}
// update office location api.
function updateUpdateApi(formData) {
  api.officeLocation().addEditOfficeLocation(formData);
}
// delete office location api.
function delOfficeLocationApi(delId) {
  api.officeLocation().delOfficeLocation(delId);
}

// handle get all office location.
export function* handleGetOfficeLocation() {
  try {
    const response = yield call(getOfficeLocationApi);
    yield put({ type: GET_OFFICELOCATION_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}
// handle add office location.
export function* handleAddOfficeLocation({ payload }) {
  try {
    // console.log(payload);
    yield call(addOfficeLocationApi, payload);
    yield put({ type: ADD_OFFICELOCATION_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
// handle update office location.
export function* handleUpdateOfficeLocation({ payload }) {
  try {
    let formData = payload;
    console.log(formData);
    yield call(updateUpdateApi, formData);
    yield put({ type: UPDATE_OFFICELOCATION_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}

// handle delete office location.
export function* handleDelOfficeLocation({ payload }) {
  try {
    let delId = payload;
    yield call(delOfficeLocationApi, delId);
    yield put({ type: DEL_OFFICELOCATION_SUCCESS, payload: delId });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* officeLocationWatchFun() {
  yield takeLatest(GET_OFFICELOCATION, handleGetOfficeLocation);
  yield takeLatest(ADD_OFFICELOCATION, handleAddOfficeLocation);
  yield takeLatest(UPDATE_OFFICELOCATION, handleUpdateOfficeLocation);
  yield takeLatest(DEL_OFFICELOCATION, handleDelOfficeLocation);
}

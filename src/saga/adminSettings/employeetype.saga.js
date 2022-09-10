import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_EMPLOYEETYPE_LIST,
    GET_EMPLOYEETYPES_BY_ID,
    ADD_EMPLOYEETYPE,
    UPDATE_EMPLOYEETYPE,
    DELETE_EMPLOYEETYPE,
    GET_EMPLOYEETYPE_LIST_SUCCESS,
    GET_EMPLOYEETYPES_BY_ID_SUCCESS,
    ADD_EMPLOYEETYPE_SUCCESS,
    UPDATE_EMPLOYEETYPE_SUCCESS,
    DELETE_EMPLOYEETYPE_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// api function.
function getEmployeeTypeListApi()  {
  // api for get employeetype
 const response = api.dbEmployeeTypes().GetEmployeeTypeList();
  return response;
}
function getEmployeeTypeByIdApi(empTypeId)  {
  // api for get employeetype by id
 const response = api.dbEmployeeTypes().GetEmployeeTypeById(empTypeId);
  return response;
}
function addEmployeeTypeApi(formData) {
  // api for add  employeetype.
  api.dbEmployeeTypes().AddEditEmployeeType(formData);
}
function updateEmployeeTypeApi(formData) {
  // api for update  employeetype.
  api.dbEmployeeTypes().AddEditEmployeeType(formData);
}
function deleteEmployeeTypeApi(delId) {
  // api for delete  employeetype.
  const response = api.dbEmployeeTypes().DeleteEmployeeType(delId);
  return response;
}

export function* handleGetEmployeeType() {
  try {
    const response = yield call(getEmployeeTypeListApi);
    yield put({ type: GET_EMPLOYEETYPE_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetEmployeeTypeById(payload) {
  try {
    yield call(getEmployeeTypeByIdApi, payload);
    yield put({ type: GET_EMPLOYEETYPES_BY_ID_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
export function* handleAddEmployeeType({ payload }) {
  try {
    yield call(addEmployeeTypeApi, payload);
    yield put({ type: ADD_EMPLOYEETYPE_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
export function* handleUpdateEmployeeType({ payload }) {
  try {
    let formData = payload;
    yield call(updateEmployeeTypeApi, formData);
    yield put({ type: UPDATE_EMPLOYEETYPE_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
export function* handleDeleteEmployeeType({ payload }) {
  try {
    yield call(deleteEmployeeTypeApi, payload);
    yield put({ type: DELETE_EMPLOYEETYPE_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

// watach function.
export function* employeetypeWatchFun() {
  yield takeLatest(GET_EMPLOYEETYPE_LIST, handleGetEmployeeType);
  yield takeLatest(GET_EMPLOYEETYPES_BY_ID, handleGetEmployeeType);
  yield takeLatest(ADD_EMPLOYEETYPE, handleAddEmployeeType);
  yield takeLatest(UPDATE_EMPLOYEETYPE, handleUpdateEmployeeType);
  yield takeLatest(DELETE_EMPLOYEETYPE, handleDeleteEmployeeType);
}
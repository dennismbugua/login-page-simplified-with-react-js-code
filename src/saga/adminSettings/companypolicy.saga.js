import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_COMPANY_PLOICIES,
    ADD_COMPANY_PLOICIES,
    UPDATE_COMPANY_PLOICIES,
    DELETE_COMPANY_PLOICIES,
    GET_COMPANY_PLOICIES_SUCCESS,
    ADD_COMPANY_PLOICIES_SUCCESS,
    UPDATE_COMPANY_PLOICIES_SUCCESS,
    DELETE_COMPANY_PLOICIES_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// api function.
function getCompanyPoliciesApi()  {
  // api for get employeetype
 const response = api.dbcompanypolicies().GetCompanyPoliciesList();
  return response;
}
function addCompanyPoliciesApi(formData) {
  // api for add  employeetype.
  api.dbcompanypolicies().AddEditCompanyPolicies(formData);
}
function updateCompanyPoliciesApi(formData) {
  // api for update  employeetype.
  api.dbcompanypolicies().AddEditCompanyPolicies(formData);
}
function delCompanyPoliciesApi(delId) {
  // api for delete  employeetype.
  const response = api.dbcompanypolicies().DeleteCompanyPolicies(delId);
  return response;
}

export function* handleGetCompanyPolicy() {
  try {
    const response = yield call(getCompanyPoliciesApi);
    yield put({ type: GET_COMPANY_PLOICIES_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
export function* handleAddCompanyPolicies({ payload }) {
  try {
    yield call(addCompanyPoliciesApi, payload);
    yield put({ type: ADD_COMPANY_PLOICIES_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
export function* handleUpdateComapanyPolicies({ payload }) {
  try {
    let formData = payload;
    yield call(updateCompanyPoliciesApi, formData);
    yield put({ type: UPDATE_COMPANY_PLOICIES_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
export function* handleDelCompanyPolicies({ payload }) {
  try {
    yield call(delCompanyPoliciesApi, payload);
    yield put({ type: DELETE_COMPANY_PLOICIES_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

// watach function.
export function* companypolicyWatchFun() {
  yield takeLatest(GET_COMPANY_PLOICIES, handleGetCompanyPolicy);
  yield takeLatest(ADD_COMPANY_PLOICIES, handleAddCompanyPolicies);
  yield takeLatest(UPDATE_COMPANY_PLOICIES, handleUpdateComapanyPolicies);
  yield takeLatest(DELETE_COMPANY_PLOICIES, handleDelCompanyPolicies);
}
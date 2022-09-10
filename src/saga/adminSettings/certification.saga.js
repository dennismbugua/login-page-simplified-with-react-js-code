import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_CERTIFICATIONS,
  GET_CERTIFICATIONS_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// Api  functions.

function getCertifications() {
  // Api call.
  const response = api.certifications().getAllCertifications();
  return response;
}

// Fandle function.
// get all certifications.
export function* handleGetCertifications() {
  try {
    const response = yield call(getCertifications);
    yield put({ type: GET_CERTIFICATIONS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

// Certifications watch function.
export function* certificationWatchFun() {
  yield takeLatest(GET_CERTIFICATIONS, handleGetCertifications);
}

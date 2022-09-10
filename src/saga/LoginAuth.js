import { takeLatest, call, put } from "redux-saga/effects";
import jwt_decode from "jwt-decode";
import {
  LOGIN_FAILD,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
} from "../redux/actions/actionType";
import api from "../apis/api";

// API call function.

function* loginUserApi(userName, password) {
  // api here.

  const token = yield api.account().login(userName, password);
  console.log(token);
  var decodedHeader = jwt_decode(token.data.token);

  const user = JSON.stringify(decodedHeader);
  localStorage.setItem("user", user);

  return { decodedHeader };
}

// handle login user.
export function* handleLoginUser({ payload }) {
  try {
    let { userName, password } = payload;
    const { decodedHeader } = yield call(loginUserApi, userName, password);
    yield put({ type: LOGIN_USER_SUCCESS, payload: decodedHeader });
  } catch (error) {
    yield put({ type: LOGIN_FAILD });

    console.log(error);
  }
}

// LoginAuth Watche function.
export function* loginAuthWatchFunc() {
  yield takeLatest(LOGIN_USER, handleLoginUser);
}

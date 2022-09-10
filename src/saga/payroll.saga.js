import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PAYROLL_ITEM,
  GET_PAYROLL_ITEM_SUCCESS,
} from "../redux/actions/actionType";
import { payRollItem } from "../datas/payroll";

// api calls.
function getPayRollItemApi() {
  // api call here.
  return payRollItem;
}

// to get all items in payroll.

export function* handleGetPayRollItem() {
  try {
    const response = yield call(getPayRollItemApi);
    yield put({ type: GET_PAYROLL_ITEM_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* payRollWatchFunc() {
  yield takeLatest(GET_PAYROLL_ITEM, handleGetPayRollItem);
}

import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PROCESS_REWARDS,
  GET_PROCESS_REWARDS_SUCCESS,
} from "../redux/actions/actionType";
import { toProcessRewards } from "../datas/adminSettings";

// api fucntion.
function getProcessRewardsApi() {
  // api call here.
  return { toProcessRewards };
}

export function* handleGetProcessRewards() {
  try {
    const { toProcessRewards } = yield call(getProcessRewardsApi);
    yield put({ type: GET_PROCESS_REWARDS_SUCCESS, payload: toProcessRewards });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* processRewardsWatchFun() {
  yield takeLatest(GET_PROCESS_REWARDS, handleGetProcessRewards);
}

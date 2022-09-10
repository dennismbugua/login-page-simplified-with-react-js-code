import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_REWARDS,
  ADD_REWARDS,
  UPDATE_REWARDS,
  DEL_REWADRDS,
  GET_REWARDS_SUCCESS,
  ADD_REWARDS_SUCCESS,
  UPDATE_REWARDS_SUCCESS,
  DEL_REWADRDS_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";
// Api function.
function* getRewardApi() {
  const response = yield api.rewards().getAll();
  console.log(response.data);
  return response;
}
function addEditRewardsApi(formData) {
  const response = api.rewards().addEdit(formData);
}
function delRewardApi(delId) {
  api.rewards().del(delId);
}

// handle get all reward list.
export function* handleGetRewards() {
  try {
    const response = yield call(getRewardApi);
    yield put({ type: GET_REWARDS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
// handle add rewards.
export function* handleAddRewards({ payload }) {
  try {
    let formData = payload;
    const response = yield call(addEditRewardsApi, formData);
    yield put({ type: ADD_REWARDS_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
// handle update rewards.
export function* handleUpdateRewards({ payload }) {
  try {
    let formData = payload;

    const response = yield call(addEditRewardsApi, formData);
    yield put({ type: UPDATE_REWARDS_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
// handle delete rewards.
export function* handleDelRewards({ payload }) {
  try {
    let delId = payload;
    console.log(delId);
    yield call(delRewardApi, delId);
    yield put({ type: DEL_REWADRDS_SUCCESS, payload: delId });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* rewardsWatchFunc() {
  yield takeLatest(GET_REWARDS, handleGetRewards);
  yield takeLatest(ADD_REWARDS, handleAddRewards);
  yield takeLatest(UPDATE_REWARDS, handleUpdateRewards);
  yield takeLatest(DEL_REWADRDS, handleDelRewards);
}

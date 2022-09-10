import { takeLatest, call, put } from "redux-saga/effects";
import { GET_SKILL, GET_SKILL_SUCCESS } from "../../redux/actions/actionType";
import api from "../../apis/api";

// api functions.
// get all skills.
function* getSkillApi() {
  const response = yield api.skill().getAllSkills();
  return response.data;
}

// get all skills.
export function* handleGetSkill() {
  try {
    const response = yield call(getSkillApi);
    yield put({ type: GET_SKILL_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

// skill watch fucntion.
export function* skillWatchFun() {
  yield takeLatest(GET_SKILL, handleGetSkill);
}

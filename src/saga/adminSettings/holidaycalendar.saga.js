import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_HOLIDAY_CALENDAR,
  ADD_HOLIDAY_CALENDAR,
  UPDATE_HOLIDAY_CALENDAR,
  DELETE_HOLIDAY_CALENDAR,
  GET_HOLIDAY_CALENDAR_SUCCESS,
  ADD_HOLIDAY_CALENDAR_SUCCESS,
  UPDATE_HOLIDAY_CALENDAR_SUCCESS,
  DELETE_HOLIDAY_CALENDAR_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// api function.
function getHolidayCalendarApi() {
  // api for get employeetype
  const response = api.dbcalendar().GetHolidayCalendarList();
  return response;
}
function addHolidayCalendarApi(formData) {
  // api for add  employeetype.
  api.dbcalendar().AddEditHolidayCalendar(formData);
}
function updateHolidayCalendarApi(formData) {
  // api for update  employeetype.
  api.dbcalendar().AddEditHolidayCalendar(formData);
}
function delHolidayCalendarApi(delId) {
  // api for delete  employeetype.
  const response = api.dbcalendar().DeleteHolidayCalendar(delId);
  return response;
}

export function* handleGetHolidayCalendar() {
  try {
    const response = yield call(getHolidayCalendarApi);
    console.log(response.data);
    yield put({ type: GET_HOLIDAY_CALENDAR_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
export function* handleAddHolidayCalendar({ payload }) {
  try {
    yield call(addHolidayCalendarApi, payload);
    yield put({ type: ADD_HOLIDAY_CALENDAR_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}
export function* handleUpdateHolidayCalendar({ payload }) {
  try {
    let formData = payload;
    yield call(updateHolidayCalendarApi, formData);
    yield put({ type: UPDATE_HOLIDAY_CALENDAR_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
export function* handleDelHolidayCalendar({ payload }) {
  try {
    yield call(delHolidayCalendarApi, payload);
    yield put({ type: DELETE_HOLIDAY_CALENDAR_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

// watach function.
export function* holidaycalendarWatchFun() {
  yield takeLatest(GET_HOLIDAY_CALENDAR, handleGetHolidayCalendar);
  yield takeLatest(ADD_HOLIDAY_CALENDAR, handleAddHolidayCalendar);
  yield takeLatest(UPDATE_HOLIDAY_CALENDAR, handleUpdateHolidayCalendar);
  yield takeLatest(DELETE_HOLIDAY_CALENDAR, handleDelHolidayCalendar);
}

import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../apis/api";
import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DEL_ITEM,
  GET_ITEMS_SUCCESS,
  ADD_ITEM_SUCCESS,
} from "../../redux/actions/actionType";

// APi functions.
function* getItemsApi() {
  const response = yield api.items().getAll();
  console.log(response.data);
  return response;
}
function addEditItem(itemFormData) {
  const response = api.items().addEdit(itemFormData);
}

export function* handleGetItems() {
  try {
    const response = yield call(getItemsApi);
    yield put({ type: GET_ITEMS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

// handle Add Items.
export function* handleAddItem({ payload }) {
  try {
    let itemFormData = payload;
    const response = yield call(addEditItem, itemFormData);
    yield put({ type: ADD_ITEM_SUCCESS, payload: itemFormData });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* itemsWatchFunc() {
  yield takeLatest(GET_ITEMS, handleGetItems);
  yield takeLatest(ADD_ITEM, handleAddItem);
  //   yield takeLatest(UPDATE_ITEM, handleUpdateItem);
  //   yield takeLatest(DEL_ITEM, handleDelItem);
}

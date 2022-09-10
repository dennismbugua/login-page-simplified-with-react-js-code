import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ASSET,
  GET_ASSET_SUCCESS,
  ADD_ASSET,
  ADD_ASSET_SUCCESS,
  UPDATE_ASSET,
  UPDATE_ASSET_SUCCESS,
  DEL_ASSET,
  DEL_ASSET_SUCCESS,
} from "../../redux/actions/actionType";
import api from "../../apis/api";

// Api functions.
function getAssetApi() {
  // api call here
  return api.asset().getAll();
}
function addAssetApi(formData) {
  return api.asset().addEdit(formData);
}
function delAssetApi(delId) {
  api.asset().del(delId);
}

// to get all asset list.
export function* handleGetAssets() {
  try {
    const response = yield call(getAssetApi);
    yield put({ type: GET_ASSET_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}
// to add asset.
export function* handleAddAsset({ payload }) {
  try {
    let formData = payload;
    const response = yield call(addAssetApi, formData);
    yield put({ type: ADD_ASSET_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
// to update asset.
export function* handleUpdateAsset({ payload }) {
  try {
    let formData = payload;
    yield call(addAssetApi, formData);
    yield put({ type: UPDATE_ASSET_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}

// to delete asset.
export function* handleDelAsset({ payload }) {
  try {
    let delId = payload;
    yield call(delAssetApi, delId);
    yield put({ type: DEL_ASSET_SUCCESS, payload: delId });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* assetWatchFun() {
  yield takeLatest(GET_ASSET, handleGetAssets);
  yield takeLatest(ADD_ASSET, handleAddAsset);
  yield takeLatest(UPDATE_ASSET, handleUpdateAsset);
  yield takeLatest(DEL_ASSET, handleDelAsset);
}

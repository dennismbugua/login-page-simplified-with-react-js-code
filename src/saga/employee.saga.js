import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_EMP_LIST,
  GET_EMP_LIST_SUCCESS,
  ADD_EMP,
  ADD_EMP_SUCCESS,
  GET_SELECT_EMP,
  GET_SELECT_EMP_SUCCESS,
  DEL_EMP_CERTIFICATE,
  DEL_EMP_CERTIFICATE_SUCCESS,
  ADD_EMP_SKILL,
  ADD_EMP_SKILL_SUCCESS,
  DEL_EMP,
  DEL_EMP_SUCCESS,
  UPDATE_EMP,
  UPDATE_EMP_SUCCESS,
  GET_EMP_EUCATIONAL_INFO,
  GET_EMP_EUCATIONAL_INFO_SUCCESS,
  ADD_EMP_EUCATIONAL_INFO,
  ADD_EMP_EUCATIONAL_INFO_SUCCESS,
  GET_EMP_QUALIFICATION,
  GET_EMP_QUALIFICATION_SUCCESS,
  UPDATE_EMP_EUCATIONAL_INFO,
  UPDATE_EMP_EUCATIONAL_INFO_SUCCESS,
  DELETE_EMP_EUCATIONAL_INFO,
  DELETE_EMP_EUCATIONAL_INFO_SUCCESS,
  GET_EMP_WORKEXPERIENCE,
  GET_EMP_WORKEXPERIENCE_SUCCESS,
  GET_EMP_PREVIOUS_COMPANY_DETAILS,
  GET_EMP_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  ADD_PREVIOUS_COMPANY_DETAILS,
  ADD_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  UPDATE_PREVIOUS_COMPANY_DETAILS,
  UPDATE_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  DELETE_PREVIOUS_COMPANY_DETAILS,
  DELETE_PREVIOUS_COMPANY_DETAILS_SUCCESS,
  GET_EMP_PREVIOUS_PROJECT_DETAILS,
  GET_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  ADD_EMP_PREVIOUS_PROJECT_DETAILS,
  ADD_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  UPDATE_EMP_PREVIOUS_PROJECT_DETAILS,
  UPDATE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  DELETE_EMP_PREVIOUS_PROJECT_DETAILS,
  DELETE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
  GET_EMP_CERTIFICATE,
  GET_EMP_CERTIFICATE_SUCCESS,
  UPDATE_EMP_CERTIFICATE,
  UPDATE_EMP_CERTIFICATE_SUCCESS,
  ADD_EMP_CERTIFICATE,
  ADD_EMP_CERTIFICATE_SUCCESS,
  GET_EMP_SKILL,
  GET_EMP_SKILL_SUCCESS,
  DEL_EMP_SKILL,
  DEL_EMP_SKILL_SUCCESS,
} from "../redux/actions/actionType";

import { empList, empCertificates, empSkills } from "../datas/employee";
import api from "../apis/api";
let empCertificate;
let profileInfo;
let empSkill;

// api functions
function* getEmpListApi() {
  let empArr = [];
  // made this structure to have seacrh in select box.
  const response = yield api.employee().getAll();
  response.data
    .filter((emp) => emp.isActive === true)
    .forEach((element) => {
      empArr.push({ value: element, label: element.employeeName });
    });
  console.log(empArr);
  return empArr;
  // return empList;
}
function* addEditEmpApi(formDate) {
  const res = yield api.employee().addEdit(formDate);
  console.log(res);
  return formDate;
}
function delEmpApi(delId) {
  api.employee().del(delId);
}
function* getSelectEmpApi(empId) {
  // console.log(empList);
  // profileInfo = empList.filter((emp) => String(emp.value.empId) === empId);
  // empCertificate = empCertificates.filter((emp) => String(emp.empId) === empId);
  // empSkill = empSkills.filter((emp) => String(emp.empId) === empId);

  const response = yield api.employee().getSelectedEmployee(empId);
  //  get the employee details in {value : "", lable : ""} formate.
  profileInfo = {
    value: response.data[0],
    label: response.data[0].employeeName,
  };
  return { profileInfo };
}

// ------------------------------ Certification --------------------------------------------------
function* getEmpCerticatesApi(empId) {
  // api call.
  const response = yield api.empCertificates().getEmpCertificates(empId);
  return response.data;
}

function addEditEmpCertificate(formData) {
  const response = api.empCertificates().addEditEmpCertification(formData);
  return response;
}

function delEmpCertificateApi(delId) {
  // api call.
  api.empCertificates().delEmpCertification(delId);
}

// -------------------------Employee Skill Api call's------------------------------------------------------

function* getEmpSkillApi(empId) {
  // Api call here,
  const response = yield api.empSkill().getEmpSkillById(empId);
  return response.data;
}

function* addEmpNewSkillApi(formData) {
  // api call here.
  yield api.empSkill().addEditEmpSkill(formData);
  // After adding to DB, then get all the data's.
  const resposne = yield getEmpSkillApi(formData.employeeId);
  return resposne;
}

function* delEmpSkillApi(incomingIds) {
  let skillId = incomingIds.empSkillId;
  let employeeId = incomingIds.empId;
  console.log(skillId);
  // api call here.
  yield api.empSkill().deleteEmpSkillById(skillId);
  // After deleting skill, then get all employee data's.
  const resposne = yield getEmpSkillApi(employeeId);
  return resposne;
}

function getEmpEducationalInfoApi(employeeId) {
  const response = api.dbempeducationalinfo().GetEmpEducationalInfo(employeeId);
  return response;
}

function addEmpEducationalInfoApi(formData) {
  // api for add  eduinfo.
  api.dbempeducationalinfo().AddEditEmpEducationalInfo(formData);
}

function updateEmpEducationalInfoApi(formData) {
  // api for update  eduinfo.
  api.dbempeducationalinfo().AddEditEmpEducationalInfo(formData);
}

function deleteEmpEducationalInfoApi(delId) {
  // api for delete  eduinfo.
  const response = api.dbempeducationalinfo().DeleteEmpEducationalInfo(delId);
  return response;
}

function getQualificationApi() {
  // api for get employeetype
  const response = api.dbqualification().GetQualifications();
  return response;
}

function getEmpPreviousComapnyInfoApi(employeeId) {
  const response = api
    .dbpreviouscompany()
    .GetEmpPreviousCompanyInfo(employeeId);
  return response;
}

function addEmpPreviousComapnyInfoApi(formData) {
  // api for add  eduinfo.
  api.dbpreviouscompany().AddEditPreviousCompanyInfo(formData);
}

function updateEmpPreviousComapnyInfoApi(formData) {
  // api for update  eduinfo.
  api.dbpreviouscompany().AddEditPreviousCompanyInfo(formData);
}

function deleteEmpPreviousComapnyInfoApi(delId) {
  // api for delete  eduinfo.
  const response = api.dbpreviouscompany().DeletePreviousCompanyInfo(delId);
  return response;
}

function getPreviousProjectApi(employeeId) {
  const response = api.dbworkexperience().GetPreviousProject(employeeId);
  return response;
}

function getPreviousProjectDetailsApi(workExperienceId) {
  const response = api
    .dbworkexperience()
    .GetPreviousProjectDetails(workExperienceId);
  return response;
}

function addEditPreviousProjectDetailsApi(formData) {
  // api for add previous project details
  api.dbworkexperience().AddEditPreviousProjectDetails(formData);
}

function updateEditPreviousProjectDetailsApi(formData) {
  // api for update  previous project details
  api.dbworkexperience().AddEditPreviousProjectDetails(formData);
}

function deletePreviousProjectDetailsApi(delId) {
  // api for delete  previous project details
  const response = api.dbworkexperience().DeletePreviousProject(delId);
  return response;
}

//================= Handle Function =========

// get the list of employee.
export function* handleGetEmpList() {
  try {
    const empList = yield call(getEmpListApi);
    yield put({ type: GET_EMP_LIST_SUCCESS, payload: empList }); // reducer call
  } catch (error) {
    console.log(error);
  }
}
// Add employee.
export function* handleAddEmp({ payload }) {
  try {
    let formDate = payload;
    const resAddEmp = yield call(addEditEmpApi, formDate);
    yield put({ type: ADD_EMP_SUCCESS, payload: resAddEmp });
  } catch (error) {
    console.log(error);
  }
}
// update employee
export function* handleUpdateEmp({ payload }) {
  try {
    let formData = payload;
    yield call(addEditEmpApi, formData);
    yield put({ type: UPDATE_EMP_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}
// delete employee.
export function* handleDelEmp({ payload }) {
  try {
    let delId = payload;
    yield call(delEmpApi, delId);
    yield put({ type: DEL_EMP_SUCCESS, payload: delId });
  } catch (error) {
    console.log(error);
  }
}
// get single employee.
export function* handleGetSelectEmp({ payload }) {
  try {
    let empId = payload;
    const { profileInfo } = yield call(getSelectEmpApi, empId);
    // return includes selected emp profileInfo, certificats, skill
    yield put({
      type: GET_SELECT_EMP_SUCCESS,
      profileInfo: profileInfo,
      empCertificate: [],
      empSkill: [],
    });
  } catch (error) {
    console.log(error);
  }
}

// ---------------------Certificates. ----------------------------------------------
// Get.
export function* handleEmpCertificate({ payload }) {
  try {
    let empId = payload;
    const response = yield call(getEmpCerticatesApi, empId);
    yield put({ type: GET_EMP_CERTIFICATE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}
// Create.
export function* handleAddEmpCertificate({ payload }) {
  try {
    let formData = payload;
    const response = yield call(addEditEmpCertificate, formData);
    yield put({ type: ADD_EMP_CERTIFICATE_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}

//Update.
export function* handleUpdateEmpCertificate({ payload }) {
  try {
    let formData = payload;
    const response = yield call(addEditEmpCertificate, formData);
    yield put({ type: UPDATE_EMP_CERTIFICATE_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

// delete a employee certificate.
export function* handleDelEmpCertificate({ payload }) {
  try {
    let delId = payload;
    console.log(delId);
    yield call(delEmpCertificateApi, delId);
    yield put({ type: DEL_EMP_CERTIFICATE_SUCCESS, payload: delId });
  } catch (error) {
    console.log(error);
  }
}

// ---------------------Employee skill--------------------------------------------------------

// Get employee skill list.
export function* handleGetEmpSkill({ payload }) {
  try {
    let empId = payload;
    const response = yield call(getEmpSkillApi, empId);
    yield put({ type: GET_EMP_SKILL_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}
// add a employee skill.
export function* handleAddEmpNewSkill({ payload }) {
  try {
    let formData = payload;
    const response = yield call(addEmpNewSkillApi, formData);
    yield put({
      type: ADD_EMP_SKILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}

// delete employee skill.
export function* handleDelEmpSkill({ payload }) {
  try {
    let incomingIds = payload;
    const response = yield call(delEmpSkillApi, incomingIds);
    yield put({ type: DEL_EMP_SKILL_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

// get employee educational info.
export function* handleGetEmpEducationalInfo(employeeId) {
  try {
    const empeduinfoList = yield call(
      getEmpEducationalInfoApi,
      employeeId.payload
    );
    yield put({
      type: GET_EMP_EUCATIONAL_INFO_SUCCESS,
      payload: empeduinfoList.data,
    }); // reducer call
  } catch (error) {
    console.log(error);
  }
}

// add employee educational info.
export function* handleAddEducationalInfo({ payload }) {
  try {
    yield call(addEmpEducationalInfoApi, payload);
    yield put({ type: ADD_EMP_EUCATIONAL_INFO_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

export function* handleEditEducationalInfo({ payload }) {
  try {
    let formData = payload;
    yield call(updateEmpEducationalInfoApi, formData);
    yield put({ type: UPDATE_EMP_EUCATIONAL_INFO_SUCCESS, payload: formData });
  } catch (error) {
    console.log(error);
  }
}

export function* handleDelEducationalInfo({ payload }) {
  try {
    yield call(deleteEmpEducationalInfoApi, payload);
    yield put({ type: DELETE_EMP_EUCATIONAL_INFO_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

//get qualification list
export function* handleGetQualification() {
  try {
    const response = yield call(getQualificationApi);
    yield put({ type: GET_EMP_QUALIFICATION_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

// get employee company details
export function* handleGetEmpPreviousCompanyInfo(employeeId) {
  try {
    const empworkexpList = yield call(
      getEmpPreviousComapnyInfoApi,
      employeeId.payload
    );
    yield put({
      type: GET_EMP_PREVIOUS_COMPANY_DETAILS_SUCCESS,
      payload: empworkexpList.data,
    }); // reducer call
  } catch (error) {
    console.log(error);
  }
}

// add employee previous company info.
export function* handleAddPreviousCompanyInfo({ payload }) {
  try {
    yield call(addEmpPreviousComapnyInfoApi, payload);
    yield put({ type: ADD_PREVIOUS_COMPANY_DETAILS_SUCCESS, payload: payload });
  } catch (error) {
    console.log(error);
  }
}

export function* handleEditPreviousComapnyInfo({ payload }) {
  try {
    let formData = payload;
    yield call(updateEmpPreviousComapnyInfoApi, formData);
    yield put({
      type: UPDATE_PREVIOUS_COMPANY_DETAILS_SUCCESS,
      payload: formData,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* handleDelPreviousComapnyInfo({ payload }) {
  try {
    yield call(deleteEmpPreviousComapnyInfoApi, payload);
    yield put({
      type: DELETE_PREVIOUS_COMPANY_DETAILS_SUCCESS,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
}

//get qualification list
export function* handleGetPreviousProject(employeeId) {
  try {
    const response = yield call(getPreviousProjectApi, employeeId.payload);
    yield put({ type: GET_EMP_WORKEXPERIENCE_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

//get Previous Project Details
export function* handleGetPreviousProjectDetails(workExperienceId) {
  try {
    const response = yield call(
      getPreviousProjectDetailsApi,
      workExperienceId.payload
    );
    yield put({
      type: GET_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
      payload: response.data[0],
    });
  } catch (error) {
    console.log(error);
  }
}

export function* handleAddPreviousProjectDetails({ payload }) {
  try {
    yield call(addEditPreviousProjectDetailsApi, payload);
    yield put({
      type: ADD_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* handleEditPreviousProjectDetails({ payload }) {
  try {
    let formData = payload;
    yield call(updateEditPreviousProjectDetailsApi, formData);
    yield put({
      type: UPDATE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
      payload: formData,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* handleDeletePreviousProjectDetails({ payload }) {
  try {
    yield call(deletePreviousProjectDetailsApi, payload);
    yield put({
      type: DELETE_EMP_PREVIOUS_PROJECT_DETAILS_SUCCESS,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
  }
}

// watch function.
export function* employeeWatchFun() {
  yield takeEvery(GET_EMP_LIST, handleGetEmpList);
  yield takeLatest(ADD_EMP, handleAddEmp);
  yield takeLatest(UPDATE_EMP, handleUpdateEmp);
  yield takeLatest(DEL_EMP, handleDelEmp);
  yield takeLatest(GET_SELECT_EMP, handleGetSelectEmp);
  // -------------------------Employee certification ------------------------------
  yield takeLatest(GET_EMP_CERTIFICATE, handleEmpCertificate);
  yield takeLatest(ADD_EMP_CERTIFICATE, handleAddEmpCertificate);
  yield takeLatest(UPDATE_EMP_CERTIFICATE, handleUpdateEmpCertificate);
  yield takeLatest(DEL_EMP_CERTIFICATE, handleDelEmpCertificate);

  // ------------------------- Employee skill ------------------------------
  yield takeLatest(GET_EMP_SKILL, handleGetEmpSkill);
  yield takeLatest(ADD_EMP_SKILL, handleAddEmpNewSkill);
  yield takeLatest(DEL_EMP_SKILL, handleDelEmpSkill);

  yield takeLatest(GET_EMP_EUCATIONAL_INFO, handleGetEmpEducationalInfo);
  yield takeLatest(ADD_EMP_EUCATIONAL_INFO, handleAddEducationalInfo);
  yield takeLatest(GET_EMP_QUALIFICATION, handleGetQualification);
  yield takeLatest(UPDATE_EMP_EUCATIONAL_INFO, handleEditEducationalInfo);
  yield takeLatest(DELETE_EMP_EUCATIONAL_INFO, handleDelEducationalInfo);
  yield takeLatest(
    GET_EMP_PREVIOUS_COMPANY_DETAILS,
    handleGetEmpPreviousCompanyInfo
  );
  yield takeLatest(ADD_PREVIOUS_COMPANY_DETAILS, handleAddPreviousCompanyInfo);
  yield takeLatest(
    UPDATE_PREVIOUS_COMPANY_DETAILS,
    handleEditPreviousComapnyInfo
  );
  yield takeLatest(
    DELETE_PREVIOUS_COMPANY_DETAILS,
    handleDelPreviousComapnyInfo
  );
  yield takeLatest(GET_EMP_WORKEXPERIENCE, handleGetPreviousProject);
  yield takeLatest(
    GET_EMP_PREVIOUS_PROJECT_DETAILS,
    handleGetPreviousProjectDetails
  );
  yield takeLatest(
    ADD_EMP_PREVIOUS_PROJECT_DETAILS,
    handleAddPreviousProjectDetails
  );
  yield takeLatest(
    UPDATE_EMP_PREVIOUS_PROJECT_DETAILS,
    handleEditPreviousProjectDetails
  );
  yield takeLatest(
    DELETE_EMP_PREVIOUS_PROJECT_DETAILS,
    handleDeletePreviousProjectDetails
  );
}

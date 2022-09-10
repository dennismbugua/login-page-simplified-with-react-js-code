import {
  GET_DESIGNATION,
  ADD_DESIGINATION,
  UPDATE_DESIGNATION,
  DEL_DESIGNATION,
  GET_DEPARTMENT,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  // ---------------
  GET_OFFICELOCATION,
  ADD_OFFICELOCATION,
  UPDATE_OFFICELOCATION,
  DEL_OFFICELOCATION,
  // ----------------
  GET_WORKPRIMISE,
  ADD_WORKPRIMISE,
  UPDATE_WORKPRIMISE,
  DEL_WORKPRIMISE,
  // ---------------
  GET_REWARDS,
  ADD_REWARDS,
  UPDATE_REWARDS,
  DEL_REWADRDS,
  // ---------------
  GET_ASSET,
  ADD_ASSET,
  UPDATE_ASSET,
  DEL_ASSET,
  //-----------------
  GET_EMPLOYEETYPE_LIST,
  GET_EMPLOYEETYPES_BY_ID,
  ADD_EMPLOYEETYPE,
  UPDATE_EMPLOYEETYPE,
  DELETE_EMPLOYEETYPE,
  // ---------------
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DEL_ITEM,
  //------------------
  GET_LEAVETYPES,
  ADD_LEAVETYPES,
  UPDATE_LEAVETYPES,
  DELETE_LEAVETYPES,
  //--------------
  GET_COMPANY_PLOICIES,
  ADD_COMPANY_PLOICIES,
  UPDATE_COMPANY_PLOICIES,
  DELETE_COMPANY_PLOICIES,
  //---------------------
  GET_HOLIDAY_CALENDAR,
  ADD_HOLIDAY_CALENDAR,
  UPDATE_HOLIDAY_CALENDAR,
  DELETE_HOLIDAY_CALENDAR,
  // -------------------------
  GET_SKILL,
  // --------------------------
  GET_CERTIFICATIONS,
} from "../actionType";
import { workPrimiseData } from "../../../datas/adminSettings";

// ------------Office Locaton.
export const getOfficeLocation = () => {
  return {
    type: GET_OFFICELOCATION,
  };
};
export const addOfficeLocation = (formData) => {
  return {
    type: ADD_OFFICELOCATION,
    payload: formData,
  };
};
export const updateOfficeLocation = (formData) => {
  return {
    type: UPDATE_OFFICELOCATION,
    payload: formData,
  };
};
export const delOfficeLoation = (delId) => {
  return {
    type: DEL_OFFICELOCATION,
    payload: delId,
  };
};

// --------------Designation.
export const getDesignation = () => {
  return {
    type: GET_DESIGNATION,
  };
};
export const addDesignation = (formData) => {
  return {
    type: ADD_DESIGINATION,
    payload: formData,
  };
};
export const updateDesignation = (formData) => {
  return {
    type: UPDATE_DESIGNATION,
    payload: formData,
  };
};
export const delDesignation = (delId) => {
  return {
    type: DEL_DESIGNATION,
    payload: delId,
  };
};

// --------------Department----------//
export const getDepartment = () => {
  return {
    type: GET_DEPARTMENT,
  };
};
export const addDepartment = (formData) => {
  return {
    type: ADD_DEPARTMENT,
    payload: formData,
  };
};
export const updateDepartment = (formData) => {
  return {
    type: UPDATE_DEPARTMENT,
    payload: formData,
  };
};

export const delDepartment = (delId) => {
  return {
    type: DELETE_DEPARTMENT,
    payload: delId,
  };
};

// ----------------Work Primise.
export const getWorkPrimise = () => {
  return {
    type: GET_WORKPRIMISE,
    // payload: workPrimiseData,
  };
};
export const addWorkPrimise = (formData) => {
  return {
    type: ADD_WORKPRIMISE,
    payload: formData,
  };
};
export const updateWorkPrimise = (formData) => {
  return {
    type: UPDATE_WORKPRIMISE,
    payload: formData,
  };
};
export const delWorkPrimise = (delId) => {
  return {
    type: DEL_WORKPRIMISE,
    payload: delId,
  };
};

// ----------------- Rwards.
export const getRewards = () => {
  return {
    type: GET_REWARDS,
  };
};
export const addRewards = (formData) => {
  return {
    type: ADD_REWARDS,
    payload: formData,
  };
};
export const updateRewards = (formData) => {
  return {
    type: UPDATE_REWARDS,
    payload: formData,
  };
};
export const delRewards = (delId) => {
  return {
    type: DEL_REWADRDS,
    payload: delId,
  };
};

// ----------------Asset.
export const getAllAsset = () => {
  return {
    type: GET_ASSET,
  };
};
export const addAsset = (formData) => {
  return {
    type: ADD_ASSET,
    payload: formData,
  };
};
export const updateAsset = (formDate) => {
  return {
    type: UPDATE_ASSET,
    payload: formDate,
  };
};
export const delAsset = (delId) => {
  return {
    type: DEL_ASSET,
    payload: delId,
  };
};

//-------------Employee Type----------//

export const getEmployeeTypeList = () => {
  return {
    type: GET_EMPLOYEETYPE_LIST,
  };
};

export const getEmployeeTypeById = () => {
  return {
    type: GET_EMPLOYEETYPES_BY_ID,
  };
};
export const addEmployeeType = (formData) => {
  return {
    type: ADD_EMPLOYEETYPE,
    payload: formData,
  };
};
export const updateEmployeeType = (formData) => {
  return {
    type: UPDATE_EMPLOYEETYPE,
    payload: formData,
  };
};

export const delEmployeeType = (delId) => {
  return {
    type: DELETE_EMPLOYEETYPE,
    payload: delId,
  };
};

// -------------- Item Action

export const getItemsList = () => {
  return {
    type: GET_ITEMS,
  };
};

export const addItem = (itemformData) => {
  return {
    type: ADD_ITEM,
    payload: itemformData,
  };
};

export const updateItems = (itemformData) => {
  return {
    type: UPDATE_ITEM,
    payload: itemformData,
  };
};

export const delItem = (delId) => {
  return {
    type: DEL_ITEM,
    payload: delId,
  };
};

//-------------Leave Types----------//
export const getLeaves = () => {
  return {
    type: GET_LEAVETYPES,
  };
};
export const addLeaves = (formData) => {
  return {
    type: ADD_LEAVETYPES,
    payload: formData,
  };
};
export const updateLeaves = (formData) => {
  return {
    type: UPDATE_LEAVETYPES,
    payload: formData,
  };
};

export const delLeaves = (delId) => {
  return {
    type: DELETE_LEAVETYPES,
    payload: delId,
  };
};

//------------Company Ploicies----------//
export const getCompanyPolicies = () => {
  return {
    type: GET_COMPANY_PLOICIES,
  };
};
export const addCompanyPolicies = (formData) => {
  return {
    type: ADD_COMPANY_PLOICIES,
    payload: formData,
  };
};
export const updateCompanyPolicies = (formData) => {
  return {
    type: UPDATE_COMPANY_PLOICIES,
    payload: formData,
  };
};

export const delCompanyPolicies = (delId) => {
  return {
    type: DELETE_COMPANY_PLOICIES,
    payload: delId,
  };
};

//------------Holiday Calendar----------//
export const getCalendar = () => {
  return {
    type: GET_HOLIDAY_CALENDAR,
  };
};
export const addCalendar = (formData) => {
  return {
    type: ADD_HOLIDAY_CALENDAR,
    payload: formData,
  };
};
export const updateCalendar = (formData) => {
  return {
    type: UPDATE_HOLIDAY_CALENDAR,
    payload: formData,
  };
};

export const delCalendar = (delId) => {
  return {
    type: DELETE_HOLIDAY_CALENDAR,
    payload: delId,
  };
};

// ---------------- Skill --------------- //
export const getSkill = () => {
  return {
    type: GET_SKILL,
  };
};

// --------------- Certification ----------- //
export const getAllCertifications = () => {
  return {
    type: GET_CERTIFICATIONS,
  };
};

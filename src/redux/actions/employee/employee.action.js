import {
  GET_EMP_LIST,
  ADD_EMP,
  GET_SELECT_EMP,
  // ------------------------- Certification --------------------------
  GET_EMP_CERTIFICATE,
  ADD_EMP_CERTIFICATE,
  UPDATE_EMP_CERTIFICATE,
  DEL_EMP_CERTIFICATE,
  // ------------------------Employee Skill's ----------------------------
  GET_EMP_SKILL,
  ADD_EMP_SKILL,
  DEL_EMP_SKILL,
  // ---------------------------------------------------------------------
  DEL_EMP,
  UPDATE_EMP,
  GET_EMP_EUCATIONAL_INFO,
  ADD_EMP_EUCATIONAL_INFO,
  GET_EMP_QUALIFICATION,
  UPDATE_EMP_EUCATIONAL_INFO,
  DELETE_EMP_EUCATIONAL_INFO,
  GET_EMP_PREVIOUS_COMPANY_DETAILS,
  ADD_PREVIOUS_COMPANY_DETAILS,
  UPDATE_PREVIOUS_COMPANY_DETAILS,
  DELETE_PREVIOUS_COMPANY_DETAILS,
  GET_EMP_WORKEXPERIENCE,
  GET_EMP_PREVIOUS_PROJECT_DETAILS,
  ADD_EMP_PREVIOUS_PROJECT_DETAILS,
  UPDATE_EMP_PREVIOUS_PROJECT_DETAILS,
  DELETE_EMP_PREVIOUS_PROJECT_DETAILS,
} from "../../actions/actionType";

// saga call.
export const getEmpList = () => {
  return {
    type: GET_EMP_LIST,
  };
};
export const addEmp = (empData) => {
  return {
    type: ADD_EMP,
    payload: empData,
  };
};
export const updateEmp = (empData) => {
  return {
    type: UPDATE_EMP,
    payload: empData,
  };
};
export const delEmp = (delId) => {
  return {
    type: DEL_EMP,
    payload: delId,
  };
};
export const getSelectedEmp = (empId) => {
  return {
    type: GET_SELECT_EMP,
    payload: empId,
  };
};
// -------------Employee Certification ----------
export const getEmpCertificates = (empId) => {
  return {
    type: GET_EMP_CERTIFICATE,
    payload: empId,
  };
};
export const addEmpCertificate = (formData) => {
  return {
    type: ADD_EMP_CERTIFICATE,
    payload: formData,
  };
};
export const updateEmpCertificate = (formData) => {
  return {
    type: UPDATE_EMP_CERTIFICATE,
    payload: formData,
  };
};
export const delEmpCertificate = (delId) => {
  return {
    type: DEL_EMP_CERTIFICATE,
    payload: delId,
  };
};

// --------------- EMP SKILL -------------
export const getEmpSkillById = (empId) => {
  return {
    type: GET_EMP_SKILL,
    payload: empId,
  };
};

export const addEmpSkill = (formData) => {
  return {
    type: ADD_EMP_SKILL,
    payload: formData,
  };
};

export const delEmpSkillById = (empSkillId, empId) => {
  return {
    type: DEL_EMP_SKILL,
    payload: { empSkillId, empId },
  };
};
// --------------- EMP Educational Info -------------
export const getEmpEducationalInfo = (employeeId) => {
  return {
    type: GET_EMP_EUCATIONAL_INFO,
    payload: employeeId,
  };
};
export const addEmpEducationalInfo = (formData) => {
  return {
    type: ADD_EMP_EUCATIONAL_INFO,
    payload: formData,
  };
};
export const updateEmpEducationalInfo = (formData) => {
  return {
    type: UPDATE_EMP_EUCATIONAL_INFO,
    payload: formData,
  };
};
export const delEmpEducationalInfo = (delId) => {
  return {
    type: DELETE_EMP_EUCATIONAL_INFO,
    payload: delId,
  };
};

//-------------Qualification------------
export const getQualification = () => {
  return {
    type: GET_EMP_QUALIFICATION,
  };
};

//-----------Previous Company Details--------
export const getEmpPreviousCompanyInfo = (employeeId) => {
  return {
    type: GET_EMP_PREVIOUS_COMPANY_DETAILS,
    payload: employeeId,
  };
};

export const addPreviousCompanyInfo = (formData) => {
  return {
    type: ADD_PREVIOUS_COMPANY_DETAILS,
    payload: formData,
  };
};

export const updatePreviousCompanyInfo = (formData) => {
  return {
    type: UPDATE_PREVIOUS_COMPANY_DETAILS,
    payload: formData,
  };
};
export const delPreviousCompanyInfo = (delId) => {
  return {
    type: DELETE_PREVIOUS_COMPANY_DETAILS,
    payload: delId,
  };
};

//-------------Work Experience------------
export const getWorkExperience = (employeeId) => {
  return {
    type: GET_EMP_WORKEXPERIENCE,
    payload: employeeId,
  };
};

//-------------Previous Project Details------------
export const getPreviousProjectList = (workExperienceId) => {
  return {
    type: GET_EMP_PREVIOUS_PROJECT_DETAILS,
    payload: workExperienceId,
  };
};
export const addPreviousProjectList = (formData) => {
  return {
    type: ADD_EMP_PREVIOUS_PROJECT_DETAILS,
    payload: formData,
  };
};
export const updatePreviousProjectList = (formData) => {
  return {
    type: UPDATE_EMP_PREVIOUS_PROJECT_DETAILS,
    payload: formData,
  };
};
export const deletePreviousProjectList = (formData) => {
  return {
    type: DELETE_EMP_PREVIOUS_PROJECT_DETAILS,
    payload: formData,
  };
};

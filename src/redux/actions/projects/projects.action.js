import {
  GET_PROJECT_LIST,
  GET_SELECT_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DEL_PROJECT,
  GET_PROJECT_LIST_OF_EMPLOYEE,
} from "../actionType";

// Saga Call.
export const getProjectList = () => {
  return {
    type: GET_PROJECT_LIST,
  };
};

export const getProjectsOfEmployee = (employeeId) => {
  return {
    type: GET_PROJECT_LIST_OF_EMPLOYEE,
    payload: employeeId,
  };
};

export const getSelectProject = (projectId) => {
  return {
    type: GET_SELECT_PROJECT,
    payload: projectId,
  };
};

export const addProject = (formData) => {
  return {
    type: ADD_PROJECT,
    payload: formData,
  };
};
export const editProject = (formData) => {
  return {
    type: UPDATE_PROJECT,
    payload: formData,
  };
};
export const delProject = (delId) => {
  return {
    type: DEL_PROJECT,
    payload: delId,
  };
};

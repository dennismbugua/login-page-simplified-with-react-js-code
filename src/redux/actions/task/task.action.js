import {
  GET_EMP_WORKING_PROJECTS,
  GET_EMP_TASK,
  GET_PROJECT_ID_TASK,
  ADD_TASK,
  UPDATE_TASK,
  DEL_TASK,
  ADD_PROJECT_FROM_TASK,
  GET_ALL_TASK_OF_PROJECT,
} from "../actionType";

// saga call.
export const getEmployeeWorkingProjects = (empId) => {
  return {
    type: GET_EMP_WORKING_PROJECTS,
    payload: empId,
  };
};

export const getAllTaskOfEmployee = (employeeId) => {
  return {
    type: GET_EMP_TASK,
    payload: employeeId,
  };
};

export const addTask = (formData) => {
  return {
    type: ADD_TASK,
    payload: { formData },
  };
};
export const updateTask = (formData, taskId) => {
  return {
    type: UPDATE_TASK,
    payload: { formData, taskId },
  };
};
export const delTask = (delId) => {
  return {
    type: DEL_TASK,
    payload: delId,
  };
};
export const getAllTaskOfProject = (projectId) => {
  return {
    type: GET_ALL_TASK_OF_PROJECT,
    payload: projectId,
  };
};

// reducer call. to keep the id of the project selected in TaskSideBar.
export const addProjectFromTask = (projectInfo) => {
  return {
    type: ADD_PROJECT_FROM_TASK,
    payload: projectInfo,
  };
};
export const getTaskProjectId = (projectId, projectName) => {
  return {
    type: GET_PROJECT_ID_TASK,
    payload: { projectId, projectName },
  };
};

import {
  GET_EMP_WORKING_PROJECTS_SUCCESS,
  GET_EMP_TASK_SUCCESS,
  GET_PROJECT_ID_TASK,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DEL_TASK_SUCCESS,
  ON_CHANGE_TASK_DATE,
  ADD_PROJECT_FROM_TASK,
  GET_ALL_TASK_OF_PROJECT_SUCCESS,
} from "../../actions/actionType";

const initialState = {
  fullTaskArr: [],
  empTask: [],
  taskProjectId: "",
  projectNames: [],
  tasksOfProject: [],
  taskProjectInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EMP_TASK_SUCCESS:
      return {
        ...state,

        empTask: action.payload,
      };
    case GET_EMP_WORKING_PROJECTS_SUCCESS:
      let empWorkingProjectList =
        action.payload.empWorkingProjects[0].projectList;
      return {
        ...state,
        projectList: empWorkingProjectList,
        taskProjectInfo: {
          projectId: empWorkingProjectList[0]?.projectID,
          projectName: empWorkingProjectList[0]?.projectName,
        },
      };
    case GET_PROJECT_ID_TASK:
      return {
        ...state,
        taskProjectInfo: {
          projectId: action.payload.projectId,
          projectName: action.payload.projectName,
        },
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        fullTaskArr: [...state.fullTaskArr, action.formData],
        empTask: [...state.empTask, action.formData],
      };
    case ADD_PROJECT_FROM_TASK:
      return {
        ...state,
        projectNames: [...state.projectNames, action.payload],
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        fullTaskArr: state.fullTaskArr.map((task) =>
          task.taskId === action.taskId ? action.formData : task
        ),
        empTask: state.empTask.map((task) =>
          task.taskId === action.taskId ? action.formData : task
        ),
      };
    case DEL_TASK_SUCCESS:
      return {
        ...state,
        fullTaskArr: state.fullTaskArr.filter(
          (task) => task.taskId !== action.payload
        ),
        empTask: state.empTask.filter((task) => task.taskId !== action.payload),
      };
    case GET_ALL_TASK_OF_PROJECT_SUCCESS: {
      return {
        ...state,
        tasksOfProject: action.payload,
      };
    }
    default:
      return state;
  }
}

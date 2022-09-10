import {
  GET_PROJECT_LIST_SUCCES,
  GET_SELECT_PROJECT_SUCCESS,
  ADD_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  DEL_PROJECT_SUCCESS,
  GET_PROJECT_LIST_OF_EMPLOYEE_SUCCESS,
} from "../../actions/actionType";

const initialState = {
  projectList: [],
  employeeProjectList: [],
  selectProject: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_LIST_SUCCES:
      return {
        ...state,
        // projectList: action.payload,
      };
    case GET_PROJECT_LIST_OF_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeeProjectList: action.payload,
      };
    case GET_SELECT_PROJECT_SUCCESS:
      return {
        ...state,
        selectProject: action.payload[0],
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projectList: [...state.projectList, action.payload],
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        employeeProjectList: state.employeeProjectList.map((el) =>
          el.projectList[0].projectID === action.payload.projectID
            ? {
                ...el,
                projectList: [action.payload],
              }
            : el
        ),
      };
    case DEL_PROJECT_SUCCESS:
      return {
        ...state,
        employeeProjectList: state.employeeProjectList.filter(
          (el) => el.projectList[0].projectID !== 53
        ),
      };

    default:
      return state;
  }
}

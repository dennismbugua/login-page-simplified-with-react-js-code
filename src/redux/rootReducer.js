import { combineReducers } from "redux";
import AdminSettingReducer from "./reducers/adminSetting/adminSetting.reducer";
import EmployeeReducer from "./reducers/employee/employee.reducer";
import ProjectReducer from "./reducers/projects/projects.reducer";
import TaskReducer from "./reducers/task/task.reducer";
import ProcessRewards from "./reducers/processRewards/processRewards.reducer";
import Payroll from "./reducers/payroll/payroll.reducer";
import Ticket from "./reducers/ticket/ticket.reducer";
import loginAuth from "./reducers/loginAuth/LoginAuth";

export default combineReducers({
  adminSettingReducer: AdminSettingReducer,
  empReducer: EmployeeReducer,
  projectReducer: ProjectReducer,
  taskReducer: TaskReducer,
  ProcessRewardsReducer: ProcessRewards,
  payRollReducer: Payroll,
  ticketReducer: Ticket,
  loginAuthReducer: loginAuth,
});

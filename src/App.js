import React, { useEffect } from "react";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";

import { PrivateRoute } from "./components/layout";
import { MainLayout } from "./components/layout";
import PageSpinner from "./components/common/PageSpinner";
// import Test from "./pages/test/Test";

// Admin dashboard.=========================================
import { AdminDashboard } from "./pages/adminDashboard/index";
// Admin settings.=========================================
import {
  CompanyLocation,
  Department,
  Designation,
  WorkPrimise,
  EmployeeType,
  Reward,
  LeaveType,
  HolidayCalender,
  CompanyPolicy,
  RolesNdPermissions,
  Assets,
} from "./pages/adminSettings/index";
// Employee.=========================================
import {
  EmployeeDashboard,
  EmployeeSettings,
  EmployeeProfileView,
  EmployeeRewards,
  AssignRewards,
  ProcessRewards,
} from "./pages/employee/index";
// Projects.=========================================
import { ListProjects, ViewProject } from "./pages/projects/index";
// Tasks.=========================================
import { TaskManagment, TaskBoard } from "./pages/tasks/index";
// payroll.=========================================
import {
  EmployeeSalary,
  PayRollItems,
  SalaryProcess,
  SalaryReport,
  PLReport,
} from "./pages/payroll/index";
// Finance.=========================================
import { PettyCash, Invoice, GiftVoucher } from "./pages/finance/index";
//  Helpdesk Tickects.==============================
import {
  HelpDeskTickets,
  TicketDetails,
  ListAllTicktes,
  AdminListAllTickets,
} from "./pages/helpDeskTickets";

// Login.====================================
import { Login } from "./pages/loginRegister";
import Test from "./pages/test/Test";

const ViewPreviousProject = React.lazy(() =>
  import("./components/employee/previousProjects/ViewPreviousProject.js")
);

function App() {
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/em";
      // return <Redirect to="/em"></Redirect>;
    }
  }, []);
  return (
    <Router history={history}>
      {/* <GAListener> */}
      <Switch>
        <Route exact path="/em" component={Login} />

        <MainLayout>
          <React.Suspense fallback={<PageSpinner />}>
            {/* home routes */}

            <PrivateRoute
              exact
              path="/em/adminDashboard"
              component={AdminDashboard}
            ></PrivateRoute>
            {/* ----------Admin Settings Routes----------------- */}
            <Route exact path="/em/department" component={Department}></Route>
            <Route exact path="/em/designation" component={Designation}></Route>
            <Route exact path="/em/workprimise" component={WorkPrimise}></Route>
            <Route exact path="/em/reward" component={Reward}></Route>
            <Route exact path="/em/leavetype" component={LeaveType}></Route>
            <Route exact path="/em/assets" component={Assets}></Route>
            <Route
              exact
              path="/em/companylocation"
              component={CompanyLocation}
            ></Route>
            <Route
              exact
              path="/em/employeetype"
              component={EmployeeType}
            ></Route>
            <Route
              exact
              path="/em/holidaycalender"
              component={HolidayCalender}
            ></Route>
            <Route
              exact
              path="/em/companypolicy"
              component={CompanyPolicy}
            ></Route>
            <Route
              exact
              path="/em/rolesndpermission"
              component={RolesNdPermissions}
            ></Route>
            {/* ----------Employee Settings Routes----------------- */}
            <PrivateRoute
              exact
              path="/em/employeeDashboard"
              component={EmployeeDashboard}
            ></PrivateRoute>
            <Route exact path="/em/emplist" component={EmployeeSettings} />
            <Route
              exact
              path="/em/empProfile/:empId"
              component={EmployeeProfileView}
            />
            <Route
              exact
              path="/em/empRewards/:empId"
              component={EmployeeRewards}
            />
            <Route
              exact
              path="/em/assignRewards"
              component={AssignRewards}
            ></Route>
            <Route
              exact
              path="/em/processRewards"
              component={ProcessRewards}
            ></Route>
            <Route exact path="/em/listProjects" component={ListProjects} />
            <Route
              exact
              path="/em/viewProject/:projectId"
              component={ViewProject}
            />
            {/* Task ------------------------------------------------- */}
            <Route exact path="/em/taskManagment" component={TaskManagment} />
            <Route
              exact
              path="/em/taskboard/:projectId"
              component={TaskBoard}
            />

            <Route
              exact
              path="/em/viewPreviousProject/:workExperienceId/:employeeId"
              component={ViewPreviousProject}
            ></Route>
            {/* payroll -----------------------------------------------  */}
            <Route exact path="/em/employeeSalary" component={EmployeeSalary} />
            <Route exact path="/em/payRollItems" component={PayRollItems} />
            <Route exact path="/em/processSalary" component={SalaryProcess} />
            <Route exact path="/em/salaryReport" component={SalaryReport} />
            <Route exact path="/em/plReport" component={PLReport} />
            {/* finance -----------------------------------------------  */}
            <Route exact path="/em/pettyCash" component={PettyCash} />
            <Route exact path="/em/giftVoucher" component={GiftVoucher} />
            <Route exact path="/em/invoice" component={Invoice} />

            {/* helpdesk tickets -----------------------------------------------  */}
            <Route exact path="/em/helpdesk" component={HelpDeskTickets} />
            <Route
              exact
              path="/em/ticketDetails/:ticketId"
              component={TicketDetails}
            />
            <Route exact path="/em/ListAllTicktes" component={ListAllTicktes} />
            <Route
              exact
              path="/em/adminListAllTickets"
              component={AdminListAllTickets}
            />
            <Route exact path="/em/test" component={Test} />
          </React.Suspense>
        </MainLayout>
        {/* login -----------------------------------------------  */}
      </Switch>
      {/* </GAListener> */}
    </Router>
  );
}

export default App;

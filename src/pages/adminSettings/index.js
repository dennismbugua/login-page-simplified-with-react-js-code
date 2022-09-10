import React from "react";

// export { default as CompanyLocation } from "./companyLocation/CompanyLocation";
export const CompanyLocation = React.lazy(() =>
  import("./companyLocation/CompanyLocation")
);

// export { default as Department } from "./department/Department";
export const Department = React.lazy(() => import("./department/Department"));

// export { default as Designation } from "./designation/Designation";
export const Designation = React.lazy(() =>
  import("./designation/Designation")
);
// export { default as WorkPrimise } from "./workPrimise/WorkPrimise";
export const WorkPrimise = React.lazy(() =>
  import("./workPrimise/WorkPrimise")
);

// export { default as EmployeeType } from "./emplayeeType/EmployeeType";
export const EmployeeType = React.lazy(() =>
  import("./employeeType/EmployeeType")
);

// export { default as Reward } from "./reward/Reward";
export const Reward = React.lazy(() => import("./reward/Reward"));

// export { default as LeaveType } from "./leaveType/LeaveType";
export const LeaveType = React.lazy(() => import("./leaveType/LeaveType"));

// export { default as HolidayCalender } from "./holidayCalender/HolidayCalender";
export const HolidayCalender = React.lazy(() =>
  import("./holidayCalender/HolidayCalender")
);

// export { default as CompanyPolicy } from "./companyPolicy/CompanyPolicy";
export const CompanyPolicy = React.lazy(() =>
  import("./companyPolicy/CompanyPolicy")
);

// export { default as RolesNdPermissions } from "./rolesNdPermissions/RolesNdPermissions";
export const RolesNdPermissions = React.lazy(() =>
  import("./rolesNdPermissions/RolesNdPermissions")
);

// export { default as Assets } from "./assets/Assets";
export const Assets = React.lazy(() => import("./assets/Assets"));

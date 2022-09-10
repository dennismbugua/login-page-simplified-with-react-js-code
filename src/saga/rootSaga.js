import { all } from "redux-saga/effects";
// admin setting saga.
import { officeLocationWatchFun } from "./adminSettings/officeLocation.saga";
import { designationWatchFun } from "./adminSettings/designation.saga";
import { departmentWatchFun } from "./adminSettings/department.saga";
import { workPrimiseWatchFunc } from "./adminSettings/workPrimise.saga";
import { rewardsWatchFunc } from "./adminSettings/rewards.saga";
import { employeeWatchFun } from "./employee.saga";
import { projectWatachFun } from "./project.saga";
import { taskWatchFun } from "./task.saga";
import { processRewardsWatchFun } from "./processRewards.saga";
import { assetWatchFun } from "./adminSettings/asset.saga";
import { employeetypeWatchFun } from "./adminSettings/employeetype.saga";
import { itemsWatchFunc } from "./adminSettings/items.saga";
import { holidaycalendarWatchFun } from "./adminSettings/holidaycalendar.saga";
import { leavetypeWatchFun } from "./adminSettings/leavetype.saga";
import { companypolicyWatchFun } from "./adminSettings/companypolicy.saga";
import { skillWatchFun } from "./adminSettings/skill.saga";
import { certificationWatchFun } from "./adminSettings/certification.saga";

import { payRollWatchFunc } from "./payroll.saga";
import { ticketWahtchFunc } from "./ticket.saga";
import { loginAuthWatchFunc } from "./LoginAuth";

export default function* rootSaga() {
  yield all([
    officeLocationWatchFun(),
    designationWatchFun(),
    departmentWatchFun(),
    workPrimiseWatchFunc(),
    rewardsWatchFunc(),
    employeeWatchFun(),
    projectWatachFun(),
    taskWatchFun(),
    processRewardsWatchFun(),
    itemsWatchFunc(),
    assetWatchFun(),
    employeetypeWatchFun(),
    holidaycalendarWatchFun(),
    leavetypeWatchFun(),
    companypolicyWatchFun(),
    skillWatchFun(),
    payRollWatchFunc(),
    ticketWahtchFunc(),
    loginAuthWatchFunc(),
    certificationWatchFun(),
  ]);
}

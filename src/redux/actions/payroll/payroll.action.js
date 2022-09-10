import { GET_PAYROLL_ITEM, ADD_PAYROLL_ITEM } from "../actionType";

// saga calls.
export const getAllPayRollItem = () => {
  return {
    type: GET_PAYROLL_ITEM,
  };
};
export const addPayRollItem = (whichTab, formData) => {
  return {
    type: ADD_PAYROLL_ITEM,
    payload: { whichTab: whichTab, formDate: formData },
  };
};

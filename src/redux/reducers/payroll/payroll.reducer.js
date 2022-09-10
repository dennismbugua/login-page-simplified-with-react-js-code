import { GET_PAYROLL_ITEM_SUCCESS } from "../../actions/actionType";

const initialState = {
  payRollItem: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYROLL_ITEM_SUCCESS:
      return {
        ...state,
        payRollItem: action.payload,
      };
    default:
      return state;
  }
}

import { GET_PROCESS_REWARDS_SUCCESS } from "../../actions/actionType";

const initialState = {
  toProcessRewards: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROCESS_REWARDS_SUCCESS:
      return {
        ...state,
        toProcessRewards: action.payload,
      };
    default:
      return state;
  }
}

import { GET_PROCESS_REWARDS } from "../actionType";

// saga call.
export const getProcessRewards = () => {
  return {
    type: GET_PROCESS_REWARDS,
  };
};

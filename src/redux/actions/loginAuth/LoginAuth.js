import { LOGIN_USER, CHECK_LOGIN } from "../actionType";

export const getLoginUser = (userName, password) => {
  return {
    type: LOGIN_USER,
    payload: { userName, password },
  };
};

// Reducer call ---------------------------------------
export const checkLogin = () => {
  let token = JSON.parse(localStorage.getItem("user"));
  return {
    type: CHECK_LOGIN,
    payload: token,
  };
};

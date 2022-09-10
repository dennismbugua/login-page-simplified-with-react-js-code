import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { getLoginUser } from "../../redux/actions/loginAuth/LoginAuth";

import "../../style/login.css";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { Alert } from "reactstrap";

const role = "admin";
// const role = "developer";

const Login = (props) => {
  const { getLoginUser } = props;
  const { login, loginUser, loginInput } = props.loginUser;

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [redirect, setRedirect] = useState(null);

  // Function.

  useEffect(() => {
    if (loginUser !== null) {
      if (loginUser.RoleName === "Admin") {
        setRedirect(<Redirect to="/em/adminDashboard"></Redirect>);
      } else {
        setRedirect(<Redirect to="/em/employeeDashboard"></Redirect>);
      }
    }
  }, [loginUser]);

  useEffect(() => {
    console.log(window.location.pathname);
  }, []);

  const handleClickSign = async (e) => {
    e.preventDefault();
    await getLoginUser(userName, password);

    // if (loginUser.RoleName === "Admin") {
    //   setRedirect(<Redirect to="/adminDashboard"></Redirect>);
    // } else {
    //   setRedirect(<Redirect to="/employeeDashboard"></Redirect>);
    // }
  };

  return (
    <Fragment>
      {/* on login success redirect to employee dashboard or admin dash board. */}
      {login && redirect}
      <div className="login">
        <div className="login-left-image"></div>
        <div className="login-div">
          <form>
            <div className=" ">
              {loginInput === false && (
                <Alert color="danger">User name or password incorrect</Alert>
              )}

              <h2>Login</h2>
              <label>Username </label>
              <input
                type="text"
                name="name"
                placeholder="Enter User Name"
                required=""
                onChange={(e) => setUserName(e.target.value)}
              />
              <label>Password </label>
              <input
                type="password"
                name="name"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required=""
              />
              <div className="bg-info">
                <div className="float-left">
                  <input
                    id="check3"
                    name="check3"
                    type="checkbox"
                    value="show password"
                  />
                  <span className="ml-2">Show password</span>
                </div>
                <span className="float-right">Forgot Password</span>
              </div>
            </div>
            <button className="btn-login" onClick={handleClickSign}>
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loginUser: state.loginAuthReducer,
});

export default connect(mapStateToProps, { getLoginUser })(Login);

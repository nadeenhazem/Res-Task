import React, { useEffect, useState } from "react";
import "../App.css";

import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "../Redux/SignupSlice";
function Login() {
  const UserData = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const GetSignUp = UserData.data;
  const [isChecked, setIsChecked] = useState(false);
  const [LoginUser, setLoginUser] = useState({
    email: "",
    password: "",
    RememberMe: isChecked,
  });
  const [errors, setErrors] = useState({
    passwordErr: null,
  });
  const [saveAccess, setSaveAccess] = useState([]);

  const changeData = (e) => {
    if (e.target.name === "email") {
      setLoginUser({
        ...LoginUser,
        email: e.target.value,
      });
    }
    if (e.target.name === "password") {
      setLoginUser({
        ...LoginUser,
        password: e.target.value,
      });
    }
    if (e.target.name === "RememberMe") {
      setLoginUser({
        ...LoginUser,
        RememberMe: !isChecked,
      });
      setIsChecked(!isChecked);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const arrofemails = [];
    const arrofPassword = [];
    console.log(GetSignUp);
    GetSignUp.map((Check) => {
      arrofemails.push(Check.email);
      arrofPassword.push(Check.Password);
    });

    console.log(arrofemails.indexOf(LoginUser.email), "emails");
    console.log(arrofPassword.indexOf(LoginUser.password), "emails");

    setErrors({
      ...errors,

      passwordErr:
        arrofemails.indexOf(LoginUser.email) !==
          arrofPassword.indexOf(LoginUser.password) ||
        !arrofPassword.includes(LoginUser.password) ||
        !arrofemails.includes(LoginUser.email)
          ? "email or  Password are Incorrect"
          : (navigate("/"),
            setSaveAccess((saveAccess) => (saveAccess = LoginUser))),
    });
  };
  console.log(LoginUser);
  return (
    <div className="container-fluid">
      <div className="row justify-content-end">
        <div className="col-lg-5 col-md-5 signUp-container">
          <div className="main-container">
            <div className="mt-5 mb-3 mx-1 logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="d-flex mx-2  justify-content-md-between justify-content-center">
              <span className="signUp-Header">Welcome Back</span>
              <span className="required mt-2 d-none d-md-block">*Required</span>
            </div>

            <div
              style={{
                color: "#A5A5A5",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <hr className="signUp-line" />
              <span className="mx-2 ms-2">or</span>
              <hr className="signUp-line" />
            </div>
            <div>
              <form>
                <div className="signUp-form mx-4 mb-3">
                  <label htmlFor="email" className="label">
                    E-Mail<span className="required mx-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="mail@website.com"
                    className="form-Field email-field"
                    onChange={(e) => changeData(e)}
                    name="email"
                  />
                </div>

                <div className="signUp-form  mx-4">
                  <label htmlFor="Password" className="label">
                    Password <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-Field email-field"
                    placeholder="Password"
                    onChange={(e) => changeData(e)}
                    name="password"
                  />

                  <p className="text-danger"> {errors.passwordErr} </p>
                </div>
                <div className="d-flex mx-4  my-3 justify-content-between ">
                  <div className="signUp-form   ">
                    <label>
                      <input
                        type="checkbox"
                        id="RememberMe"
                        name="RememberMe"
                        onChange={(e) => changeData(e)}
                      />
                    </label>
                  </div>
                  <span>
                    <Link
                      className="text-muted text-monospace"
                      style={{ textDecoration: "underline" }}
                    >
                      Forget Password
                    </Link>
                  </span>
                </div>

                <button
                  type="submit"
                  className="main-btn btn-Submit mx-3 mb-4 "
                  onClick={handleChange}
                >
                  Login
                </button>
                <button type="button" className="main-btn btn-guest mx-3 mb-4 ">
                  Continue as a guest
                </button>
              </form>

              <div className="mx-3">
                <div className="d-flex mx-1 justify-content-md-start justify-content-center">
                  <span> Not registered yet? </span>
                  <Link to={"/"} className="required signUp-login-Link">
                    Create an account
                  </Link>
                </div>
                <div className=" d-md-block text-muted mx-2 mt-4">
                  @2022 Rescounts All rights reserved
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-7 Login-img d-none d-sm-block "></div>
      </div>
    </div>
  );
}

export default Login;

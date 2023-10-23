import React, { useEffect } from "react";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchData } from "../Redux/SignupSlice";
function Login() {
  const UserData = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    Password: "",
    RememberMe: false,
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const onSubmit = (values) => {
    navigate("/");
    console.log(values);
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Formate !").required("Required!"),
    Password: Yup.string()
      .required("Please enter a password")

      .min(8, "Password must have at least 8 characters")

      .matches(/[0-9]/, "Your password must have at least 1  number ")
      .matches(
        /[a-z]/,
        "Your password must have at least 1   lowercase character "
      )
      .matches(
        /[A-Z]/,
        "Your password must have at least 1   uppercase character "
      ),
  });

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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="signUp-form mx-4 mb-3">
                    <label htmlFor="email" className="label">
                      E-Mail<span className="required mx-1">*</span>
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="mail@website.com"
                      className="form-Field email-field"
                    />

                    <ErrorMessage name="email" component={TextError} />
                  </div>

                  <div className="signUp-form  mx-4">
                    <label htmlFor="Password" className="label">
                      Password <span className="required">*</span>
                    </label>
                    <Field
                      type="text"
                      id="Password"
                      name="Password"
                      className="form-Field email-field"
                      placeholder="Password"
                    />
                    <ErrorMessage name="Password" component={TextError} />
                  </div>
                  <div className="d-flex mx-4  my-3 justify-content-between ">
                    <div className="signUp-form   ">
                      <label>
                        <Field
                          type="checkbox"
                          name="RememberMe"
                          className="cursor-pointer"
                        />
                        Remember Me
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
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="main-btn btn-guest mx-3 mb-4 "
                  >
                    Continue as a guest
                  </button>
                </Form>
              </Formik>
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

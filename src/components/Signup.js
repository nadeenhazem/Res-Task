import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { AddNewData } from "../Redux/SignupSlice";
function Signup() {
  const [phone, setPhone] = useState("+1");
  useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    fname: "",
    lname: "",
    Password: "",
    City: "",
    Country: phone,
    PhoneNumber: "",
    Salutation: "",
    termsAndConditions: false,
  };
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(AddNewData(values));
    // navigate("/login");
  };
  const validationSchema = Yup.object({
    fname: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
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

    PhoneNumber: Yup.string()
      .matches(/[0-9]/, "Phone Number must be number only ")
      .min(10, "should be 10 numbers only")
      .max(10, "should be 10 numbers only"),
    termsAndConditions: Yup.bool().oneOf(
      [true],
      "You need to accept the terms and conditions"
    ),
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-end">
        <div className="col-lg-5 col-md-5 signUp-container">
          <div className="main-container">
            <div className="mt-2 mb-3 mx-1 logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="d-flex  justify-content-md-between justify-content-center">
              <span className="signUp-Header"> Create Account</span>
              <span className="required mt-2 d-none d-md-block">*Required</span>
            </div>
            <div className="d-flex mx-1 justify-content-md-start justify-content-center">
              <span> Already have account?</span>
              <Link to={"/login"} className="required signUp-login-Link">
                Login
              </Link>
            </div>

            <div
              style={{
                color: "#A5A5A5",
                textAlign: "center",
              }}
            >
              <hr className="signUp-line" />
              <span className="mx-2 ms-2">or</span>
              <hr className="signUp-line" />
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="signUp-form">
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
                  <div
                    className="row "
                    style={{
                      marginLeft: "0px",
                    }}
                  >
                    <div className=" col-6 Fname">
                      <label htmlFor="fname" className="label">
                        First Name <span className="required">*</span>
                      </label>
                      <Field
                        type="text"
                        id="fname"
                        name="fname"
                        className="form-Field name-field"
                        placeholder="First Name"
                      />
                      <ErrorMessage name="fname" component={TextError} />
                    </div>
                    <div className=" col-6 ">
                      <label htmlFor="lname" className="label">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="lname"
                        name="lname"
                        className="form-Field name-field"
                        placeholder="Last Name"
                      />
                      <ErrorMessage name="lname" component={TextError} />
                    </div>
                  </div>
                  <div className="signUp-form">
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
                  <div className="signUp-form">
                    <label htmlFor="City" className="label">
                      City
                    </label>
                    <Field
                      type="text"
                      id="City"
                      name="City"
                      className="form-Field email-field"
                      placeholder="City"
                    />
                  </div>
                  <div
                    className="row "
                    style={{
                      marginLeft: "0px",
                    }}
                  >
                    <div className=" col-3 Fname">
                      <label htmlFor="Country" className="label">
                        Country
                      </label>

                      <PhoneInput value={phone} onChange={setPhone} />
                    </div>
                    <div className=" col-9 ">
                      <label htmlFor="PhoneNumber" className="label">
                        Mobile Number
                      </label>
                      <Field
                        type="text"
                        id="PhoneNumber"
                        name="PhoneNumber"
                        className="form-Field name-field"
                        placeholder="PhoneNumber"
                      />
                      <ErrorMessage name="PhoneNumber" component={TextError} />
                    </div>
                  </div>

                  <div className="signUp-form ">
                    <div className="label">Salutation</div>
                    <div role="group" className="Salutation">
                      <label>
                        <Field
                          type="radio"
                          name="Salutation"
                          value="Mr"
                          className="cursor-pointer"
                        />
                        Mr
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="Salutation"
                          value="Miss"
                          className="cursor-pointer"
                        />
                        Miss
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="Salutation"
                          value="Mrs"
                          className="cursor-pointer"
                        />
                        Mrs
                      </label>
                    </div>
                  </div>
                  <div className="signUp-form">
                    <label htmlFor="BirthDate" className="label">
                      BirthDate
                    </label>
                    <Field
                      type="date"
                      id="BirthDate"
                      name="BirthDate"
                      className="form-Field email-field"
                      placeholder="MM/DD/YY"
                    />
                  </div>
                  <div className="signUp-form">
                    <div
                      className="required check-style"
                      style={{ fontSize: "12px" }}
                    >
                      "Add your date of birth if you want receive FREE gifts in
                      your birthday"
                    </div>
                    <label>
                      <Field
                        type="checkbox"
                        name="termsAndConditions"
                        className="cursor-pointer"
                      />
                      I Accept Rescounts
                      <span className="required check-style">
                        Terms & Conditions
                      </span>{" "}
                      And
                      <span className="required check-style">
                        {" "}
                        Privacy Policy
                      </span>
                    </label>
                    <ErrorMessage
                      name="termsAndConditions"
                      component={TextError}
                    />
                  </div>
                  <div className=" d-block d-md-none text-muted text-center mb-3 mt-2">
                    @2022 Rescounts All rights reserved
                  </div>
                  <button type="submit" className="main-btn btn-Submit ">
                    Sign up
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
          <footer className="d-none d-md-block text-muted mx-2">
            @2022 Rescounts All rights reserved
          </footer>
        </div>

        <div className="col-lg-6 col-md-7 signUp-img d-none d-sm-block "></div>
      </div>
    </div>
  );
}

export default Signup;

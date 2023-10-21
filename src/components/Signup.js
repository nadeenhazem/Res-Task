import React from "react";
import { useState } from "react";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
function Signup() {
  const [phone, setPhone] = useState("");

  const initialValues = {
    Country: phone,
    email: "",
    fname: "",
    lname: "",
    Password: "",
    City: "",

    PhoneNumber: "",
    Salutation: "",
    termsAndConditions: false,
  };
  const onSubmit = (values) => {
    console.log("data values", values);
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
          <div style={{ backgroundColor: "#fff", width: "80%" }}>
            <div className="mt-2 mb-3 mx-1">
              <img src={logo} alt="logo" />
            </div>
            <div className="d-flex justify-content-between">
              <span className="signUp-Header"> Create Account</span>
              <span className="required mt-2">*Required</span>
            </div>
            <div>
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
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                // validateOnChange={false}
                // validateOnBlur={false}
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
                    className="row"
                    style={{
                      margin: "auto",
                    }}
                  >
                    <div className=" col-6 ">
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
                  <div className="signUp-form">
                    Country
                    <PhoneInput
                      defaultCountry="ua"
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        initialValues.Country = value;
                      }}
                      name="Country"
                    />
                  </div>
                  <div className="signUp-form">
                    <div>Salutation</div>
                    <div role="group">
                      <label>
                        <Field type="radio" name="Salutation" value="Mr" />
                        Mr
                      </label>
                      <label>
                        <Field type="radio" name="Salutation" value="Miss" />
                        Miss
                      </label>
                      <label>
                        <Field type="radio" name="Salutation" value="Mrs" />
                        Mrs
                      </label>
                    </div>
                  </div>
                  <div className="signUp-form">
                    <label htmlFor="BirthDate" className="label">
                      BirthDate
                    </label>
                    <Field
                      type="text"
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
                      "Add your date of birth if you want receive FREE gifts
                      in your birthday"
                    </div>
                    <label>
                      <Field type="checkbox" name="termsAndConditions" />I
                      Accept Rescounts
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

                  <button type="submit" className="btn-Submit">
                    Sign up
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-7 signUp-img d-none d-sm-block "></div>
      </div>
    </div>
  );
}

export default Signup;

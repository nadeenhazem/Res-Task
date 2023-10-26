import React from "react";
import { PhoneInput } from "react-international-phone";

function TextError(props) {
  return <div className="form-error">{props.children}</div>;
}

export default TextError;

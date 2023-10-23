import { configureStore } from "@reduxjs/toolkit";
import SignupSlice from "./SignupSlice";
const store = configureStore({
  reducer: {
    signup: SignupSlice,
  },
});
export default store;

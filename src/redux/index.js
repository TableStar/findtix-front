import { configureStore } from "@reduxjs/toolkit";
import accountSliceReducer from "./slice/accountSlice";
import userSliceReducer from "./slice/userSlice";
import picSliceReducer from "./slice/picSlice";

const globalState = configureStore({
  reducer: {
    accountSliceReducer,
    userSliceReducer,
    picSliceReducer,
  },
});

export default globalState;

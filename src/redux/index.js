import { configureStore } from "@reduxjs/toolkit";
import accountSliceReducer from "./slice/accountSlice";
import userSliceReducer from "./slice/userSlice";
import picSliceReducer from "./slice/picSlice";

import eventReducer from "./slice/eventSlice"
import categoryReducer from "./slice/categorySlice"
import cityReducer from "./slice/citySlice"


const globalState = configureStore({
  reducer: {
    accountSliceReducer,
    userSliceReducer,
    picSliceReducer,
    eventReducer,
    categoryReducer,
    cityReducer
  },
});
export default globalState;
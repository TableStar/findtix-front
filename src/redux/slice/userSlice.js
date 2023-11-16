import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axios";
import { API_URL } from "../../helper";

const initialState = {
  userProps: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    creatorCompany: "",
    createdAt: "",
  },
};
const userSlice = createSlice({
  name: "userProps",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.userProps = action.payload;
    },
  },
});

export const { SetUser } = userSlice.actions;
export default userSlice.reducer;

//Middleware
export const getUserProps = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(API_URL + `/auths/users`);
      dispatch(SetUser(response.data.result));
      console.log("this is response user", response);
    } catch (error) {
      console.log(error);
    }
  };
};

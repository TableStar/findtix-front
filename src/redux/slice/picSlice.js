import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axios";
import { API_URL } from "../../helper";

const initialState = { profilepic: "" };
const pictureSlice = createSlice({
  name: "profilepic",
  initialState,
  reducers: {
    setProfilePic: (state, action) => {
      state.profilepic = action.payload;
    },
  },
});

export const { setProfilePic } = pictureSlice.actions;
export default pictureSlice.reducer;

export const getPic = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(API_URL + "/profilepic");
      console.log("🚀 ~ file: picSlice.js:23 ~ return ~ response:", response)
      dispatch(setProfilePic(API_URL + `${response.data?.result}`));
    } catch (error) {
      console.log(error);
    }
  };
};

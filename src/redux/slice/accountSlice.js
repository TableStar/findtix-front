import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    username: "",
    password: "",
    email: "",
  },
  reducers: {
    login: (state, action) => {
      console.log("SliceAccount", action.payload);
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
    logout: (state, action) => {
      state = { username: "", password: "", email: "" };
    },
  },
});

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;

//Middleware
export const getAccountLogin = () => {
  return async (dispatch) => {
    try {
      const dataStorage = await JSON.parse(localStorage.getItem("dataLogin"));
      const resGET = await API_CALL.get(
        `/account?username=${dataStorage.username}&password=${dataStorage.password}`
      );
      console.log("This IS Middleware", resGET.data[0]);
      if (!resGET.data[0]) {
        dispatch(logout());
      } else {
        dispatch(login(resGET.data[0]));
        localStorage.setItem("dataLogin", JSON.stringify(resGET.data[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

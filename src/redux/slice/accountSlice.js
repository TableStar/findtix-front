import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axios";
import { API_URL, setToken } from "../../helper";
import { useNavigate } from "react-router-dom";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  username: "",
  email: "",
  role: "",
};
const accountSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
      state.loading = false;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state, action) => {
      return (state = {
        ...initialState,
        token: localStorage.removeItem("token"),
      });
    },
  },
});

export const { userLoaded, logout } = accountSlice.actions;
export default accountSlice.reducer;

//Middleware
export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(API_URL + "/auths/keeplogin");
      dispatch(userLoaded(response.data.result));
      console.log(response.data.result);
      setToken(response.data.result.token);
    } catch (error) {
      if (
        error.response.data.message.toLowerCase().includes("invalid") ||
        error.response.data.message.toLowerCase().includes("empty")
      ) {
        dispatch(logout());
      }
    }
  };
};
// export const getAccountLogin = () => {
//   return async (dispatch) => {
//     try {

//       const resGET = await API_CALL.post(
//         `/account/auth`,{

//         }
//       );
//       console.log("This IS Middleware", resGET.data[0]);
//       if (!resGET.data[0]) {
//         dispatch(logout());
//       } else {
//         dispatch(login(resGET.data[0]));
//         localStorage.setItem("dataLogin", JSON.stringify(resGET.data[0]));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

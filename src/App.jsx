import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingPageLogin from "./pages/Auth/LandingPageLogin";
import LandingPageRegister from "./pages/Auth/LandingPageRegister";
import UserDash from "./pages/UserDash/UserDash";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { keepLogin, logout } from "./redux/slice/accountSlice";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";

function App() {
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(getAccountLogin());
  //   if (!account.username) {
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
    if (!userGlobal.token && !localStorage.token) {
      dispatch(logout());
    } else if (userGlobal.token) {
      dispatch(keepLogin());
    }
    // if (!userGlobal.token) {
    //   navigate("/auth/login");
    // }
  }, []);

  let databaseUser = [
    {
      userId: "",
      username: "",
      userFullName: "",
      userEmail: "",
      userPhone: "",
      userLocation: "",
      userPicture: "",
      userType: "", // type ada creator / attendee saja
    },
  ];

  let databaseTransaction = [
    {
      userId: "",
      eventId: "",
      transactionAmount: 0,
      transactionDate: "",
    },
  ];

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LandingPageLogin />} />
        <Route path="/auth/register" element={<LandingPageRegister />} />
        <Route path="/userdash" element={<UserDash />} />
        <Route path="/auth/verifyemail" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;

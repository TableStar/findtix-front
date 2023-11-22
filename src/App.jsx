import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import EventPage from './pages/EventPage'
import LandingPageLogin from "./pages/Auth/LandingPageLogin";
import LandingPageRegister from "./pages/Auth/LandingPageRegister";
import UserDash from "./pages/UserDash/UserDash";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from './redux/slice/eventSlice'
import { getCategories } from './redux/slice/categorySlice'
import { keepLogin, logout } from "./redux/slice/accountSlice";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import CreateEvent from './forms/CreateEvent';

function App() {
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(getEvents());
    dispatch(getCategories());
    if (!userGlobal.token && !localStorage.token) {
      dispatch(logout());
    } else if (userGlobal.token) {
      console.log("MASUK KEEP LOGIN");
      dispatch(keepLogin());
    }
    // if (!userGlobal.token) {
    //   navigate("/auth/login");
    // }
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/e/:id" element={<EventPage />} />
        <Route path="/auth/login" element={<LandingPageLogin />} />
        <Route path="/auth/register" element={<LandingPageRegister />} />
        <Route path="/userdash" element={<UserDash />} />
        <Route path="/auth/verifyemail" element={<VerifyEmail />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </div>
  );
}

export default App;

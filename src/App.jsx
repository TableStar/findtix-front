import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LandingPageLogin from "./pages/Auth/LandingPageLogin";
import LandingPageRegister from "./pages/Auth/LandingPageRegister";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;

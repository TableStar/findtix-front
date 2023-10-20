import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

function App() {
  let databaseUser = [{
    userId: "",
    username: "",
    userFullName: "",
    userEmail: "",
    userPhone: "",
    userLocation: "",
    userPicture: "",
    userType: "", // type ada creator / attendee saja
  }]

  let databaseTransaction = [{
    userId: "",
    eventId: "",
    transactionAmount: 0,
    transactionDate: "",
  }]



  return (
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
  )
}

export default App

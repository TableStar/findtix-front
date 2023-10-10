import { useState } from 'react'
import './App.css'

function App() {

  let databaseEvent = [{
    eventId: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
    eventprice: 0,
  }]

  let databaseUser = [{
    userId : "",
    username: "",
    userFullName: "",
    userEmail: "",
    userPhone: "",
    userLocation: "",
    userPicture: "",
    userType: "", // type ada creator / attendee saja
  }]

  let databaseTransaction = [
    {
      userId: "",
      eventId: "",
      transactionAmount: 0,
      transactionDate: "",
    }
  ]



  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </div>
    </>
  )
}

export default App

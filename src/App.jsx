import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EventPage from './pages/EventPage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getEvents } from './redux/slice/eventSlice'
import { getCategories } from './redux/slice/categorySlice'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getEvents());
    dispatch(getCategories());
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/e/:id" element={<EventPage />} />
      </Routes>
    </div>
  )
}

export default App

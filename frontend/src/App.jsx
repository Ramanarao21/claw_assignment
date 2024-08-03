import React from 'react'
import {Toaster} from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import AddEvent from './pages/AddEvent'
import EventDetails from './pages/EventDetails'
import EditEvent from './pages/EditEvent'

const App = () => {
  return (
    <>
   <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/add-event" element={<AddEvent/>}/>
    <Route path='/event-details/:eventId' element={<EventDetails/>} />
    <Route path="/" element={<Events/>}/>
    <Route path="/edit-event/:eventId" element={<EditEvent/>}/>
   </Routes>
   <Toaster position='top-center' reverseOrder={false} />
   </>
  )
}

export default App


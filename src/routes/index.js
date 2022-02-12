import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Logon, NewIncident, Profile, Register } from '../pages'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logon />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/incidents/new" element={<NewIncident />} />
      </Routes>
    </Router>
  )
}

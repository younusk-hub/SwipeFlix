import { useState } from 'react'
import './App.css'
import ConnectPage from './pages/ConnectPage/ConnectPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

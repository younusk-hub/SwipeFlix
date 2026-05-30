import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from './pages/Lobby/Lobby';

import Home from './pages/Home/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby/:lobbyId" element={<Lobby />} />
        <Route path="/lobby/:lobbyId/match/:matchId" element={<div>Match Screen</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

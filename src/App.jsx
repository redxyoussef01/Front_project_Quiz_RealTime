import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Quiz from './pages/listeQuiz'

function App() {
    return (
  <BrowserRouter>
 <Routes>
 <Route path="/" element={< Dashboard />} />
  <Route path="/quiz" element={< Quiz />} />

 </Routes>
 </BrowserRouter>
 
  )
}

export default App

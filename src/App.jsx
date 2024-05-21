import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Quiz from './pages/listeQuiz';
import Login from './components/loginR';
import Sign from './components/signup';
import SignP from './components/signupP';
import DD from './components/Dashboard';
import Note from './pages/Results'
import Exam from './pages/quiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import MQuiz from './components/Dashboard';
import Search from './pages/search';
function App() {
    return (
  <BrowserRouter>
 <Routes>
 <Route path="/" element={< Dashboard />} />
  <Route path="/quiz" element={< Quiz />} />
  <Route path="/login" element={< Login />} />
  <Route path="/sign" element={< Sign />} />
  <Route path="/quizz" element={< DD />} />
  <Route path="/SignP" element ={<SignP/>} />
  <Route path="/Results" element ={<Note />} />
  <Route path="/Exam/:searchTerm" element ={<Exam/>}/>
  <Route path="/Mquiz" element ={<MQuiz/>}/>
  <Route path="/student" exact element ={<Search/>}/>
 </Routes>
 </BrowserRouter>
 
  )
}

export default App

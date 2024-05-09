import { useState } from 'react'
import { Navbar } from './components/Navbar'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom';
import{ Home,Student} from "./components/pages";
import Course from './components/cour';


function App() {
   

  return (
 <div className='App'><Navbar/>
 <Routes>
 <Route path="/" element={<Home/>}/>
  <Route path="/Student" element={<Course/>}/>

 </Routes>
 
 </div>
  )
}

export default App
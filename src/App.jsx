import { useState } from 'react'
import { Navbar } from './components/Navbar'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom';
import{ Home,Student} from "./components/pages";



function App() {
   

  return (
 <div className='App'><Navbar/>
 <Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/Student" element={<Student/>}/>

 </Routes>
 
 </div>
  )
}

export default App

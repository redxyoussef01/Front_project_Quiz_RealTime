import React, {useState} from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css"
export const Navbar =()=>{
    const[menuOpen, setMenuOpen]= useState(false)
    return(
    <nav>
     <Link to="/" className="title">Home</Link>
     <div className="menu" onClick={() =>{ setMenuOpen(!menuOpen)}}>
        <span></span>
        <span></span>
        <span></span>
     </div>
<ul  className={menuOpen ? "open" : ""}>

    <li>
        <NavLink to="/Student">Student</NavLink>
    </li>
    <li><NavLink>professor</NavLink></li>
    <li><NavLink>sign in</NavLink></li>
</ul>
    </nav>
    );
}
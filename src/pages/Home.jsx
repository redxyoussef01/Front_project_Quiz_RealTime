import React from "react";
import "./Home.css"
export const Home = () => {
    return(
        <div >
        <header>
          <h1>Welcome to Our Website</h1>
        </header>
       
        
        <footer>
          <p>&copy; {new Date().getFullYear()} Real Time . Application.</p>
        </footer>
      </div>
    );
}
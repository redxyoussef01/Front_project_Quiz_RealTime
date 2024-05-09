import React from "react";
import "./Student.css"
import { SearchBar } from "../SearchBar";
export const Student = () => {
 
    return(
        <div  className="search-bar-container">
          <SearchBar/>
          <div>SearchResults</div> 
      </div>
    );
}
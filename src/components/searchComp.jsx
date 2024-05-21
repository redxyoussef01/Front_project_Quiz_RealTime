import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const input = event.target.value;
    // Only allow numeric input (0-9)
    if (/^\d*$/.test(input)) {
      setSearchTerm(input);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    
      <div className="text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            // Allow only numeric key presses
            const charCode = event.which ? event.which : event.keyCode;
            if (charCode < 48 || charCode > 57) {
              event.preventDefault();
            }
          }}
        />
        {/* Navigate to the '/Exam' route with the input value as a route parameter */}
        <Link to={`/Exam/${searchTerm}`} className="btn btn-primary mt-3">Search</Link>
      </div>
    </div>
  );
};

export default SearchComponent;

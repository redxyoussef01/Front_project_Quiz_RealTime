import React, { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'; 
import { useAuth } from './AuthContext';
import './loginR.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function App() {

 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const { setAuthenticatedUserId  } = useAuth();
  const navigate = useNavigate();

 const handleLogin = async () => {
  try {
    // Validate inputs
    if (!email || !password) {
      setLoginMessage('Please enter your email and password');
      return;
    }

    // Make the API request using Axios
    const response = await axios.post('http://localhost:4000/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Handle API request errors
    if (!response.data) {
      setLoginMessage(`Error: ${response.statusText}`);
      console.error(response.statusText);
      return;
    }

    // Parse the response data
    const data = response.data;

    // Set the authenticated user ID in the context
    setAuthenticatedUserId(data.userId);
    
     const destination = data.type === 'student' ? '/student' : '/';

navigate(destination, {
  state: { userId: data.userId, groupId: data.groupId, isConnected: true, type: data.type }
});

  
    // Redirect or perform other actions for successful login
  } catch (error) {
    // Handle errors
    setLoginMessage('Error during login. Please try again.');
    console.error('Error during login:', error.message);
  }
};
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"  value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
             {loginMessage && (
            <span className="text-danger mt-2 d-block text-center">{loginMessage}</span>
          )}

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin}>Login</MDBBtn>

            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger"><Link to="/sign">Register</Link> </a></p>
          </div>

        </MDBCol>

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">


        

      </div>

    </MDBContainer>
  );
}

export default App;
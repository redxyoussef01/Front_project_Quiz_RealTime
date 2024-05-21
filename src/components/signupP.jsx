import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link and useLocation from React Router
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';


const SignupForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/professeur', formData);
      console.log('Student created:', response.data);
      // Clear form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });

    
    } catch (error) {
      console.error('Error creating student:', error.message);
      console.log(formData);
      // Handle error
    }
  };

  return (
    <MDBCardBody className='p-5 text-center'>
      <h2 className="fw-bold mb-5">Sign up now</h2>

      <MDBRow>
        <MDBCol col='6'>
          <MDBInput wrapperClass='mb-4'
              label='First name'
              id='firstName'
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required/>
        </MDBCol>

        <MDBCol col='6'>
          <MDBInput wrapperClass='mb-4'
              label='Last name'
              id='lastName'
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required/>
        </MDBCol>
      </MDBRow>

      <MDBInput  wrapperClass='mb-4'
          label='Email'
          id='email'
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required/>
      <MDBInput wrapperClass='mb-4'
          label='Password'
          id='password'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required/>

      <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}><Link to="/login">sign up</Link></MDBBtn>

    </MDBCardBody>
  );
};

const App = () => {
  return (
    <MDBContainer fluid>
      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <SignupForm />
      </MDBCard>
    </MDBContainer>
  );
};

export default App;
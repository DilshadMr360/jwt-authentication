import React, { useContext, useState } from 'react';
import './Register.css'; // Import custom CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import navigate
import {StoreContext} from '../../context/storeContext';

const Register = () => {
  const { setUserDetails } = useContext(StoreContext); 
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "", // fixed typo: "passwrod" to "password"
  });
  const navigate = useNavigate(); // For navigation

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Register Data:', data); // Check if values are coming
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', data);
      console.log('hiiii',response.data); // all values coming include success, maesasge, token and user
      if (response.data.success) {
          localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
        setUserDetails(response.data.user);
        console.log('got the userDetials to send context api ', response.data.user)
        navigate('/'); // Navigate to login if registration is successful
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <input
          type="text"
          name="name" // Added name attribute for controlled input
          placeholder="Name"
          className="input-field"
          value={data.name}
          onChange={onChangeHandler}
        />
        <input
          type="email"
          name="email" // Added name attribute for controlled input
          placeholder="Email"
          className="input-field"
          value={data.email}
          onChange={onChangeHandler}
        />
        <input
          type="password"
          name="password" // Added name attribute for controlled input
          placeholder="Password"
          className="input-field"
          value={data.password}
          onChange={onChangeHandler}
        />
        <button className="register-btn">Register</button>
        <div className="register-footer">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </div>
    </form>
  );
};

export default Register;

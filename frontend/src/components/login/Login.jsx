import React, { useContext, useState } from 'react';
import './Login.css'; // Import custom CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import navigate
import { StoreContext } from '../../context/storeContext';

const Login = () => {
  const { setToken, setUserDetails} = useContext(StoreContext); 
  const [data, setData] = useState({
    email: "",
    password: "", // fixed typo: "passwrod" to "password"
  });
  const navigate = useNavigate(); // For navigation

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Login Data:', data); // Check if values are coming
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      console.log('Response Data:', response.data); // Log the entire response
console.log('User Details:', response.data.user); // Log user details specifically
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userDetails', JSON.stringify(response.data.user));
        setToken(response.data.token); 
        setUserDetails(response.data.user); // Save user details
        console.log('DETAILS', response.data.user)// Save token
        console.log('token', response.data.token)// Save token

        navigate('/home'); // Navigate to home if login is successful
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
        <button className="login-btn">Login</button>
        <div className="login-footer">
          <a href="#">Forgot Password?</a>
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </form>
  );
};

export default Login;

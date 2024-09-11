import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { StoreContext } from '../../context/storeContext';

const Home = () => {
  const { userDetails, setToken, setUserDetails } = useContext(StoreContext);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear token and user details from localStorage and context
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    setToken(null); // Clear token in context
    setUserDetails({}); // Clear userDetails in context
    
    // Navigate back to login page
    navigate('/');
  };

  return (
    <div>
      {userDetails.name ? (
        <div>
          <h2>Welcome, {userDetails.name}</h2>
          <button onClick={handleLogout}>Logout</button> {/* Add Logout button */}
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default Home;

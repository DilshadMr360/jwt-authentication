import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreProvider from './context/storeContext'; // Import the StoreProvider
import Login from '../src/components/login/Login';
import Home from '../src/components/home/Home';
import Register from '../src/components/register/Register';
import ProtectedRoute from '../src/components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<Home /> } /> */}
          <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
          {/* Other routes */}
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;

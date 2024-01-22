import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import VendorForm from './VendorForm';
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedHasSubmittedForm = localStorage.getItem('hasSubmittedForm');

    if (storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));

      // Check if the user has submitted the form
      if (storedHasSubmittedForm) {
        setHasSubmittedForm(true);
        setIsNewUser(false); // Old user
      } else {
        setIsNewUser(true); // New user
      }
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setIsLoggedIn(true);
    setUserData(decoded);
    localStorage.setItem('userData', JSON.stringify(decoded));

    // Check if the user has submitted the form
    const storedHasSubmittedForm = localStorage.getItem('hasSubmittedForm');
    if (storedHasSubmittedForm) {
      setHasSubmittedForm(true);
      setIsNewUser(false); // Old user
    } else {
      setIsNewUser(true); // New user
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Send the form data to your server for storage
      await axios.post('http://localhost:3000/api/vendors', formData);
      setHasSubmittedForm(true);
      localStorage.setItem('hasSubmittedForm', 'true');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle form submission error gracefully
    }
  };

  const handleLogout = () => {
    googleLogout();
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('hasSubmittedForm');
  };

  return (
    <div > 
      {isLoggedIn ? (
        <div>
          {hasSubmittedForm ? (
            <div>
              <h1>Welcome back, {userData.name}!</h1>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <h1>Hello, {userData.name}!</h1>
              {isNewUser ? (
                <div>
                 
                  <VendorForm onSubmit={handleFormSubmit} />
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div>
              
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className='container'> 
        <h1>Welcome to Vendor</h1>
        <center><GoogleLogin className='login'
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Login Failed')}
        /></center></div>
      )}
      
    </div>
  );
}

export default App;

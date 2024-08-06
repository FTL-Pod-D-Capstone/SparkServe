import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const CombinedAuthContext = createContext();

export const CombinedAuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({
    isAuthenticated: localStorage.getItem("isUserAuthenticated") === "true",
    user: null,
    loading: true
  });

  const [orgAuth, setOrgAuth] = useState({
    isAuthenticated: localStorage.getItem("isOrgAuthenticated") === "true",
    org: null,
    loading: true
  });

  useEffect(() => {
    checkUserAuth();
    checkOrgAuth();
  }, []);

  const checkUserAuth = async () => {
    const userId = localStorage.getItem('userId');
    
    if (userAuth.isAuthenticated && userId) {
      try {
        const response = await axios.get(`${baseUrl}/users/${userId}`);
        setUserAuth({
          isAuthenticated: true,
          user: response.data,
          loading: false
        });
      } catch (err) {
        console.error(`Error getting User:`, err);
        setUserAuth({ isAuthenticated: false, user: null, loading: false });
      }
    } else {
      setUserAuth(prev => ({ ...prev, loading: false }));
    }
  };

  const checkOrgAuth = async () => {
    const organizationId = localStorage.getItem('organizationId');
    
    if (orgAuth.isAuthenticated && organizationId) {
      try {
        const response = await axios.get(`${baseUrl}/orgs/${organizationId}`);
        setOrgAuth({
          isAuthenticated: true,
          org: response.data,
          loading: false
        });
      } catch (err) {
        console.error(`Error getting Organization:`, err);
        setOrgAuth({ isAuthenticated: false, org: null, loading: false });
      }
    } else {
      setOrgAuth(prev => ({ ...prev, loading: false }));
    }
  };

  const updateUserProfilePicture = (profilePicture) => {
    setUserAuth(prev => ({
      ...prev,
      user: { ...prev.user, profilePicture }
    }));
  };

  const updateOrgProfilePicture = (pictureUrl) => {
    setOrgAuth(prev => ({
      ...prev,
      org: { ...prev.org, pictureUrl }
    }));
  };

  return (
    <CombinedAuthContext.Provider value={{ 
      userAuth, 
      setUserAuth, 
      orgAuth, 
      setOrgAuth, 
      checkUserAuth,
      checkOrgAuth,
      updateUserProfilePicture,
      updateOrgProfilePicture
    }}>
      {children}
    </CombinedAuthContext.Provider>
  );
};
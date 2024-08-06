// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const baseUrl = import.meta.env.VITE_BACKEND_URL;

// export const CombinedAuthContext = createContext();

// export const CombinedAuthProvider = ({ children }) => {
//   const [userAuth, setUserAuth] = useState({
//     isAuthenticated: false,
//     user: null,
//     loading: true
//   });

//   const [orgAuth, setOrgAuth] = useState({
//     isAuthenticated: false,
//     org: null,
//     loading: true
//   });

//   useEffect(() => {
//     const checkUserAuth = async () => {
//       const authStatus = localStorage.getItem("isUserAuthenticated");
//       const userId = localStorage.getItem('userId');
      
//       if (authStatus === "true" && userId) {
//         try {
//           const response = await axios.get(`${baseUrl}/users/${userId}`);
//           setUserAuth({
//             isAuthenticated: true,
//             user: response.data,
//             loading: false
//           });
//         } catch (err) {
//           console.error(`Error getting User:`, err);
//           setUserAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
//         }
//       } else {
//         setUserAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
//       }
//     };

//     const checkOrgAuth = async () => {
//       const authStatus = localStorage.getItem("isOrgAuthenticated");
//       const orgId = localStorage.getItem('orgId');
      
//       if (authStatus === "true" && orgId) {
//         try {
//           const response = await axios.get(`${baseUrl}/orgs/${orgId}`);
//           setOrgAuth({
//             isAuthenticated: true,
//             org: response.data,
//             loading: false
//           });
//         } catch (err) {
//           console.error(`Error getting Organization:`, err);
//           setOrgAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
//         }
//       } else {
//         setOrgAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
//       }
//     };

//     checkUserAuth();
//     checkOrgAuth();
//   }, []);

//   return (
//     <CombinedAuthContext.Provider value={{ userAuth, setUserAuth, orgAuth, setOrgAuth }}>
//       {children}
//     </CombinedAuthContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const CombinedAuthContext = createContext();

export const CombinedAuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  const [orgAuth, setOrgAuth] = useState({
    isAuthenticated: false,
    org: null,
    loading: true
  });

  useEffect(() => {
    checkUserAuth();
    checkOrgAuth();
  }, []);

  const checkUserAuth = async () => {
    const authStatus = localStorage.getItem("isUserAuthenticated");
    const userId = localStorage.getItem('userId');
    
    if (authStatus === "true" && userId) {
      try {
        const response = await axios.get(`${baseUrl}/users/${userId}`);
        setUserAuth({
          isAuthenticated: true,
          user: response.data,
          loading: false
        });
      } catch (err) {
        console.error(`Error getting User:`, err);
        setUserAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
      }
    } else {
      setUserAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
    }
  };

  const checkOrgAuth = async () => {
    const authStatus = localStorage.getItem("isOrgAuthenticated");
    const orgId = localStorage.getItem('orgId');
    
    if (authStatus === "true" && orgId) {
      try {
        const response = await axios.get(`${baseUrl}/orgs/${orgId}`);
        setOrgAuth({
          isAuthenticated: true,
          org: response.data,
          loading: false
        });
      } catch (err) {
        console.error(`Error getting Organization:`, err);
        setOrgAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
      }
    } else {
      setOrgAuth(prev => ({ ...prev, loading: false, isAuthenticated: false }));
    }
  };

  const updateUserProfilePicture = (profilePicture) => {
    setUserAuth(prev => ({
      ...prev,
      user: { ...prev.user, profilePicture }
    }));
  };

  return (
    <CombinedAuthContext.Provider value={{ 
      userAuth, 
      setUserAuth, 
      orgAuth, 
      setOrgAuth, 
      checkUserAuth,
      updateUserProfilePicture 
    }}>
      {children}
    </CombinedAuthContext.Provider>
  );
};
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLandingPage from '../Components/Pages/UserLandingPage/UserLandingPage';
import WelcomePage from '../Components/Pages/WelcomePage/WelcomePage';
import Calendar from '../Components/Pages/Calendar/Calendar';
import MapPage from '../Components/Pages/MapPage/MapPage';
import OrganizationWelcomePage from '../Components/Pages/OrganizationWelcomePage/OrganizationWelcomePage';
import OrganizationLandingPage from '../Components/Pages/OrganizationLandingpage/OrganizationLandingPage';
import UserLogInPage from '../Components/Pages/UserLogInPage/UserLogInPage';
import UserSignUpPage from '../Components/Pages/UserSignUpPage/UserSignUpPage';
import OrganizationSignInPage from '../Components/Pages/OrganizationSignInPage/OrganizationSignInPage'; 
import OrganizationSignUpPage from '../Components/Pages/OrganizationSignUpPage/OrganizationSignUpPage';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/UserLandingPage" element={<UserLandingPage />} />
      <Route path="/OrganizationWelcomePage" element={<OrganizationWelcomePage />} />
      <Route path="/OrganizationLandingPage" element={<OrganizationLandingPage />} />
      <Route path="/UserLogInPage" element={<UserLogInPage />} /> 
      <Route path="/UserSignUpPage" element={<UserSignUpPage />} /> 
      <Route path="/OrganizationSignUpPage" element={<OrganizationSignUpPage />} />
      <Route path="OrganizationSignInPage" element={<OrganizationSignInPage/>} />
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/Map" element={<MapPage />} />
    </Routes>
  );
};

export default PageRoutes;


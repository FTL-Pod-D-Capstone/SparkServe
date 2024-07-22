import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLandingPage from '../Components/Pages/UserLandingPage/UserLandingPage';
import WelcomePage from '../Components/Pages/WelcomePage/WelcomePage';
import Calendar from '../Components/Pages/Calendar/Calendar';
import MapPage from '../Components/Pages/MapPage/MapPage';
import OrgWelcomePage from '../Components/Pages/OrgWelcomePage/OrgWelcomePage';
import OrgLandingPage from '../Components/Pages/OrgLandingpage/OrgLandingPage';
import LogInPage from '../Components/Pages/LogInPage/LogInPage';
import SignUpPage from '../Components/Pages/SignUpPage/SignUpPage'; // Import the SignUpPage component

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/UserLandingPage" element={<UserLandingPage />} />
      <Route path="/OrgWelcomePage" element={<OrgWelcomePage />} />
      <Route path="/OrgLandingPage" element={<OrgLandingPage />} />
      <Route path="/LogInPage" element={<LogInPage />} /> 
      <Route path="/SignUpPage" element={<SignUpPage />} /> {/* Ensure the path and component are correctly linked */}
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/Map" element={<MapPage />} />
    </Routes>
  );
};

export default PageRoutes;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLandingPage from '../Components/Pages/UserLandingPage/UserLandingPage';
import WelcomePage from '../Components/Pages/WelcomePage/WelcomePage';
import Calendar from '../Components/Pages/Calendar/Calendar';
import MapPage from '../Components/Pages/MapPage/MapPage';
import OrgWelcomePage from '../Components/Pages/OrgWelcomePage/OrgWelcomePage';
import OrgLandingPage from '../Components/Pages/OrgLandingpage/OrgLandingPage';
import UserLogInPage from '../Components/Pages/UserLogInPage/UserLogInPage';
import UserSignUpPage from '../Components/Pages/UserSignUpPage/UserSignUpPage';
import VolunOppPage from '../Components/Pages/VolunteerOpportunity/VolunteerOppurtunityPage'; 

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/UserLandingPage" element={<UserLandingPage />} />
      <Route path="/OrgWelcomePage" element={<OrgWelcomePage />} />
      <Route path="/OrgLandingPage" element={<OrgLandingPage />} />
      <Route path="/UserLogInPage" element={<UserLogInPage />} /> 
      <Route path="/UserSignUpPage" element={<UserSignUpPage />} /> 
      <Route path="/Calendar" element={<Calendar />} />
      <Route path="/Map" element={<MapPage />} />
      <Route path="/opportunity/:opportunityId" element={<VolunOppPage />} />
    </Routes>
  );
};

export default PageRoutes;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NRLandingPage from '../Components/Pages/NonRegisLandingPage/NRLandingPage';
import WelcomePage from '../Components/Pages/WelcomePage/WelcomePage';
import OrgWelcomePage from '../Components/Pages/OrgWelcomePage/OrgWelcomePage';
import Calendar from '../Components/Pages/Calendar/Calendar';
import MapPage from '../Components/Pages/MapPage/MapPage'; 
import OrgLandingPage from '../Components/Pages/OrgLandingpage/OrgLandingPage';

const PageRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/NRLandingPage" element={<NRLandingPage/>} />
        <Route path= "OrgWelcomePage" element={<OrgWelcomePage/>} />
        <Route path="Calendar" element={<Calendar/>} />
        <Route path="Map" element={<MapPage />} /> 
        <Route path="/OrgLandingPage" element={<OrgLandingPage />} />
    </Routes>
    );
};

export default PageRoutes;

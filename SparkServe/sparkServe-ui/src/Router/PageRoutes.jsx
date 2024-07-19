import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NRLandingPage from '../Components/Pages/NonRegisLandingPage/NRLandingPage';
import WelcomePage from '../Components/Pages/WelcomePage/WelcomePage';
import OrgWelcomePage from '../Components/Pages/OrgWelcomePage/OrgWelcomePage';
import Calendar from '../Components/Pages/Calendar/Calendar';
import MapPage from '../Components/Pages/MapPage/MapPage'; 

const PageRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/NRLandingPage" element={<NRLandingPage/>} />
        <Route path= "OrgWelcomePage" element={<OrgWelcomePage/>} />
        <Route path="Calendar" element={<Calendar/>} />
        <Route path="Map" element={<MapPage />} /> 
    </Routes>
    );
};

export default PageRoutes;

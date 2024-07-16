import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NRLandingPage from '../Components/Pages/NonRegisLandingPage/NRLandingPage';
import WelcomePage from '../Components/Pages/WelcomePage/WelcomePage';

const PageRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/NRLanding" element={<NRLandingPage />} />
    </Routes>
    );
};

export default PageRoutes;
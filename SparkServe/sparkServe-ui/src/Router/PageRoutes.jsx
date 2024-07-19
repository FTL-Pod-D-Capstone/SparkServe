import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NRLandingPage from '../Components/Pages/NonRegisLandingPage/NRLandingPage';
import WelcomePage from '../Components/Pages/WelcomePage/WelcomePage';
import VolunOppPage from '../Components/Pages/VolunteerOpptunity/VolunOppPage';
import Calendar from '../Components/Pages/Calendar/Calendar';
import UserLandingPage from '../Components/Pages/UserPages/UserLanding/UserLandingPage';
import UserProfilePage from '../Components/Pages/UserPages/UserProfile/UserProfilePage';
import MapPage from '../Components/Pages/MapPage/MapPage'
import OrgWelcomePage from '../Components/Pages/OrgWelcomePage/OrgWelcomePage'

const PageRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/NRLandingPage" element={<NRLandingPage/>} />
        <Route path="/UserLanding" element={<UserLandingPage/>} />
        <Route path="/Calander" element={<Calendar/>} />
        <Route path="/ProfilePage" element={<UserProfilePage/>} />
        <Route path="/Map" element={<MapPage/>} />
        <Route path="/OrgWelcomePage" element={<OrgWelcomePage/>} />
        <Route path="/Calendar" element={<Calendar/>} />

        <Route path="/post/:id" element={<VolunOppPage/>} />

    </Routes>
    );
};

export default PageRoutes;

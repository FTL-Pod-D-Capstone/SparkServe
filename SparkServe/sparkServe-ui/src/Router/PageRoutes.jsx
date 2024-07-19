import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NRLandingPage from '../Pages/NonRegisLandingPage/NRLandingPage';
import WelcomePage from '../Pages/WelcomePage/WelcomePage';
import VolunOppPage from '../Pages/VolunteerOpptunity/VolunOppPage';
import CalendarApp from '../Components/Calendar/Calendar';
import UserLandingPage from '../Pages/UserPages/UserLanding/UserLandingPage';
import UserProfilePage from '../Pages/UserPages/UserProfile/UserProfilePage';

const PageRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/NRLandingPage" element={<NRLandingPage/>} />
        <Route path="/UserLanding" element={<UserLandingPage/>} />
        <Route path="/Calander" element={<CalendarApp/>} />
        <Route path="/ProfilePage" element={<UserProfilePage/>} />

        <Route path="/post/:id" element={<VolunOppPage/>} />

    </Routes>
    );
};

export default PageRoutes;

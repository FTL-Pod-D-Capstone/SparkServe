import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
// import UserRegistration from "../UserRegistration/UserRegistration"
import PageRoutes from '../Router/PageRoutes';
// import WelcomePage from '../Components/Pages/WelcomePage';
// import ThreeDB from '../Components/ThreeDB/ThreeDB';
// import UserNavBar from '../Components/UserNavBar/UserNavBar';
// import WelcomeCard from '../Components/WelcomeCard/WelcomeCard';
// import ProfileCards from '../Components/ProfileCards/ProfileCards';


function App() {
  return (
    <div>
      {/* <WelcomePage /> */}
      <Router>
      <PageRoutes />
    </Router>
    </div>
  );
}

export default App;
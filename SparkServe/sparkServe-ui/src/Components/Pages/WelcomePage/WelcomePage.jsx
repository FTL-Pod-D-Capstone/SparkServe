import React from 'react';
import User3DBackground from '../../User3DBackground/User3DBackground';
import UserNavBar from '../../UserNavBar/UserNavBar'; 
import WelcomeCard from '../../WelcomeCard/WelcomeCard';
import AppFeatures from '../../AppFeatures/AppFeatures';
import ProfileCards from '../../ProfileCards/ProfileCards';


const WelcomePage = () => {
  return (
    <div>
      <UserNavBar />
      <User3DBackground/>
      <WelcomeCard />
      <AppFeatures />
      <ProfileCards />
    </div>
  );
}

export default WelcomePage;

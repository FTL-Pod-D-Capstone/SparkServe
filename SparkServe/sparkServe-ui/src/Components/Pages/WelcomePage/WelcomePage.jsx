import React from 'react';
import UserNavBarNR from '../../UserNavBarNR/UserNavBarNR'; 
import ThreeDB from '../../ThreeDB/ThreeDB';
import WelcomeCard from '../../WelcomeCard/WelcomeCard';
import AppFeatures from '../../AppFeatures/AppFeatures';
import ProfileCards from '../../ProfileCards/ProfileCards';


const WelcomePage = () => {
  return (
    <div>
      <UserNavBarNR />
      <ThreeDB />
      <WelcomeCard />
      <AppFeatures />
      <ProfileCards />
    </div>
  );
}

export default WelcomePage;

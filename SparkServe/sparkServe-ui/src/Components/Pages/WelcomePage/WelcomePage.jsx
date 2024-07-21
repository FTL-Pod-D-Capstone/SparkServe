import React from 'react';
import UserNavBar from '../../UserNavBar/UserNavBar'; 
import ThreeDB from '../../ThreeDB/ThreeDB';
import WelcomeCard from '../../WelcomeCard/WelcomeCard';
import AppFeatures from '../../AppFeatures/AppFeatures';
import ProfileCards from '../../ProfileCards/ProfileCards';


const WelcomePage = () => {
  return (
    <div>
      <UserNavBar />
      <ThreeDB />
      <WelcomeCard />
      <AppFeatures />
      <ProfileCards />
    </div>
  );
}

export default WelcomePage;

import React from 'react';
import UserNavBarNR from '../../Components/UserNavBarNR/UserNavBarNR'; 
import ThreeDB from '../../Components/ThreeDB/ThreeDB';
import WelcomeCard from '../../Components/WelcomeCard/WelcomeCard';
import ProfileCards from '../../Components/ProfileCards/ProfileCards';

const WelcomePage = () => {
  return (
    <div>
      <UserNavBarNR />
      <ThreeDB />
      <WelcomeCard />
      <ProfileCards />
    </div>
  );
}

export default WelcomePage;

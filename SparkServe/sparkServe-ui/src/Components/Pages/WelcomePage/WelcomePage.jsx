import React from 'react';
import UserNavBar from '../../UserNavBar/UserNavBar'; 
import ThreeDB from '../../ThreeDB/ThreeDB';
import WelcomeCard from '../../WelcomeCard/WelcomeCard';
import ProfileCards from '../../ProfileCards/ProfileCards';


const WelcomePage = () => {
  return (
    <div>
      <UserNavBar />
      <ThreeDB />
      <WelcomeCard />
      <ProfileCards />
    </div>
  );
}

export default WelcomePage;

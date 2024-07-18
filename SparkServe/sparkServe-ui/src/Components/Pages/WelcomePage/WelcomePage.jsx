import React from 'react';
import UserNavBar from '../../UserNavBar/UserNavBar'; 
import ThreeDB from '../../ThreeDB/ThreeDB';
import OrgThreeDB from '../../OrgThreeDB/OrgThreeDB';
import WelcomeCard from '../../WelcomeCard/WelcomeCard';
import ProfileCards from '../../ProfileCards/ProfileCards';
import Footer from '../../Footer/Footer';

const WelcomePage = () => {
    console.log("welcome Page")
  return (
    <div>
      <UserNavBar />
      <ThreeDB />
      {/* <OrgThreeDB currentPage={'orgWelcomePage'}/> */}
      <WelcomeCard />
      <ProfileCards />
      <Footer />
    </div>
  );
}

export default WelcomePage;

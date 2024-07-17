import React from 'react';
import OrgThreeDB from '../../OrgThreeDB/OrgThreeDB';
import OrgNavBar from '../../OrgNavBar/OrgNavBar'; 
import OrgWelcomeCard from '../../OrgWelcomeCard/OrgWelcomeCard';

const WelcomePage = () => {
  return (
    <div>
    <OrgThreeDB />
      <OrgNavBar />
      <OrgWelcomeCard />
    </div>
  );
}

export default WelcomePage;
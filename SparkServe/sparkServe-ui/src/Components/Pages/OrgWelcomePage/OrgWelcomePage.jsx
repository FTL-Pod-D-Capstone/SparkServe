import React from 'react';
import OrgThreeDB from '../OrgWelcomePage/OrgWelcomePage';
import ThreeDB from '../../ThreeDB/ThreeDB';
import OrgNavBar from '../../OrgNavBar/OrgNavBar'; 
import OrgWelcomeCard from '../../OrgWelcomeCard/OrgWelcomeCard';

const OrgWelcomePage = () => {
    console.log('org welcome page')
  return (
    <div>
      <OrgNavBar />
      {/* <OrgThreeDB currentPage={'orgWelcomePage'}/> */}
      <ThreeDB />
      <OrgWelcomeCard />
    </div>
  );
}

export default OrgWelcomePage;
import React from 'react';
import OrgNavBar from '../../OrgNavBar/OrgNavBar';
import OrgWelcomeCard from '../../OrgWelcomeCard/OrgWelcomeCard';
import backgroundImage from '../../../assets/SparkServe-Organization-Background.jpg'; 

const OrgWelcomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh', 
    position: 'relative',
  };

  return (
    <div style={backgroundStyle}>
      <OrgNavBar />
      <OrgWelcomeCard />
    </div>
  );
}

export default OrgWelcomePage;

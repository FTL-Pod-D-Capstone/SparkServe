import React from 'react';
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar';
import OrganizationWelcomeCard from '../../OrganizationWelcomeCard/OrganizationWelcomeCard';
import backgroundImage from '../../../assets/SparkServe-Organization-Background.jpg'; 

const OrganizationWelcomePage = () => {
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
      <OrganizationNavBar />
      <OrganizationWelcomeCard />
    </div>
  );
}

export default OrganizationWelcomePage;

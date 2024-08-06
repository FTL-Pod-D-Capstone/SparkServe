import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import User3DBackground from '../../User3DBackground/User3DBackground';
import UserNavBar from '../../UserNavBar/UserNavBar';
import WelcomeCard from '../../WelcomeCard/WelcomeCard';
import AppFeatures from '../../AppFeatures/AppFeatures';
import ProfileCards from '../../ProfileCards/ProfileCards';
import '../WelcomePage/WelcomePage.css';

const WelcomePage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='welcome'>
      <UserNavBar />
      <User3DBackground/>
      <WelcomeCard />
      <AppFeatures />
      <ProfileCards />
    </div>
  );
}

export default WelcomePage;
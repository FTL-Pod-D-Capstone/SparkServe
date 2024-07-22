import React from 'react'
import Footer from '../../../Footer/Footer'
import UserNavBar from '../../../../Components/UserNavBar/UserNavBar'
import { Typography } from '@mui/material'
// import '../UserLanding/UserLandingPage.css'
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'

const UserProfilePage = () => {
    const navigate = useNavigate(); 

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <UserNavBar/>
            <Typography>
            <div className='TopBlock'>
            <IconButton onClick={handleGoBack} aria-label="go back">
                <ArrowBack />
            </IconButton>
                <div> Profile Page</div>
                <div>Profile Information</div>
            </div>
            </Typography>

            <Footer/>
        </>
    )
}

export default UserProfilePage
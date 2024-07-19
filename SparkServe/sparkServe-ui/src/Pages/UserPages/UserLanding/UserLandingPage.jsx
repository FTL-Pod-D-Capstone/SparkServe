import React from 'react'
import UserNavBarREG from '../../../Components/UserNavBarREG/UserNavBarREG'
import Footer from '../../../Components/Footer/Footer'
import VolOppContainer from '../../../Components/VolCardContainer/VolOppContainer'
import { Typography } from '@mui/material'


const UserLandingPage = () => {
    return (
        <>
            <UserNavBarREG/>
            <div>
                <Typography
                variant="h3"
                sx={{ mt: 8,
                }}
                >
                    Hello, User
                </Typography>
            </div>
            <VolOppContainer
            />
            <Footer/>
        </>    
    )
}

export default UserLandingPage
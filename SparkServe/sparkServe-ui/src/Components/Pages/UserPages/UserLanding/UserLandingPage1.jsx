import React from 'react'
import UserNavBarREG from '../../../UserNavBarREG/UserNavBarREG'
import Footer from '../../../Footer/Footer'
import VolOppContainer from '../../../VolCardContainer/VolOppContainer'
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
import React from 'react'
import UserNavBar from '../../Components/UserNavBarNR/UserNavBarNR'
import Footer from '../../Components/Footer/Footer'
import VolOppContainer from '../../Components/VolCardContainer/VolOppContainer'

const NRLandingPage = () => {
    return (
        <>
            <UserNavBar/>
            <VolOppContainer
            backgroundColor="e6e6fa"
            />
            <Footer/>
        </>
    )
}

export default NRLandingPage
import React from 'react'
import Navbar from '../../Navbar/Navbar'
import { Container, Grid } from '@mui/material'
import Footer from '../../Footer/Footer'


const NRLandingPage = () => {
    return (
        <>
            <Navbar/>
            <Container>
                <div style={{ padding: '20px', background: 'lightblue' }}>
                    <p>Hello World</p>
                </div>
                <Grid>
                    Many cards
                </Grid>
            </Container>
            <Footer/>
        </>
    )
}

export default NRLandingPage
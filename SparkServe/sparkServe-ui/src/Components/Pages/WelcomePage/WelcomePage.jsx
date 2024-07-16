import React from 'react'
import { Container } from '@mui/material';
import Navbar from '../../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material';
import PageRoutes from '../../../Router/PageRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

const WelcomePage = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`./NRLandingPage`)
    }

    return (
        <>

            <div>
                This is navbar area
            </div>
            <Container component="main" sx={{ mt: 4, mb: 4 }}>
            <p>About us section
                
                <Button variant="contained" onClick={handleClick}>
                    Welcome
                </Button>

            </p>
            </Container>
            <div>
                This is footer area
            </div>
        </>

    )
}

export default WelcomePage
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBarNR from '../../UserNavBarNR/UserNavBarNR';
import { Container, Grid, Button, Box, IconButton } from '@mui/material';
import Footer from '../../Footer/Footer';
import Cards from '../../Cards/Cards';
import { posts } from '../../DumyData/DummyData';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VolOppContainer from '../../VolCardContainer/VolOppContainer'


const NRLandingPage = () => {
    const navigate = useNavigate();

    const handleMapClick = () => {
        navigate('/Map');
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <>
            <UserNavBarNR />
            <Box
                sx={{
                    background: 'linear-gradient(to bottom, #4685f6, white)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Container>
                    <VolOppContainer/>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 2,
                            marginBottom: 2,
                        }}
                    >
                        <IconButton
                            color="primary"
                            onClick={handleBackClick}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginBottom: 2 }}
                        onClick={handleMapClick}
                    >
                        Search by Map
                    </Button>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default NRLandingPage;



import React, { useState, useEffect } from 'react';
import UserNavBar from '../../UserNavBar/UserNavBar';
import Footer from '../../Footer/Footer';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CardMedia, Button, CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const VolunOppPage = () => {
    const { opportunityId } = useParams();
    const [opportunity, setOpportunity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [organizationName, setOrganizationName] = useState('');

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    // useEffect(() => {
    //     const getOpportunity = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get(`https://project-1-uljs.onrender.com/opps/${opportunityId}`);
    //             setOpportunity(response.data);
    //             setIsLoading(false);
    //         } catch (err) {
    //             console.error('Error fetching specified opportunity:', err);
    //             setError('Failed to load the opportunity details.');
    //             setIsLoading(false);
    //         }
    //     };
    //     if (opportunityId) {
    //         getOpportunity();
    //     }
    //     getOpportunity();
    // }, [opportunityId]);

    useEffect(() => {
        const getOpportunity = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/opps/${opportunityId}`);
                setOpportunity(response.data);

                if (response.data.organizationId) {
                    const orgResponse = await axios.get(`https://project-1-uljs.onrender.com/orgs/${response.data.organizationId}`);
                    setOrganizationName(orgResponse.data.name);
                }

                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching specified opportunity:', err);
                setError('Failed to load the opportunity details.');
                setIsLoading(false);
            }
        };

        if (opportunityId) {
            getOpportunity();
        }
    }, [opportunityId]);

    return (
        <>
            <UserNavBar />
            <Box
                sx={{
                    backgroundImage: 'linear-gradient(rgb(180, 200, 255), rgb(255, 255, 255))',
                    backgroundSize: '100% 50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'white',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 1,
                    width: '100%',
                }}
            >
                <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, mt: 8 }}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : !opportunity ? (
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" gutterBottom>Post Not Found :(</Typography>
                            <Button variant="contained" color="primary" component={Link} to="/UserLandingPage">
                                Back to Opportunities!
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mb: 2 }}>
                                <ArrowBack />
                            </IconButton>
                            <Typography variant="h4" gutterBottom>{opportunity.title}</Typography>
                            <CardMedia
                                component="img"
                                height="300"
                                image={opportunity.pictureUrl || 'default-image-url'}
                                alt={opportunity.title}
                                sx={{ mb: 2, borderRadius: '8px' }}
                            />
                            <Typography variant="subtitle1" gutterBottom>By {organizationName}</Typography>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Spots Available: {opportunity.spotsAvailable} | Related Cause: {opportunity.relatedCause}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                                About: {opportunity.description}
                            </Typography>
                            <Button variant="contained" color="primary" href='Uhoh'>
                                Sign Up Here!
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default VolunOppPage;
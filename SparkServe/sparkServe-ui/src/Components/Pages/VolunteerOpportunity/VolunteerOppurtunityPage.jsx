import React, { useState, useEffect } from 'react';
import UserNavBar from '../../UserNavBar/UserNavBar';
import Footer from '../../Footer/Footer';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CardMedia, Button, CircularProgress, Grid, Avatar, Divider } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBack, Bookmark, BookmarkBorder } from '@mui/icons-material';
import axios from 'axios';

const VolunOppPage = () => {
    const { opportunityId } = useParams();
    const [opportunity, setOpportunity] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const userId = localStorage.getItem('userId');
    // const baseUrl ="http://localhost:3000";
    
    // const baseUrl ="https://project-1-uljs.onrender.com";
    const baseUrl =import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const getOpportunityAndOrganization = async () => {
            setIsLoading(true);
            try {
                const oppResponse = await axios.get(`${baseUrl}/opps/${opportunityId}`);
                setOpportunity(oppResponse.data);

                if (oppResponse.data.organizationId) {
                    const orgResponse = await axios.get(`${baseUrl}/orgs/${oppResponse.data.organizationId}`);
                    setOrganization(orgResponse.data);
                }

                if (userId) {
                    const bookmarkResponse = await axios.get(`${baseUrl}/bookmarks/users/${userId}/bookmarks`);
                    const checkBookmarked = bookmarkResponse.data.some(bookmark => bookmark.opportunityId === parseInt(opportunityId));
                    setIsBookmarked(checkBookmarked);
                }

                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load the opportunity details.');
                setIsLoading(false);
            }
        };

        if (opportunityId) {
            getOpportunityAndOrganization();
        }
    }, [opportunityId, userId]);

    const toggleBookmark = async () => {
        if (!userId) {
            // Redirect to login or show a message
            return;
        }

        try {
            if (isBookmarked) {
                await axios.delete(`${baseUrl}/bookmarks/users/${userId}/bookmarks/${opportunityId}`);
            } else {
                await axios.post(`${baseUrl}/bookmarks/users/${userId}/bookmarks`, { opportunityId });
            }
            setIsBookmarked(!isBookmarked);
        } catch (err) {
            console.error('Error toggling bookmark:', err);
        }
    };

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
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
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
                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Spots Available: {opportunity.spotsAvailable} | Related Cause: {opportunity.relatedCause}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                                    About: {opportunity.description}
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    href={opportunity.opportunityUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Sign Up Here!
                                </Button>
                                <IconButton onClick={toggleBookmark} sx={{ ml: 2 }}>
                                    {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: '8px', boxShadow: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar
                                            src={organization?.pictureUrl}
                                            alt={organization?.name}
                                            sx={{ width: 60, height: 60, mr: 2 }}
                                        />
                                        <Typography variant="h6">{organization?.name}</Typography>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        {organization?.description || "No description available."}
                                    </Typography>
                                    <Typography variant="body2">
                                        Contact: {organization?.contactEmail}
                                    </Typography>
                                    <Typography variant="body2">
                                        Website: <Link href={organization?.website} target="_blank" rel="noopener noreferrer">{organization?.website}</Link>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default VolunOppPage;
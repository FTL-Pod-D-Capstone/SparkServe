import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, Card, CardMedia, CardContent, Button } from '@mui/material';
import UserNavBar from '../../UserNavBar/UserNavBar';
import Footer from '../../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chatbot from "../../Chatbot/Chatbot";

const baseUrl = import.meta.env.VITE_BACKEND_URL;


const isUserAuthenticated = () => {
  return localStorage.getItem('isUserAuthenticated') === 'true';
};

const UserBookmarksPage = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetchUserData();
            fetchBookmarks();
        } else {
            setError('User ID not found. Please log in.');
            setIsLoading(false);
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/users/${userId}`);
            setUsername(response.data.username);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    const fetchBookmarks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const bookmarksResponse = await axios.get(`${baseUrl}/bookmarks/users/${userId}/bookmarks`);
            const bookmarkIds = bookmarksResponse.data.map(bookmark => bookmark.opportunityId);
            
            const opportunitiesPromises = bookmarkIds.map(id => 
                axios.get(`${baseUrl}/opps/${id}`)
            );
            const opportunitiesResponses = await Promise.all(opportunitiesPromises);
            const bookmarkedOpportunities = opportunitiesResponses.map(response => response.data);
            
            setBookmarks(bookmarkedOpportunities);
        } catch (err) {
            console.error('Error fetching bookmarks:', err);
            setError('Failed to fetch your favorites. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

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
                    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Your Favorites</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {bookmarks.length === 0 ? (
                        <Typography>You haven't favorited any opportunities yet.</Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {bookmarks.map((opportunity) => (
                                <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
                                    <Card 
                                        component={Link} 
                                        to={`/opportunity/${opportunity.opportunityId}`} 
                                        sx={{ 
                                            textDecoration: 'none', 
                                            height: '100%', 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={opportunity.pictureUrl || "https://via.placeholder.com/300x200"}
                                            alt={opportunity.title}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {opportunity.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {opportunity.organization?.name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {opportunity.relatedCause}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>
            

            <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
                <Typography variant="h4" gutterBottom>{username}'s Favorites</Typography>
                {error && <Typography color="error">{error}</Typography>}
                {bookmarks.length === 0 ? (
                    <Box>
                        <Typography>You haven't favorited any opportunities yet.</Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 2 }}
                            onClick={() => navigate('/UserLandingPage')}
                        >
                            Explore Opportunities
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {bookmarks.map((opportunity) => (
                            <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
                                <Card 
                                    component={Link} 
                                    to={`/opportunity/${opportunity.opportunityId}`} 
                                    sx={{ 
                                        textDecoration: 'none', 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={opportunity.pictureUrl || "https://via.placeholder.com/300x200"}
                                        alt={opportunity.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {opportunity.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {opportunity.organization?.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {opportunity.relatedCause}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

            <Footer />
        </>
    );
};

export default UserBookmarksPage;
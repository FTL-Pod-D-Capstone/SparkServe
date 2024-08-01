import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box, Paper } from '@mui/material';
import UserNavBar from '../../UserNavBar/UserNavBar';
import Footer from '../../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const PosterCard = ({ opportunity }) => (
        <Paper
          component={Link}
          to={`/opportunity/${opportunity.opportunityId}`}
          sx={{
            textDecoration: "none",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
            },
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${opportunity.pictureUrl || "https://via.placeholder.com/300x200"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
              },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#ffffff",
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                maxHeight: "4.5em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                zIndex: 1,
              }}
            >
              {opportunity.title}
            </Typography>
          </Box>
          <Box sx={{ p: 2, flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Organization:</strong> {opportunity.organization?.name}
            </Typography>
            {opportunity.dateTime && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Date:</strong> {new Date(opportunity.dateTime).toLocaleString([], {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Cause:</strong> {opportunity.relatedCause}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Spots:</strong> {opportunity.spotsAvailable}
            </Typography>
          </Box>
        </Paper>
    );

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
                    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>{username}'s Favorites</Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {bookmarks.length === 0 ? (
                        <Typography>You haven't favorited any opportunities yet.</Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {bookmarks.map((opportunity) => (
                                <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
                                    <PosterCard opportunity={opportunity} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </Box>

            <Footer />
        </>
    );
};

export default UserBookmarksPage;
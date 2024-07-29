import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import UserNavBar from '../../UserNavBar/UserNavBar';
import Footer from '../../Footer/Footer';
import VolunteerCard from '../../VolunteerCardContainer/VolunteerCardContainer';
import axios from 'axios';
// const baseUrl ="http://localhost:3000";
const baseUrl ="https://project-1-uljs.onrender.com";

const BookmarksPage = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`${baseUrl}users/${userId}/bookmarks`);
                setBookmarks(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching bookmarks:', err);
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchBookmarks();
        }
    }, [userId]);

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
            <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
                <Typography variant="h4" gutterBottom>Your Favorites</Typography>
                {bookmarks.length === 0 ? (
                    <Typography>You haven't favorited any opportunities yet.</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {bookmarks.map((bookmark) => (
                            <Grid item xs={12} sm={6} md={4} key={bookmark.opportunityId}>
                                <VolunteerCard opportunity={bookmark} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default BookmarksPage;
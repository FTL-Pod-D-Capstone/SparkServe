import React, { useState, useEffect } from 'react'
import Footer from '../../Footer/Footer'
import UserNavBar from '../../UserNavBar/UserNavBar'
import { Typography, Grid, Card, CardContent, Avatar, Box, CircularProgress } from '@mui/material'
import { IconButton } from '@mui/material';
import { ArrowBack, FileUpload } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom'
import '../UserProfile/UserProfilePage.css'
import axios from 'axios';
import Upload from './Upload';

const UserProfilePage = () => {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState('');


    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const getUser = async () => {
            console.log('Fetching user data for userId:', id);
            if (!id) {
                console.log('No userId provided');
                setError('No user ID provided');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/users/${id}`);
                console.log('API response:', response.data);
                setUser(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error(`Error getting User:, err`);
                setError(`Failed to load User Info: ${err.message}`);
                setIsLoading(false);
            }
        };

        getUser();
    }, [id]);

    if (isLoading) return <div>Loading... <CircularProgress/></div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>No user data found</div>;

    const handleFileUploaded = async (url) => {
        setPhoto(url);
        try {
            const response = await axios.put(`https://project-1-uljs.onrender.com/users/${id}`, {
                profilePicture: url,
            });
            console.log('User profile updated successfully:', response.data);
        } catch (err) {
            console.error('Failed to update user profile:', err);
        }
    };
    return (
        <>
            <UserNavBar/>


            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mb: 2 }}>
                    <ArrowBack />
                </IconButton>

                <Grid container spacing={3}>
                    {/* Left side - Profile image and name */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar
                                    alt={user.name || 'User'}
                                    src={user.profileImage || "/path-to-default-image.jpg"}
                                    sx={{ width: 200, height: 200, mb: 2 }}
                                />
                                <Upload onUploaded={handleFileUploaded} />

                                <Typography variant="h5" component="div">
                                    {user.username || 'Unknown User'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right side - User information */}
                    <Grid item xs={12} md={8}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Top half - Bio */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    Bio
                                </Typography>
                                <Typography variant="body1">
                                    {user.bio || 'No bio available'}
                                </Typography>
                            </CardContent>

                            {/* Bottom half - Contact information */}
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Contact Information
                                </Typography>
                                <Typography variant="body1">Email: {user.email || 'Not provided'}</Typography>
                                <Typography variant="body1">Phone: {user.phone || 'Not provided'}</Typography>
                                <Typography variant="body1">Address: {user.address || 'Not provided'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Footer/>
        </>
    )
}

export default UserProfilePage
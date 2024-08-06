import React, { useState, useEffect, useContext } from 'react';
import Footer from '../../Footer/Footer';
import UserNavBar from '../../UserNavBar/UserNavBar';
import { Typography, Grid, Card, CardContent, Avatar, Box, CircularProgress, Button, TextField, Snackbar, Alert, Container } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import UserUpload from './UserUpload';
import { CombinedAuthContext } from '../../CombinedAuthContext/CombinedAuthContext';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
  },
}));

const ProfileImage = styled('div')({
  position: 'relative',
  width: 200,
  height: 200,
  margin: '0 auto',
  marginBottom: 20,
});

const StyledAvatar = styled(Avatar)({
  width: '100%',
  height: '100%',
});

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { userAuth, setUserAuth, updateUserProfilePicture } = useContext(CombinedAuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const getUser = async () => {
            if (!id) {
                setError('No user ID provided');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get(`${baseUrl}/users/${id}`);
                setUserAuth(prev => ({
                    ...prev,
                    user: response.data,
                    loading: false,
                    isAuthenticated: true
                }));
                setEditedUser(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error(`Error getting User:`, err);
                setError(`Failed to load User Info: ${err.message}`);
                setIsLoading(false);
            }
        };

        getUser();
    }, [id, setUserAuth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${baseUrl}/users/${id}`, editedUser);
            setUserAuth(prev => ({
                ...prev,
                user: response.data,
                loading: false,
                isAuthenticated: true
            }));
            setIsEditing(false);
            setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
        } catch (err) {
            console.error('Failed to update user profile:', err);
            if (err.response && err.response.status === 400) {
                if (err.response.data.error.includes('email')) {
                    setSnackbar({ open: true, message: 'Email already in use', severity: 'error' });
                } else if (err.response.data.error.includes('phone')) {
                    setSnackbar({ open: true, message: 'Phone number already in use', severity: 'error' });
                } else {
                    setSnackbar({ open: true, message: err.response.data.error, severity: 'error' });
                }
            } else {
                setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
            }
        }
    };

    const handleFileUploaded = async (url) => {
        updateUserProfilePicture(url);
        try {
            const response = await axios.put(`${baseUrl}/users/${id}`, {
                ...editedUser,
                profilePicture: url,
            });
            setUserAuth(prev => ({
                ...prev,
                user: response.data,
                loading: false,
                isAuthenticated: true
            }));
            setEditedUser(response.data);
            setSnackbar({ open: true, message: 'Profile picture updated successfully', severity: 'success' });
        } catch (err) {
            console.error('Failed to update user profile:', err);
            setSnackbar({ open: true, message: 'Failed to update profile picture', severity: 'error' });
        }
    };

    if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    if (error) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
    if (!userAuth.user) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>No user data found</Typography></Box>;

    return (
        <>
            <UserNavBar profilePicture={userAuth.user?.profilePicture} />
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
                    height: "100px" 
                }}
            >
                <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, mt: 8 }}>
                    <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mb: 2 }}>
                        <ArrowBack />
                    </IconButton>

                    <Grid container spacing={3} direction="column" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ProfileImage>
                                        <StyledAvatar
                                            alt={userAuth.user.name || 'User'}
                                            src={userAuth.user.profilePicture || "/path-to-default-image.jpg"}
                                        />
                                    </ProfileImage>
                                    <UserUpload onUploaded={handleFileUploaded} />
                                    <Typography variant="h5" component="div">
                                        {userAuth.user.username || 'Unknown User'}
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <StyledCard>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" height= "100px" width = "600px">
                                        <Typography variant="h6" gutterBottom>
                                            Profile Information
                                        </Typography>
                                        <Button 
                                            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                        >
                                            {isEditing ? 'Save' : 'Edit'}
                                        </Button>
                                    </Box>
                                    {isEditing ? (
                                        <>
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="bio"
                                                label="Bio"
                                                value={editedUser.bio || ''}
                                                onChange={handleInputChange}
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="email"
                                                label="Email"
                                                value={editedUser.email || ''}
                                                onChange={handleInputChange}
                                                error={snackbar.message === 'Email already in use'}
                                                helperText={snackbar.message === 'Email already in use' ? 'Email already in use' : ''}
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="phoneNumber"
                                                label="Phone Number"
                                                value={editedUser.phoneNumber || ''}
                                                onChange={handleInputChange}
                                                error={snackbar.message === 'Phone number already in use'}
                                                helperText={snackbar.message === 'Phone number already in use' ? 'Phone number already in use' : ''}
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="address"
                                                label="Address"
                                                value={editedUser.address || ''}
                                                onChange={handleInputChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="body1">Bio: {userAuth.user.bio || 'No bio available'}</Typography>
                                            <Typography variant="body1">Email: {userAuth.user.email || 'Not provided'}</Typography>
                                            <Typography variant="body1">Phone: {userAuth.user.phoneNumber || 'Not provided'}</Typography>
                                            <Typography variant="body1">Address: {userAuth.user.address || 'Not provided'}</Typography>
                                        </>
                                    )}
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer/>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserProfilePage;

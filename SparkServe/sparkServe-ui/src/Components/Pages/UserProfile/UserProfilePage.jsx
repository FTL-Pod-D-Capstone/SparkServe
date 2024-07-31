import React, { useState, useEffect } from 'react';
import Footer from '../../Footer/Footer';
import UserNavBar from '../../UserNavBar/UserNavBar';
import { Typography, Grid, Card, CardContent, Avatar, Box, CircularProgress, Button, TextField, Snackbar, Alert } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';

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

const UploadButton = styled('label')({
  position: 'absolute',
  bottom: 10,
  right: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '5px 10px',
  borderRadius: 20,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

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
                const response = await axios.get(`https://project-1-uljs.onrender.com/users/${id}`);
                setUser(response.data);
                setEditedUser(response.data);
                setProfilePicture(response.data.profilePicture || '');
                setIsLoading(false);
            } catch (err) {
                console.error(`Error getting User:`, err);
                setError(`Failed to load User Info: ${err.message}`);
                setIsLoading(false);
            }
        };

        getUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`https://project-1-uljs.onrender.com/users/${id}`, editedUser);
            setUser(response.data);
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

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Replace this with your actual file upload API endpoint
            const response = await axios.post('https://your-upload-api-endpoint.com/upload', formData);
            const url = response.data.url;
            setProfilePicture(url);
            handleFileUploaded(url);
        } catch (error) {
            console.error('Failed to upload file:', error);
            setSnackbar({ open: true, message: 'Failed to upload image', severity: 'error' });
        }
    };

    const handleFileUploaded = async (url) => {
        try {
            const response = await axios.put(`https://project-1-uljs.onrender.com/users/${id}`, {
                ...editedUser,
                profilePicture: url,
            });
            setUser(response.data);
            setEditedUser(response.data);
            setSnackbar({ open: true, message: 'Profile picture updated successfully', severity: 'success' });
        } catch (err) {
            console.error('Failed to update user profile:', err);
            setSnackbar({ open: true, message: 'Failed to update profile picture', severity: 'error' });
        }
    };

    if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    if (error) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
    if (!user) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>No user data found</Typography></Box>;

    return (
        <>
            <UserNavBar profilePicture={profilePicture} />
            <Box sx={{ flexGrow: 1, padding: 3, mt: 8 }}>
                <IconButton onClick={handleGoBack} aria-label="go back" sx={{ mb: 2 }}>
                    <ArrowBack />
                </IconButton>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <StyledCard>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ProfileImage>
                                    <StyledAvatar
                                        alt={user.name || 'User'}
                                        src={profilePicture || "/path-to-default-image.jpg"}
                                    />
                                    <UploadButton htmlFor="profile-picture-upload">
                                        Upload
                                        <input
                                            id="profile-picture-upload"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleFileUpload}
                                        />
                                    </UploadButton>
                                </ProfileImage>
                                <Typography variant="h5" component="div">
                                    {user.username || 'Unknown User'}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <StyledCard>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
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
                                        <Typography variant="body1">Bio: {user.bio || 'No bio available'}</Typography>
                                        <Typography variant="body1">Email: {user.email || 'Not provided'}</Typography>
                                        <Typography variant="body1">Phone: {user.phoneNumber || 'Not provided'}</Typography>
                                        <Typography variant="body1">Address: {user.address || 'Not provided'}</Typography>
                                    </>
                                )}
                            </CardContent>
                        </StyledCard>
                    </Grid>
                </Grid>
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
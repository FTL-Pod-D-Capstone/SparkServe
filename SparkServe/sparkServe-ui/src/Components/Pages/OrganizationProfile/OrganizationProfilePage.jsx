import React, { useState, useEffect } from 'react';
import Footer from '../../Footer/Footer';
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar';
import { Typography, Grid, Card, CardContent, Avatar, Box, CircularProgress, Button, TextField, Snackbar, Alert } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import OrganizationUpload from './OrganizationUpload';

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

const OrganizationProfilePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [organization, setOrganization] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pictureUrl, setPictureUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedOrganization, setEditedOrganization] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const getOrganization = async () => {
            if (!id) {
                setError('No organization ID provided');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/orgs/${id}`);
                setOrganization(response.data);
                setEditedOrganization(response.data);
                setPictureUrl(response.data.pictureUrl || '');
                setIsLoading(false);
            } catch (err) {
                console.error(`Error getting Organization:`, err);
                setError(`Failed to load Organization Info: ${err.message}`);
                setIsLoading(false);
            }
        };

        getOrganization();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedOrganization(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedFields = {
                name: editedOrganization.name,
                description: editedOrganization.description,
                address: editedOrganization.address,
                website: editedOrganization.website,
                contactEmail: editedOrganization.contactEmail,
                primaryCause: editedOrganization.primaryCause,
                orgUrl: editedOrganization.orgUrl,
            };

            if (editedOrganization.email !== organization.email) {
                updatedFields.email = editedOrganization.email;
            }
            if (editedOrganization.phoneNumber !== organization.phoneNumber) {
                updatedFields.phoneNumber = editedOrganization.phoneNumber;
            }

            const response = await axios.put(`https://project-1-uljs.onrender.com/orgs/${id}`, updatedFields);
            setOrganization(response.data);
            setIsEditing(false);
            setSnackbar({ open: true, message: 'Organization profile updated successfully', severity: 'success' });
        } catch (err) {
            console.error('Failed to update organization profile:', err);
            let errorMessage = 'Failed to update profile';
            if (err.response && err.response.data && err.response.data.error) {
                errorMessage = err.response.data.error;
            }
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        }
    };

    const handleFileUploaded = async (url) => {
        setPictureUrl(url);
        try {
            const response = await axios.put(`https://project-1-uljs.onrender.com/orgs/${id}`, {
                pictureUrl: url,
            });
            setOrganization(response.data);
            setEditedOrganization(response.data);
            setSnackbar({ open: true, message: 'Organization picture updated successfully', severity: 'success' });
        } catch (err) {
            console.error('Failed to update organization profile:', err);
            setSnackbar({ open: true, message: 'Failed to update profile picture', severity: 'error' });
        }
    };

    if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    if (error) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography color="error">{error}</Typography></Box>;
    if (!organization) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>No organization data found</Typography></Box>;

    return (
        <>
            <OrganizationNavBar />
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
                                        alt={organization.name || 'Organization'}
                                        src={pictureUrl || "/path-to-default-image.jpg"}
                                    />
                                </ProfileImage>
                                <OrganizationUpload onUploaded={handleFileUploaded} />
                                <Typography variant="h5" component="div">
                                    {organization.name || 'Unknown Organization'}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <StyledCard>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" gutterBottom>
                                        Organization Information
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
                                            name="name"
                                            label="Organization Name"
                                            value={editedOrganization.name || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="description"
                                            label="Description"
                                            value={editedOrganization.description || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="email"
                                            label="Email"
                                            value={editedOrganization.email || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="phoneNumber"
                                            label="Phone Number"
                                            value={editedOrganization.phoneNumber || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="address"
                                            label="Address"
                                            value={editedOrganization.address || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="website"
                                            label="Website"
                                            value={editedOrganization.website || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="contactEmail"
                                            label="Contact Email"
                                            value={editedOrganization.contactEmail || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="primaryCause"
                                            label="Primary Cause"
                                            value={editedOrganization.primaryCause || ''}
                                            onChange={handleInputChange}
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            name="orgUrl"
                                            label="Organization URL"
                                            value={editedOrganization.orgUrl || ''}
                                            onChange={handleInputChange}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body1">Name: {organization.name}</Typography>
                                        <Typography variant="body1">Description: {organization.description || 'Not provided'}</Typography>
                                        <Typography variant="body1">Email: {organization.email}</Typography>
                                        <Typography variant="body1">Phone: {organization.phoneNumber}</Typography>
                                        <Typography variant="body1">Address: {organization.address || 'Not provided'}</Typography>
                                        <Typography variant="body1">Website: {organization.website || 'Not provided'}</Typography>
                                        <Typography variant="body1">Contact Email: {organization.contactEmail || 'Not provided'}</Typography>
                                        <Typography variant="body1">Primary Cause: {organization.primaryCause || 'Not provided'}</Typography>
                                        <Typography variant="body1">Organization URL: {organization.orgUrl || 'Not provided'}</Typography>
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

export default OrganizationProfilePage;
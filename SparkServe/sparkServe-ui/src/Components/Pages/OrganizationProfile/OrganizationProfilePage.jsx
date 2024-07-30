import React, { useState, useEffect } from 'react'
import Footer from '../../Footer/Footer'
import OrganizationNavBar from '../../OrganizationNavBar/OrganizationNavBar'
import { Typography, Grid, Card, CardContent, Avatar, Box, CircularProgress } from '@mui/material'
import { IconButton } from '@mui/material';
import { ArrowBack, FileUpload } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom'
import '../OrganizationProfile/OrganizationProfilePage.css';
import axios from 'axios';
import OrganizationUpload from './OrganizationUpload';

const OrganizationProfilePage = () => {
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [organization, setOrganization] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState('');


    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const getOrganization = async () => {
            console.log('Fetching organization data for organizationId:', id);
            if (!id) {
                console.log('No organizationId provided');
                setError('No organization ID provided');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/orgs/${id}`);
                console.log('API response:', response.data);
                setOrganization(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error(`Error getting Organization:, err`);
                setError(`Failed to load Organization Info: ${err.message}`);
                setIsLoading(false);
            }
        };

        getOrganization();
    }, [id]);

    if (isLoading) return <div>Loading... <CircularProgress/></div>;
    if (error) return <div>{error}</div>;
    if (!organization) return <div>No organization data found</div>;

    const handleFileUploaded = async (url) => {
        setPhoto(url);
        try {
            const response = await axios.put(`https://project-1-uljs.onrender.com/orgs/${id}`, {
                    pictureUrl: url,
            });
            console.log('Organization profile updated successfully:', response.data);
        } catch (err) {
            console.error('Failed to update Organization profile:', err);
        }
    };
    return (
        <>
            <OrganizationNavBar/>


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
                                    alt={organization.name || 'Organization'}
                                    src={organization.pictureUrl || "/path-to-default-image.jpg"}
                                    sx={{ width: 200, height: 200, mb: 2 }}
                                />
                                <OrganizationUpload onUploaded={handleFileUploaded} />

                                <Typography variant="h5" component="div">
                                    {organization.name || 'Unknown Organization'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right side - Organization information */}
                    <Grid item xs={12} md={8}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Top half - Bio */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    Bio
                                </Typography>
                                <Typography variant="body1">
                                    {organization.description || 'No bio available'}
                                </Typography>
                            </CardContent>

                            {/* Bottom half - Contact information */}
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Contact Information
                                </Typography>
                                <Typography variant="body1">Email: {organization.email || 'Not provided'}</Typography>
                                <Typography variant="body1">Phone: {organization.phoneNumber || 'Not provided'}</Typography>
                                <Typography variant="body1">Address: {organization.address || 'Not provided'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Footer/>
        </>
    )
}

export default OrganizationProfilePage
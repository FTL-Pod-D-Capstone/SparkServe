import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, TextField, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LinearGradientLoading from './LinearGradientLoading';

const VolOppContainer = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [filteredOpportunities, setFilteredOpportunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [organizationFilter, setOrganizationFilter] = useState('');
    const [causeFilter, setCauseFilter] = useState('');
    const [organizations, setOrganizations] = useState([]);
    const [causes, setCauses] = useState([]);

    useEffect(() => {
        const getOpportunities = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/opps`);
                const opportunitiesData = response.data;

                const opportunitiesWithOrgNames = await Promise.all(opportunitiesData.map(async (opp) => {
                    if (!opp.organization || !opp.organization.name) {
                        try {
                            const orgResponse = await axios.get(`https://project-1-uljs.onrender.com/orgs/${opp.organizationId}`);
                            return { ...opp, organizationName: orgResponse.data.name };
                        } catch (orgError) {
                            console.error(`Error fetching organization for ID ${opp.organizationId}:`, orgError);
                            return { ...opp, organizationName: 'Unknown Organization' };
                        }
                    }
                    return { ...opp, organizationName: opp.organization.name };
                }));

                setOpportunities(opportunitiesWithOrgNames);
                setFilteredOpportunities(opportunitiesWithOrgNames);

                const uniqueOrganizations = [...new Set(opportunitiesWithOrgNames.map(opp => opp.organizationName).filter(Boolean))];
                const uniqueCauses = [...new Set(opportunitiesWithOrgNames.map(opp => opp.relatedCause).filter(Boolean))];
                
                setOrganizations(uniqueOrganizations);
                setCauses(uniqueCauses);

                setIsLoading(false);
            } catch (err) {
                console.error('Error getting opportunities:', err);
                setError('Failed to load opportunities.');
                setIsLoading(false);
            }
        };

        getOpportunities();
    }, []);

    useEffect(() => {
        const filtered = opportunities.filter(opp => 
            opp.title.toLowerCase().includes(nameFilter.toLowerCase()) &&
            (organizationFilter === '' || opp.organizationName === organizationFilter) &&
            (causeFilter === '' || opp.relatedCause === causeFilter)
        );
        setFilteredOpportunities(filtered);
    }, [nameFilter, organizationFilter, causeFilter, opportunities]);

    if (isLoading) return <LinearGradientLoading />;
    if (error) return <div>{error}</div>;

    return (

        <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Search opportunities"
                            variant="outlined"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Organization</InputLabel>
                            <Select
                                value={organizationFilter}
                                onChange={(e) => setOrganizationFilter(e.target.value)}
                                label="Organization"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {organizations.map((org) => (
                                    <MenuItem key={org} value={org}>{org}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Cause</InputLabel>
                            <Select
                                value={causeFilter}
                                onChange={(e) => setCauseFilter(e.target.value)}
                                label="Cause"

        <div>
            <Container
                sx={{
                    my: 8,
                    backgroundColor: bgColor || '#ffffff',
                    minHeight: '100vh',
                    padding: '20px',
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <TextField
                        label="Search by Name"
                        variant="outlined"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        sx={{ mr: 2, mb: 2 }}
                    />
                    <FormControl variant="outlined" sx={{ mr: 2, mb: 2, minWidth: 120 }}>
                        <InputLabel >Organization</InputLabel>
                        <Select
                            value={organizationFilter}
                            onChange={(e) => setOrganizationFilter(e.target.value)}
                            label="Organization"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {organizations.map((org) => (
                                <MenuItem key={org} value={org}>{org}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
                        <InputLabel>Cause</InputLabel>
                        <Select
                            value={causeFilter}
                            onChange={(e) => setCauseFilter(e.target.value)}
                            label="Cause"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {causes.map((cause) => (
                                <MenuItem key={cause} value={cause}>{cause}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {filteredOpportunities.map((opportunity) => (
                        <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
                            <Cards
                                className="Cards"
                                id={opportunity.opportunityId}
                                title={opportunity.title}
                                cover={opportunity.pictureUrl || "default image"}
                                organizationName={opportunity.organizationName}
                                spots={opportunity.spotsAvailable}
                                cause={opportunity.relatedCause}

                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                {causes.map((cause) => (
                                    <MenuItem key={cause} value={cause}>{cause}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3}>
                {filteredOpportunities.map((opportunity) => (
                    <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
                        <Card 
                            component={Link} 
                            to={`/opportunity/${opportunity.opportunityId}`} 
                            sx={{ 
                                textDecoration: 'none', 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column',
                                '&:hover': {
                                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={opportunity.pictureUrl || "https://via.placeholder.com/300x200"}
                                alt={opportunity.title}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                <Typography variant="subtitle1" component="div" noWrap>
                                    {opportunity.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {opportunity.organizationName}
                                </Typography>
                                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {opportunity.relatedCause}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {opportunity.spotsAvailable} spots
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default VolOppContainer;
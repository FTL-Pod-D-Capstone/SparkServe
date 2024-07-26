import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
        <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <TextField
                    label="Search opportunities"
                    variant="outlined"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    sx={{ 
                        flexGrow: 1, 
                        minWidth: '200px',
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                        },
                    }}
                />
                <FormControl variant="outlined" sx={{ minWidth: '150px' }}>
                    <InputLabel>Organization</InputLabel>
                    <Select
                        value={organizationFilter}
                        onChange={(e) => setOrganizationFilter(e.target.value)}
                        label="Organization"
                        sx={{ backgroundColor: 'white' }}
                    >
                        <MenuItem value=""><em>All</em></MenuItem>
                        {organizations.map((org) => (
                            <MenuItem key={org} value={org}>{org}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: '150px' }}>
                    <InputLabel>Cause</InputLabel>
                    <Select
                        value={causeFilter}
                        onChange={(e) => setCauseFilter(e.target.value)}
                        label="Cause"
                        sx={{ backgroundColor: 'white' }}
                    >
                        <MenuItem value=""><em>All</em></MenuItem>
                        {causes.map((cause) => (
                            <MenuItem key={cause} value={cause}>{cause}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

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
                                border: 'none',
                                boxShadow: 'none',
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
                                sx={{ borderRadius: '8px' }}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 1, pt: 2 }}>
                                <Typography variant="subtitle1" component="div" noWrap fontWeight="bold">
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
import React, { useState, useEffect } from 'react';
import { Container, Grid, CardActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import Cards from '../../Components/Cards/Cards';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VolOppContainer = ({ bgColor }) => {
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
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
                                <CardActions>
                                    <Button size="small" component={Link} to={`/opportunity/${opportunity.opportunityId}`}>
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Cards>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default VolOppContainer;
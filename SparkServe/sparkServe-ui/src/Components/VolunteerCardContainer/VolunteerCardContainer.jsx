import React, { useState, useEffect } from 'react';
import { Container, Grid, CardActions, Button } from '@mui/material';
import Cards from '../../Components/Cards/Cards';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VolOppContainer = ({ bgColor }) => {
    const [opportunities, setOpportunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [organizationName, setOrganizationName] = useState('');
    // const [causes, setCauses] = useState([]);
    // const [organizations, setOrganizations] = useState([]);
    // const [causeFilter, setCauseFilter] = useState('');
    // const [organizationFilter, setOrganizationFilter] = useState('');
    // const [nameFilter, setNameFilter] = useState('');
    // const [filteredOpportunities, setFilteredOpportunities] = useState([]);


    useEffect(() => {
        const getOpportunities = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/opps`);
                console.log('Opportunities Data:', response.data);

                const opportunitiesWithOrgNames = await Promise.all(response.data.map(async (opp) => {
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
                setIsLoading(false);
            } catch (err) {
                console.error('Error getting opportunities:', err);
                setError('Failed to load opportunities.');
                setIsLoading(false);
            }
        };

        getOpportunities();
    }, []);

    console.log('Current opportunities state:', opportunities);

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
                <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {opportunities.map((opportunity) => (
                        <Grid item xs={12} sm={6} md={4} key={opportunity.opportunityId}>
                            <Cards
                                className="Cards"
                                id={opportunity.opportunityId}
                                title={opportunity.title}
                                cover={opportunity.pictureUrl || "default image"}
                                organizationName={opportunity.organizationName || 'Unknown Organization'}
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
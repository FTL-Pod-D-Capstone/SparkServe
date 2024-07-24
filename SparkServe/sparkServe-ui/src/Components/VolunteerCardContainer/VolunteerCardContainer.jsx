import React, {useState, useEffect} from 'react'
// import {posts} from '../DumyData/DummyData'
import { Container, Grid, CardActions, Button } from '@mui/material'
import Cards from '../../Components/Cards/Cards'
import axios from 'axios';
import { Link } from 'react-router-dom';



const VolOppContainer = ({bgColor}) => {
    const [opportunities, setOpportunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const getOpportunities = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/opps`);
                setOpportunities(response.data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error getting opportunities:', err);
                setError('Failed to load opportunities.');
                setIsLoading(false);
            }
        };

        getOpportunities();
    }, []);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Container
            sx={{ my: 8,
                backgroundColor: bgColor || '#ffffff', // default to white if no color is provided
                minHeight: '100vh',
                padding: '20px',
            }}>
        <Grid 
            container rowSpacing={4} 
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
                        cover={opportunity.cover || "default image"}
                        organizationId={opportunity.organizationId}
                        spots={opportunity.spotsAvailable}
                        cause={opportunity.relatedCause}
                    >
                        <CardActions>
                            <Button size="small" component={Link} to={`http://localhost:5173/opportunity/${opportunity.opportunityId}`}>Learn More</Button>
                        </CardActions> 
                    </Cards> 
                </Grid>
            ))}
        </Grid>
    </Container>
    </div>
    )
}

export default VolOppContainer
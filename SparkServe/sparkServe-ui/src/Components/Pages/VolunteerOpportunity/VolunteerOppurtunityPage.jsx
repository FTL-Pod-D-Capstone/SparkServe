import React, {useState, useEffect} from 'react';
import UserNavBar from '../../UserNavBar/UserNavBar';
import Footer from '../../Footer/Footer';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CardMedia, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios'

const VolunOppPage = () => {
    const {opportunityId} = useParams();
    const [opportunity, setOpportunity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [organizationName, setOrganizationName] = useState('');

    const navigate = useNavigate(); 

    const handleGoBack = () => {
        navigate(-1);
    };

    // useEffect(() => {
    //     const getOpportunity = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get(`https://project-1-uljs.onrender.com/opps/${opportunityId}`);
    //             setOpportunity(response.data);
    //             setIsLoading(false);
    //         } catch (err) {
    //             console.error('Error fetching specified opportunity:', err);
    //             setError('Failed to load the opportunity details.');
    //             setIsLoading(false);
    //         }
    //     };
    //     if (opportunityId) {
    //         getOpportunity();
    //     }
    //     getOpportunity();
    // }, [opportunityId]);

    useEffect(() => {
        const getOpportunity = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://project-1-uljs.onrender.com/opps/${opportunityId}`);
                setOpportunity(response.data);
                
                if (response.data.organizationId) {
                    const orgResponse = await axios.get(`https://project-1-uljs.onrender.com/orgs/${response.data.organizationId}`);
                    setOrganizationName(orgResponse.data.name);
                }
                
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching specified opportunity:', err);
                setError('Failed to load the opportunity details.');
                setIsLoading(false);
            }
        };
        
        if (opportunityId) {
            getOpportunity();
        }
    }, [opportunityId]);

    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if(!opportunity) {
        return <Typography>
                Post Not Found :( 
                <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" component={Link} to={`/UserLandingPage`}>
                        Back to Opportunites!
                    </Button>
                </Link>
            </Typography>;
    }

    return (
        <div>
            <UserNavBar/>
            <Typography variant="h3">Secret Bug!</Typography>
            <IconButton onClick={handleGoBack} aria-label="go back">
                <ArrowBack />
            </IconButton>
            <Container sx={{ my: 4,
                margintop:"60px",
            }}>
                <Box sx={{ my: 4,
                }}>
                    <Typography variant="h4" gutterBottom>{opportunity.title}</Typography>
                    <CardMedia
                        component="img"
                        height="300"
                        image={opportunity.pictureUrl || 'default-image-url'}
                        alt={opportunity.title}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="subtitle1">By {organizationName}</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                    Spots Available: {opportunity.spotsAvailable} | Related Cause: {opportunity.relatedCause}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {/* You might want to add a 'content' field to your dummy data for this */}
                        About: {opportunity.description}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" href='Uhoh' >
                            Sign Up Here!
                        </Button>
                    </Typography>
                </Box>
            </Container>

            <Footer/>
        </div>
    )
}

export default VolunOppPage;
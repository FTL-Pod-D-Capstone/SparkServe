import React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import VolOppContainer from '../VolunteerCardContainer/VolunteerCardContainer'

const Cards = ({ id, title, cover, organizationName, spots, cause }) => {

    console.log('Opportunity ID:', id);//debug
    const navigate = useNavigate();



    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={cover}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    By {organizationName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Related Cause: {cause}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/opportunity/${id}`}>Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default Cards;
import React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const Cards = ({ title, cover, author, view, comment }) => {
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
                    By {author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Views: {view} | Comments: {comment}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default Cards;
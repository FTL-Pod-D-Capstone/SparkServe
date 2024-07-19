import React from 'react';
import UserNavBarNR from '../../UserNavBarNR/UserNavBarNR';
import Footer from '../../Footer/Footer';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CardMedia, Button } from '@mui/material';
import { posts } from '../../DumyData/DummyData';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const VolunOppPage = () => {
    const {id} = useParams();
    const post = posts.find(p => p.id === id);

    const navigate = useNavigate(); 

    const handleGoBack = () => {
        navigate(-1);
    };

    if(!post) {
        return <Typography>
                Post Not Found :( 
                <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" component={Link} to={`/NRLandingPage`}>
                        Back to Opportunites!
                    </Button>
                </Link>
            </Typography>;
    }

    return (
        <div>
            <UserNavBarNR/>
            <Typography variant="h3">Secret Bug!</Typography>
            <IconButton onClick={handleGoBack} aria-label="go back">
                <ArrowBack />
            </IconButton>
            <Container sx={{ my: 4,
                margintop:"60px",
            }}>
                <Box sx={{ my: 4,
                }}>
                    <Typography variant="h4" gutterBottom>{post.title}</Typography>
                    <CardMedia
                        component="img"
                        height="300"
                        image={post.cover}
                        alt={post.title}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="subtitle1">By {post.author.name}</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Views: {post.view} | Comments: {post.comment} | Shares: {post.share}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {/* You might want to add a 'content' field to your dummy data for this */}
                        This is where you'd put the full content of the post. For now, it's just dummy text.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

export default VolunOppPage
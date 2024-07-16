import React from 'react'
import "../Footer/Footer.css"
import { Box, Typography, Container} from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (     
    <Box component="Footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'primary.main',
                color: 'white',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
            }}>
                <Container maxWidth="sm">
            <Typography variant="body1">
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Back to Welcome
                </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Typography>
        </Container>

    </Box>

    );
}

export default Footer
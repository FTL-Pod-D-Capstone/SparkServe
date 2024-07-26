import React from 'react';
import { Container, Box, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ahmed from '../../assets/Ahmed.png';
import larnelle from '../../assets/larnelle.jpg';
import morgan from '../../assets/Morgan.jpg';

const profileData = [
  {
    image: ahmed,
    name: 'Ahmed Hamouda',
    description: 'City College of New York 26.',
    linkedin: 'https://www.linkedin.com/in/ahmedhamouda1/',
    github: 'https://github.com/Ahmedh27',
    objectPosition: 'top'
  },
  {
    image: larnelle,
    name: 'Larnelle Ankunda',
    description: 'Howard University 26.',
    linkedin: 'https://www.linkedin.com/in/larnelle-ankunda-199a0b252/',
    github: 'https://github.com/larnelle15'
  },
  {
    image: morgan,
    name: 'Morgan Villanueva',
    description: 'Florida International University 26.',
    linkedin: 'https://www.linkedin.com/in/villanuevam305/',
    github: 'https://github.com/Morgan-AV',
    
  },
];

const ProfileCards = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card
        sx={{
          p: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          mt: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <Typography
            component="h2"
            variant="h4"
            color="text.primary"
            sx={{ textAlign: 'center', mr: 2 }}
          >
            Meet the&nbsp;
            <Typography
              component="span"
              variant="h4"
              sx={{ color: 'primary.main' }}
            >
              creators
            </Typography>
          </Typography>
          <lord-icon
            src="https://cdn.lordicon.com/mebvgwrs.json"
            trigger="hover"
            stroke="light"
            colors="primary:#121331,secondary:#f9c9c0,tertiary:#4bb3fd,quaternary:#c67d53,quinary:#ebe6ef"
            style={{ width: '50px', height: '50px' }}
          ></lord-icon>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {profileData.map((profile, index) => (
            <Card sx={{ width: 300, margin: 2, zIndex: 99 }} key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={profile.image}
                  alt={profile.name}
                  sx={{ 
                    objectFit: 'cover',
                    objectPosition: profile.objectPosition || 'center' // Use objectPosition if specified, otherwise default to 'center'
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <IconButton
                      color="primary"
                      href={profile.linkedin}
                      aria-label="LinkedIn"
                      sx={{ alignSelf: 'center' }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      href={profile.github}
                      aria-label="GitHub"
                      sx={{ alignSelf: 'center', color: 'black' }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Card>
    </Container>
  );
};

export default ProfileCards;
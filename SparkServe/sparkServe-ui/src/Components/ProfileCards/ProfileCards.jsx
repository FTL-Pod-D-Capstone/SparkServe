import React from 'react';
import { Container, Box, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
    github: 'https://github.com/Ahmedh27'
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
    github: 'https://github.com/Morgan-AV'
  },
];

const ProfileCards = () => {
  console.log('Rendering ProfileCards');
  return (
    <Container sx={{ mt: 1 }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {profileData.map((profile, index) => (
          <Card sx={{ maxWidth: 400, margin: 1, zIndex: 99 }} key={index}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={profile.image}
                alt={profile.name}
              />
              <CardContent sx={{ paddingTop: '2px' }}></CardContent>
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
    </Container>
  );
};

export default ProfileCards;
import React from 'react';
import { Container, Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';
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
    objectPosition: 'center 20%'
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
    objectPosition: 'center 30%'
  },
];

const ProfileCards = () => {
  const isMobileS = useMediaQuery('(min-width:320px)');
  const isMobileM = useMediaQuery('(min-width:375px)');
  const isMobileL = useMediaQuery('(min-width:425px)');
  const isTablet = useMediaQuery('(min-width:768px)');
  const isLaptop = useMediaQuery('(min-width:1024px)');
  const isLaptopL = useMediaQuery('(min-width:1440px)');
  const isDesktop = useMediaQuery('(min-width:2560px)');

  return (
    <Container 
      sx={{ 
        mt: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 }
      }}
      maxWidth={isDesktop ? "xl" : isLaptopL ? "lg" : "md"}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            mt: { xs: 2, sm: 3, md: 4 },
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 2, sm: 3, md: 4 } }}>
            <Typography
              component="h2"
              variant={isTablet ? "h4" : "h5"}
              color="text.primary"
              sx={{ textAlign: 'center', mr: 2, fontWeight: 'bold' }}
            >
              Meet the&nbsp;
              <Typography
                component="span"
                variant={isTablet ? "h4" : "h5"}
                sx={{ color: 'primary.main', fontWeight: 'bold' }}
              >
                creators
              </Typography>
            </Typography>
            <lord-icon
              src="https://cdn.lordicon.com/mebvgwrs.json"
              trigger="hover"
              stroke="light"
              colors="primary:#121331,secondary:#f9c9c0,tertiary:#4bb3fd,quaternary:#c67d53,quinary:#ebe6ef"
              style={{ width: isTablet ? '50px' : '40px', height: isTablet ? '50px' : '40px' }}
            ></lord-icon>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: { xs: 2, sm: 3, md: 4 } 
          }}>
            {profileData.map((profile, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  sx={{
                    width: { xs: 250, sm: 280, md: 300 },
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                    },
                    overflow: 'hidden',
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={isTablet ? "250" : "200"}
                      image={profile.image}
                      alt={profile.name}
                      sx={{ 
                        objectFit: 'cover',
                        objectPosition: profile.objectPosition || 'center'
                      }}
                    />
                    <CardContent sx={{ textAlign: 'center', py: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Typography gutterBottom variant={isTablet ? "h5" : "h6"} component="div" fontWeight="bold">
                        {profile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {profile.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <IconButton
                          color="primary"
                          href={profile.linkedin}
                          aria-label="LinkedIn"
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            mr: 1,
                            transition: 'all 0.2s',
                            '&:hover': { transform: 'translateY(-3px)' }
                          }}
                        >
                          <LinkedInIcon fontSize={isTablet ? "large" : "medium"} />
                        </IconButton>
                        <IconButton
                          href={profile.github}
                          aria-label="GitHub"
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            ml: 1,
                            color: 'text.primary',
                            transition: 'all 0.2s',
                            '&:hover': { transform: 'translateY(-3px)' }
                          }}
                        >
                          <GitHubIcon fontSize={isTablet ? "large" : "medium"} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ProfileCards;
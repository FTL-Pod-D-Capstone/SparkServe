import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Groups2Icon from '@mui/icons-material/Groups2';
import MapIcon from '@mui/icons-material/Map';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { motion } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import volunteeringImage from '../../assets/Volunteering.png';
import mapImage from '../../assets/map.png';
import orgImage from '../../assets/Org.png';

const items = [
  {
    icon: <FollowTheSignsIcon />,
    title: 'Volunteering Opportunities',
    description:
      'This platform provides a variety of volunteering opportunities at your disposal ranging all the way from community development to wildlife conservation.',
    imageLight: `url(${volunteeringImage})`,
  },
  {
    icon: <MapIcon />,
    title: 'Map Features',
    description:
      'SparkServe also provides a "search by map" feature that enables users to look up any location of their choice and find volunteering opportunities that match their desires.',
    imageLight: `url(${mapImage})`,
  },
  {
    icon: <Groups2Icon />,
    title: 'NGO Sign up',
    description:
      'Non-profit organizations could establish their opportunities on the platform by scheduling their events.',
    imageLight: `url(${orgImage})`,
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const isMobileS = useMediaQuery('(min-width:320px)');
  const isMobileM = useMediaQuery('(min-width:375px)');
  const isMobileL = useMediaQuery('(min-width:425px)');
  const isTablet = useMediaQuery('(min-width:768px)');
  const isLaptop = useMediaQuery('(min-width:1024px)');
  const isLaptopL = useMediaQuery('(min-width:1440px)');
  const isDesktop = useMediaQuery('(min-width:2560px)');

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container 
      id="features" 
      sx={{ 
        py: { xs: 4, sm: 8, md: 16 },
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
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            mt: { xs: -5, sm: -10, md: -15 },
            overflow: 'hidden',
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 4, md: 6 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 3, md: 4 } }}>
                <Typography component="h2" variant={isTablet ? "h4" : "h5"} color="text.primary" fontWeight="bold">
                  Product features
                </Typography>
                <Box sx={{ ml: 1 }}>
                  <lord-icon
                    src="https://cdn.lordicon.com/yedgackm.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#4bb3fd,tertiary:#3a3347"
                    style={{ width: isTablet ? '45px' : '35px', height: isTablet ? '50px' : '40px' }}
                  ></lord-icon>
                </Box>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: { xs: 2, sm: 3, md: 4 }, fontSize: isTablet ? '1.1rem' : '1rem' }}
              >
                Here we provide a brief overview of the key features of SparkServe and how it benefits users with opportunities specifically made for them.
              </Typography>
              <Grid container item gap={1} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                {items.map(({ title }, index) => (
                  <Chip
                    key={index}
                    label={title}
                    onClick={() => handleItemClick(index)}
                    sx={{
                      borderColor: (theme) => selectedItemIndex === index ? 'primary.light' : '',
                      background: (theme) => selectedItemIndex === index ? 'primary.main' : '',
                      '& .MuiChip-label': {
                        color: selectedItemIndex === index ? '#fff' : '',
                        fontSize: isMobileM ? '0.8rem' : '0.7rem',
                      },
                    }}
                  />
                ))}
              </Grid>
              <Box
                component={Card}
                variant="outlined"
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  mt: 2,
                  borderRadius: '15px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    backgroundImage: items[selectedItemIndex].imageLight,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: isMobileL ? 280 : 200,
                  }}
                />
                <Box sx={{ px: 2, pb: 2 }}>
                  <Typography color="text.primary" variant="body2" fontWeight="bold">
                    {selectedFeature.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                    {selectedFeature.description}
                  </Typography>
                </Box>
              </Box>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                useFlexGap
                sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
              >
                {items.map(({ icon, title, description }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ width: '100%' }}
                  >
                    <Card
                      variant="outlined"
                      component={Button}
                      onClick={() => handleItemClick(index)}
                      sx={{
                        p: { sm: 2, md: 3 },
                        height: 'fit-content',
                        width: '100%',
                        background: 'none',
                        backgroundColor: selectedItemIndex === index ? 'action.selected' : 'transparent',
                        borderColor: (theme) => selectedItemIndex === index ? 'primary.light' : 'grey.200',
                        borderRadius: '15px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          textAlign: 'left',
                          flexDirection: { xs: 'column', md: 'row' },
                          alignItems: { md: 'center' },
                          gap: { xs: 1, sm: 2, md: 2.5 },
                        }}
                      >
                        <Box
                          sx={{
                            color: (theme) => selectedItemIndex === index ? 'primary.main' : 'grey.500',
                          }}
                        >
                          {icon}
                        </Box>
                        <Box sx={{ textTransform: 'none' }}>
                          <Typography
                            color="text.primary"
                            variant="body2"
                            fontWeight="bold"
                            fontSize={isTablet ? '1rem' : '0.9rem'}
                          >
                            {title}
                          </Typography>
                          <Typography
                            color="text.secondary"
                            variant="body2"
                            sx={{ my: 0.5 }}
                            fontSize={isTablet ? '0.9rem' : '0.8rem'}
                          >
                            {description}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
            >
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  width: '100%',
                  display: { xs: 'none', sm: 'flex' },
                  pointerEvents: 'none',
                  borderRadius: '15px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  key={selectedItemIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      m: 'auto',
                      width: '100%',
                      height: '100%',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundImage: items[selectedItemIndex].imageLight,
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </motion.div>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
    </Container>
  );
}

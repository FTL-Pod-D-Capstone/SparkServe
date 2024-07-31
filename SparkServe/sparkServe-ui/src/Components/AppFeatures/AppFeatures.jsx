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

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Card
        sx={{
          p: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          mt: -15, // Raise the card slightly
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Typography component="h2" variant="h4" color="text.primary">
                Product features
              </Typography>
              <Box sx={{ ml: 1 }}>
                <lord-icon
                  src="https://cdn.lordicon.com/yedgackm.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#4bb3fd,tertiary:#3a3347"
                  style={{ width: '45px', height: '50px' }}
                ></lord-icon>
              </Box>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Here we provide a brief overview of the key features of SparkServe and how it benefits users with opportunities specifically made for them.
            </Typography>
            <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
              {items.map(({ title }, index) => (
                <Chip
                  key={index}
                  label={title}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'primary.light' : '';
                      }
                      return selectedItemIndex === index ? 'primary.light' : '';
                    },
                    background: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'none' : '';
                      }
                      return selectedItemIndex === index ? 'none' : '';
                    },
                    backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                    '& .MuiChip-label': {
                      color: selectedItemIndex === index ? '#fff' : '',
                    },
                  }}
                />
              ))}
            </Grid>
            <Box
              component={Card}
              variant="outlined"
              sx={{
                display: { xs: 'auto', sm: 'none' },
                mt: 4,
              }}
            >
              <Box
                sx={{
                  backgroundImage: items[selectedItemIndex].imageLight,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat', // Ensure no repeat
                  minHeight: 280,
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
                <Card
                  key={index}
                  variant="outlined"
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    p: 3,
                    height: 'fit-content',
                    width: '100%',
                    background: 'none',
                    backgroundColor:
                      selectedItemIndex === index ? 'action.selected' : undefined,
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index
                          ? 'primary.light'
                          : 'grey.200';
                      }
                      return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { md: 'center' },
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => {
                          if (theme.palette.mode === 'light') {
                            return selectedItemIndex === index
                              ? 'primary.main'
                              : 'grey.300';
                          }
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.700';
                        },
                      }}
                    >
                      {icon}
                    </Box>
                    <Box sx={{ textTransform: 'none' }}>
                      <Typography
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                      >
                        {title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ my: 0.5 }}
                      >
                        {description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
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
              }}
            >
              <Box
                sx={{
                  m: 'auto',
                  width: 420,
                  height: 500,
                  backgroundSize: 'contain',
                  backgroundImage: items[selectedItemIndex].imageLight,
                  backgroundRepeat: 'no-repeat', // Ensure no repeat
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}


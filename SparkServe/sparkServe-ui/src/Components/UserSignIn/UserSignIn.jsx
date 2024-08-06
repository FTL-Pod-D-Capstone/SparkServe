import * as React from 'react';
import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { CombinedAuthContext } from '../CombinedAuthContext/CombinedAuthContext';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/company/salesforce">
        SparkServe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#4856f6',
    },
  },
});

const UserSignIn = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(null);
  const { setUserAuth, checkUserAuth } = useContext(CombinedAuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axios.post(`${baseUrl}/users/login`, credentials);
      if (response.data && response.data.userId) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('isUserAuthenticated', 'true');
        
        await checkUserAuth();
        
        setLoginStatus('success');
        setTimeout(() => {
          handleClose();
          navigate('/UserLandingPage');
        }, 2000);
      } else {
        throw new Error('Login successful but user data is missing');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginStatus('error');
    }
  };

  const handleSignUpRedirect = () => {
    handleClose();
    navigate('/UserSignUpPage');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {loginStatus === 'success' && (
                <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success" sx={{ width: '100%', mb: 2 }}>
                  Hey there, welcome back to SparkServe!
                </Alert>
              )}
              {loginStatus === 'error' && (
                <Alert variant="filled" severity="error" sx={{ width: '100%', mb: 2 }}>
                  Incorrect email or password. Please try again.
                </Alert>
              )}
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address/Phone Number"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link onClick={handleSignUpRedirect} variant="body2" style={{ cursor: 'pointer' }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default UserSignIn;
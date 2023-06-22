import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, TextField, Typography, Stack, Box, ThemeProvider, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { userSignTheme } from '../../utils/userSignTheme'
import { isLoggedIn } from '../../utils/auth'

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const login = useGoogleLogin({
      onSuccess: tokenResponse => {
        const accessToken = tokenResponse.access_token;
        fetch('http://localhost:3001/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: accessToken,
          }),
        })
        .then(backendResponse => {
          if (backendResponse.ok) {
            return backendResponse.json();
          } else {
            return backendResponse.json().then(errorData => {
              throw new Error(errorData.error);
            });
          }
        })
        .then(data => {
          //console.log(data.message);
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email);
          alert("Successfully logged in with Google!");
          navigate('/create-bot');
        })
        .catch(error => {
          console.log(error.message);
          errorMessage(error.message);
        });
      }
    });

  const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          //console.log(data.token);
          //console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email);
          alert("Successfully logged in!");
          navigate('/create-bot');
        } else {
          errorMessage("Invalid email or password");
        }
      } catch (error) {
        console.log('Error:', error);
        errorMessage(error.message);
      }
    };

    useEffect(() => {
      if (isLoggedIn()) {
        // Redirect user to the login page if not logged in
        navigate('/create-bot');
      }
    }, []);
  

  const errorMessage = (error) => {
      alert(error)
  };
    return (
      <ThemeProvider theme={userSignTheme}>
        <Grid container sx={{ minHeight: '100vh' }}>
          <Grid item xs={6} sx={{ background: 'linear-gradient(45deg, #6a1b9a 30%, #42a5f5 90%)' }}></Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
              }}
            >
              <Typography variant='h4' component='div'>
                Login
              </Typography>
              <Stack spacing={2} mt={2}>
                <TextField
                  fullWidth
                  id='email'
                  label='Email'
                  variant='outlined'
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  sx={{ width: '400px' }}
                />
                <TextField
                  fullWidth
                  id='password'
                  label='Password'
                  variant='outlined'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: '400px' }}
                />
                <Button fullWidth variant='contained' color='primary' onClick={handleLogin}>
                  Login
                </Button>
                <Button
                  fullWidth
                  variant='contained'
                  color='default'
                  onClick={() => login()}
                  startIcon={<GoogleIcon />}
                >
                  Sign in with Google
                </Button>
                <Button onClick={() => navigate('/set-password')} style={{marginTop: '3%'}}>
                  Register
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  };
  
  export default LoginComponent;


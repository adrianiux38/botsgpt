import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, TextField, Typography, Stack, Box, ThemeProvider, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { userSignTheme } from '../../utils/userSignTheme.js'
import { isLoggedIn } from '../../utils/auth'
import './Register.css';


const Container = styled(Box)(({ theme }) => ({
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'50vh',
    width: '50vw',
    justifyContent: 'center',
    borderRadius: '16px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  }));
  
  const StyledInput = styled(TextField)({
    borderRadius: '16px',
    marginBottom: '1rem',
  });
  
  const StyledButton = styled(Button)({
    borderRadius: '16px',
    marginBottom: '1rem',
  });

  const RegisterComponent = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const registerGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
        const accessToken = tokenResponse.access_token;
        fetch('https://bot-panel-server-AdrianGutierr26.replit.app/google-login', {
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
          alert("Successfully registered with Google!");
          navigate('/create-bot');
        })
        .catch(error => {
          console.log(error.message);
          errorMessage(error.message);
        });
      }
    })


      const handleRegister = async () => {
        try {
          const response = await fetch('https://bot-panel-server-AdrianGutierr26.replit.app/set-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              newPassword: password,
            }),
          });
      
          const data = await response.json();
          if (response.ok) {
            alert(data.message);
            // Redirect the user to the login page or log them in automatically
            navigate('/create-bot');
          } else {
            errorMessage(data.error);
          }
        } catch (error) {
          console.log('Error:', error);
          errorMessage(error.message);
        }
      };

      const errorMessage = (error) => {
          alert(error)
      };


  useEffect(() => {
    if (isLoggedIn()) {
      // Redirect user to the login page if not logged in
      navigate('/create-bot');
    }
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

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
                Register
              </Typography>
              <Stack spacing={2} mt={2}>
                <TextField
                  fullWidth
                  id='email'
                  label='Email'
                  variant='outlined'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
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
                <Button fullWidth variant='contained' color='primary' onClick={handleRegister}>
                  Register
                </Button>
                <Button
                  fullWidth
                  variant='contained'
                  color='default'
                  startIcon={<GoogleIcon />}
                  onClick={() => registerGoogle()}
                >
                  Sign up with Google
                </Button>
                <Button  onClick={() => navigate('/')} style={{marginTop: '3%'}}>
                  Login
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  };
  
  export default RegisterComponent;
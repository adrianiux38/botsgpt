import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, TextField, Button, Typography, Grid, Snackbar, Stack, ThemeProvider, Alert } from '@mui/material';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { BACKEND_URL } from '../../config.js';
import GoogleIcon from '@mui/icons-material/Google';
import { userSignTheme } from '../../utils/userSignTheme'
import { isLoggedIn } from '../../utils/auth'
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import logo from "../../img/logoB.png"
import logo2 from "../../img/LOGO.png"
import useUser from '../../hooks/useUser.jsx';

  const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();   
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [userData, setUserData] = useUser();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const login = useGoogleLogin({
      onSuccess: tokenResponse => {
        const accessToken = tokenResponse.access_token;
        fetch(`${BACKEND_URL}/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken: accessToken,
          }),
        })
        .then(backendResponse => backendResponse.json())
        .then(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email);
          localStorage.setItem('loggedWith', 'google');
          setUserData({
            email: data.email,
            token: data.token,
            loggedWith: 'google'
          });
          navigate('/create-bot');
        })
        .catch(error => {
          console.log(error.message);
          errorMessage(error.message);
        });
      }
    });

    useEffect(() => {
      if (isLoggedIn()) {
        navigate('/login');
      }
    }, []);

    const isInputValid = () => {
      return (email !== '' && password !== '');
    }
  
    const handleLogin = async () => {
      if(isInputValid()){
        try {
          const response = await fetch(`${BACKEND_URL}/login`, {
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
            localStorage.setItem('loggedWith', 'email');
            setUserData({
              email: data.email,
              token: data.token,
              loggedWith: 'email'
            });
            navigate('/create-bot');
          } else {
            errorMessage("Invalid email or password");
          }
        } catch (error) {
          console.log('Error:', error);
          errorMessage(error.message);
        }
      }
      else{
        setOpen(true);
      }
    };

    const errorMessage = (error) => {
        alert(error)
    };
  
    return (
      <ThemeProvider theme={userSignTheme}>
        <Grid container sx={{ minHeight: '100vh'}}>
          {
          (!isSmallScreen)?
          <>
          <Grid item xs={6} sx={{ 
              background: 'linear-gradient(45deg, #6a1b9a 30%, #42a5f5 90%)', 
              display:'flex', 
              flexDirection:"column", 
              alignItems: "center", 
              justifyContent: "center" 
              }}>
              <div>
                  <img src={logo} alt="logo" style={{width: "40%"}}/>
                  <h1 style={{color:"white", fontSize: "40px"}} >GPT CUSTOM</h1>
                  <p style={{fontSize: "18px", color:"#fff", fontWeight:"600"}}>Create chatbots in a matter of minutes</p>
              </div>
           </Grid>

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

                
              <FormControl error={open}>
                <TextField
                  fullWidth
                  id='email'
                  label='Email'
                  variant='outlined'
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  sx={{ width: '400px', paddingBottom: "10px"}}
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
                {open && <FormHelperText>Missing Email Or Password</FormHelperText>}
              </FormControl>

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
          </>
          :
          <>
          <Grid item xs={0} sx={{ background: 'linear-gradient(45deg, #6a1b9a 30%, #42a5f5 90%)' }}></Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
              }}
            >
              
              <div><img src={logo2} alt="logo" style={{width: "30%", paddingBottom:"10px"}}/></div>
              <div><h1 style={{ fontSize: "40px",paddingBottom:"50px"}} >BOTS GPT</h1></div>
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
          </>

  }
        </Grid>
        
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning" sx={{ width: "90%" }}>
            Missing email or password
          </Alert>
        </Snackbar>
      </ThemeProvider>
    );
  };

export default LoginComponent;  
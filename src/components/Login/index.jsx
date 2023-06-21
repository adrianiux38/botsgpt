import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, TextField, Button, Typography, Alert, Snackbar } from '@mui/material';
import { Grid,  useMediaQuery, useTheme } from '@material-ui/core';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { BACKEND_URL } from '../../config.js';

import './Login.css';


const Container = styled(Box)(({ theme }) => ({
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'500px',
    width: '40vw',
    justifyContent: 'center',
    borderRadius: '16px',
    background: 'white',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  }));
  
  const StyledInput = styled(TextField)({
    borderRadius: '16px',
    marginBottom: '1rem',
  });
  
  const StyledButton = styled(Button)({
    borderRadius: '16px',
    marginBottom: '1rem',
    marginTop: '1rem'
  });

  const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();   
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    

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
            navigate('/create-bot');
          })
          .catch(error => {
            console.log(error.message);
            errorMessage(error.message);
          });
        }
      });

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
            alert("Successfully logged in!");
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
      <div className="centerDiv">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '90%' }}>
          Missing email or password
        </Alert>
      </Snackbar>
      <Container>
        <Typography variant="h4" gutterBottom style={{marginTop: '5%', marginBottom: '3%'}}>
          Login
        </Typography>
        <StyledInput
          focused={true}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          style={{width: isSmallScreen ? '90%' : '50%'}}
        />
        <StyledInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          style={{width: isSmallScreen ? '90%' : '50%'}}
        />
        <StyledButton variant="contained" onClick={handleLogin} style={{width: isSmallScreen ? '80%' : '40%'}}>
          Login with Email
        </StyledButton>
        <StyledButton onClick={() => login()}>
          Sign in with Google 🚀{' '}
        </StyledButton>
        <StyledButton onClick={() => navigate('/set-password')} style={{marginTop: '-1%'}}>
          Register
        </StyledButton>
        {/*  <GoogleLogin
          clientId="51182961207-9bpvnf0jtua36lq9ue20lqkld0u2tpja.apps.googleusercontent.com"
          buttonText="Login with Google"
          onFailure={errorMessage}
          cookiePolicy={'single_host_origin'}
          responseType="id_token" // Add this line
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
        />*/}
      </Container>
    </div>
    );
  };

export default LoginComponent;
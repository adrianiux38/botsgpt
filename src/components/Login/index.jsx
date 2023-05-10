import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';




import './Login.css';

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
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            alert("Successfully logged in!");
            navigate('/create-bot');
          } else {
            errorMessage("You don't have an account with GPTBots");
          }
        } catch (error) {
          console.log('Error:', error);
          errorMessage(error.message);
        }
      };

    const errorMessage = (error) => {
        alert(error)
    };
  
    return (
        <div class="centerDiv">
      <Container>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <StyledInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <StyledInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
        <StyledButton variant="contained" onClick={handleLogin}>
          Login with Email
        </StyledButton>
        <StyledButton onClick={() => login()}>
            Sign in with Google 🚀{' '}
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
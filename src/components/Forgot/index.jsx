import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, TextField, Button, Typography, Grid, Snackbar, Stack, ThemeProvider, Alert } from '@mui/material';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { BACKEND_URL } from '../../config.js';
import GoogleIcon from '@mui/icons-material/Google';
import { userSignTheme } from '../../utils/userSignTheme.js'
import { isLoggedIn } from '../../utils/auth.js'
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import logo from "../../img/logoB.png"
import logo2 from "../../img/LOGO.png"
import useUser from '../../hooks/useUser.jsx';

  const ForgotComponent = () => {
    const [email, setEmail] = useState('');
    
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

    

    

    

    const isInputValid = () => {
      return (email !== '' );
    }
  
    

   
  
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
              <Typography variant='h4' component='div' style={{marginBottom:'10px'}}>
                Reset your password
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
                
                {open && <FormHelperText>Missing Email </FormHelperText>}
              </FormControl>

              

                <Button fullWidth variant='contained' color='primary' >
                  Reset password
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
                minHeight: '90vh',
              }}
            >
              
              <div><img src={logo2} alt="logo" style={{width: "30%", paddingBottom:"10px"}}/></div>
              <div><h1 style={{ fontSize: "40px",paddingBottom:"30px"}} >GPT CUSTOM</h1></div>
              <Typography variant='h4' component='div' style={{marginBottom:'10px'}} >
                Reset your password
              </Typography>
              <Stack spacing={2} mt={2} alignItems="center">      

             
                
                <TextField
                  fullWidth
                  id='email'
                  label='Email'
                  variant='outlined'
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  sx={{ width: '80%' }}
                />
               
                 
                
                <Button sx={{ width: '70%' ,height: "50px"}} variant='contained' color='primary' >
                  Reset password
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

export default ForgotComponent;  
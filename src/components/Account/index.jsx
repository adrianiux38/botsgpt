import './Account.css'
import { useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { NavBar } from "../NavBar";

import CloseIcon from "@mui/icons-material/Close";




import TextField from "@mui/material/TextField";
import { BottomNavigation, Icon, Box, IconButton } from "@mui/material";


import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";



import { useNavigate } from "react-router-dom";


import { BACKEND_URL } from "../../config.js";
import { BorderAllRounded, Logout, LogoutRounded } from '@mui/icons-material';

const Account = () => {
 

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [eMail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const isInputValid = () => {
    return (eMail !== '' && password !== '' && newPassword !== '' && password !== newPassword );
  }

  const errorMessage = (error) => {
    alert(error)
};
  const changePassword= async () => {
    if(isInputValid()){
      try {
        const response = await fetch(`${BACKEND_URL}/set-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: eMail,
            newPassword: newPassword,
            currentPassword: password
          }),
        });
    
        if (response.ok) {
          alert("contraseña actualizada")
        } else {
          errorMessage("Invalid email or password");
        }
      } catch (error) {
        console.log('Error:', error);
        errorMessage(error.message);
      }
    }
    else{
      errorMessage("Ingrese contraseñas nuevas y confirmación de la misma.");
    }
  };
  
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const getUserData= async ()  =>{
    const mail =  localStorage.getItem('email');
    await fetch(`${BACKEND_URL}/getUser`,{
      method: 'POST',
      headers:{"Content-Type": "application/json",},
      body: JSON.stringify({email:mail})
    })
    .then((response) => response.json())
   .then((data) => {
    setEmail(data[0].email);
   })
  }

  useEffect (()=>{getUserData();}, [] );



  return (
    <div className="account">
        
      <NavBar />
        
        <div className="topMargin"></div>
        <div className="container">
            <h1 className="title3">My Account</h1>
            <div className='row'>
                <div class="column">
                    <img class="round-image" src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="Descripción de la imagen"/>
                </div>
                <div class="column">
                
                {/* <TextField className='myTextField2'
                fullWidth
                
                id='custom-input'
                label='User Name'
                variant='outlined'
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                sx={{marginTop : "10px"}}
                InputLabelProps={{
                  shrink: true,
                }}
                /> */}

                <TextField 
                  className='myTextField2'
                  fullWidth
                  id='custom-input'
                  label='Email'
                  value={eMail}
                  onChange={(event) => setEmail(event.target.value)}
                  variant='outlined'
                  sx={{marginTop : "10px"}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={true}
                />

                <TextField className='myTextField2'
                fullWidth
                id='currentPassword'
                label='Current Password'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant='outlined'
                sx={{marginTop : "10px"}}
                InputLabelProps={{
                  shrink: true,
                }}
                
                />
                <TextField className='myTextField2'
                fullWidth
                type='password'
                id='custom-input'
                label='New Password'
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                variant='outlined'
                sx={{marginTop : "10px"}}
                InputLabelProps={{
                  shrink: true,
                }}
                />
                </div>                
            </div>

            <div className='buttons'>
                    <Button className='logout' onClick={logout}>
                        LogOut<Logout sx={{paddingLeft:'5px'}}></Logout>
                    </Button>
                    <div className='cancelSave'>
                        <Button  sx={{ color: "red" ,margin: "5px" }} className='cancelBtn'>Cancel</Button>
                        <Button  onClick={changePassword} className='saveBtn'>Save</Button>
                    </div>
                </div>
            
        </div>
        
      
    </div>
  );
};

export default Account;
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
  

  
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const getUserData= async ()  =>{
    const mail =  localStorage.getItem('email');
    
    console.log(mail + "holas");
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
                
                <TextField className='myTextField2'
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
                />

                <TextField className='myTextField2'
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
                />
                <TextField className='myTextField2'
                fullWidth
                id='custom-input'
                label='New Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
                        <Button  className='saveBtn'>Save</Button>
                    </div>
                </div>
            
        </div>
        
      
    </div>
  );
};

export default Account;
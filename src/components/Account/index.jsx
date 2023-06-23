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

  
    fetch(`${BACKEND_URL}/getBotData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        //setCurrentSystemPrompt(data[0].prompt);
        
      })
      .catch((err) => console.log(err));

    
  

  return (
    <div className="account">
        
      <NavBar />
        
        <div className="topMargin"></div>
        <div className="container">
            <h1 className="title3">My Account</h1>
            <div className='row'>
                <div class="column">
                    <img class="round-image" src="https://i.imgur.com/WFCuRfz_d.webp?maxwidth=760&fidelity=grand" alt="Descripción de la imagen"/>
                </div>
                <div class="column">
                
                <TextField className='myTextField2'
                fullWidth
                
                id='custom-input'
                label='User Name'
                variant='outlined'
                sx={{marginTop : "10px"}}
                />

                <TextField className='myTextField2'
                fullWidth
                id='custom-input'
                label='Email'
                variant='outlined'
                />
                <TextField className='myTextField2'
                fullWidth
                id='custom-input'
                label='New Password'
                variant='outlined'
                />
                </div>                
            </div>

            <div className='buttons'>
                    <Button className='logout'>
                        <Logout></Logout><p> LogOut</p>
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
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  CloseButton,
  
} from "reactstrap";

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
        <Box id="box" className="boxContainer">
        <div className="topMargin"></div>
        <div className="container">
            <h1 className="title">My Account</h1>
        </div>
        </Box>
      
    </div>
  );
};

export default Account;
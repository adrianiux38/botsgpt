import { Drawer, useMediaQuery, useTheme, List, ListItem, IconButton, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faRobot, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './navBar.css';

import logo2 from "../../img/LOGO.png"

export const NavBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const tutorialUrl = "https://www.youtube.com/watch?v=j61cdiPP_8s&t=2209s";

  

  return (
    <>
      <div className='navBar'>
        <div className='logoName'>
        <img className= 'imgNav' src={logo2} alt="logo" />
        <h1 className='title'>GPTBOTS</h1>
        </div>
        {
        (!isSmallScreen) ?
        <div className='menu'>
            <Link className='menuItem' to="/my-bots">My Bots</Link>
            <Link className='menuItem' to={tutorialUrl}>Tutorial</Link>
            <Link className='menuItem' to="/account" >Account</Link>
          <div className='addBtn'>
            <IconButton onClick={() => navigate('/create-bot')}>
              <AddCircleOutlineIcon className='addIcon' fontSize="large" color='inherit' />
            </IconButton>
          </div>
        </div>
        :
        <></>
        }
      </div>
    {
    (isSmallScreen) ?
      <div className='footer'>
        <div className='footerBtn'>
          <IconButton onClick={() => navigate('/my-bots')}>
            <FontAwesomeIcon icon={faRobot} className='footerIcon' size='lg' color='inherit' />
          </IconButton>
        </div>
        <div className='footerBtn'>
          <IconButton onClick={() => navigate('/login')}>
            <FontAwesomeIcon icon={faUser} className='footerIcon' size='lg' color='inherit' />
          </IconButton>
        </div>
        <div className='addBtn'>
          <IconButton onClick={() => navigate('/create-bot')}>
            <AddCircleOutlineIcon className='addIcon' fontSize="large" color='inherit' />
          </IconButton>
        </div>
      </div>
      :
      <></>
    }
    </>
  )
}

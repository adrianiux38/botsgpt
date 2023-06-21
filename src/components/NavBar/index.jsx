import { Drawer, useMediaQuery, useTheme, List, ListItem, IconButton, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './navBar.css';

export const NavBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box sx={{ height: '80vh', width: '40vw' , marginTop: '30px'}}>
    <List>
      <ListItem className='menuItem' ListItemButton onClick={() => navigate('/create-bot')}>Create New Bot</ListItem>
      <ListItem className='menuItem' ListItemButton onClick={() => navigate('/my-bots')}>My Bots</ListItem>
      <ListItem className='menuItem' ListItemButton onClick={() => navigate('/my-bots')}>Tutorial</ListItem>
      <ListItem className='menuItem' ListItemButton onClick={logout}>Log Out</ListItem>
    </List>
  </Box>
  );

  return (
    <div className='navBar'>
      <div className='title'>
        <p className='title'>GPTBOTS</p>
      </div>
      {isSmallScreen ? (
        <>
          <IconButton className='menuBtn' edge="start"  aria-label="menu" onClick={toggleDrawer(true)}>
            < MenuIcon className='menuBtn' fontSize="large" />
          </IconButton>
          <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}  sx={{ width: '80vw', marginTop: '30vh' }}>
            {list()}
          </Drawer>
        </>
      ) : (
        <div className='menu'>
          <Link className='menuItem' to="/my-bots">My Bots</Link>
          <Link className='menuItem' to="/login" onClick={logout}>Tutorial</Link>          
          <Link className='menuItem' to="/login" onClick={logout}>Logout</Link>
          <div className='addBtn'>
            <IconButton  onClick={() => navigate('/create-bot')}>
              <AddCircleOutlineIcon className='addIcon' fontSize="large" color='inherit' />
            </IconButton>
          </div>
        </div>
      )}
      {/*
      <Button variant="contained">
          Poner en producción
      </Button>*/}
    </div>
  )
}

import { Row, Col, Card, CardHeader, CardBody, CardFooter, Input, CloseButton } from "reactstrap";
import { useMediaQuery, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { NavBar } from '../NavBar'
import './Mybots.css'
import CloseIcon from '@mui/icons-material/Close';

import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { BottomNavigation, Icon, IconButton } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth'

import { BACKEND_URL } from '../../config.js';

export const Mybots = () => {
  const [bots, setBots] = useState([]);
  const [whatsappEnable, setWhatsappEnable] = useState(true);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [open, setOpen] = useState(false);
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [whatsappApiKey, setWhatsappApiKey] = useState('');
  const [botId, setBotId] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  /* CONSTANTES QUE SE MUESTRAN EN EL FORM DE EDIT */
  const [currentId, setCurrentId] = useState('');
  const [currentBusinessName, setCurrentBusinessName] = useState('');
  const [currentBusinessUrl, setCurrentBusinessUrl] = useState('');
  const [currentTelegramApiKey, setCurrentTelegramApiKey] = useState('');
  const [currentBotName, setCurrentBotName] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  //funcion para abrir el form para hacer edit del bot
  const handleEditButtonClick = (botId) => {
    setBotId(botId);
    //consultar en la base de datos los datos de ese bot 
    fetch(`${BACKEND_URL}/getBotData2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({botId}),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setCurrentId(data[0].currentId);
      setCurrentBusinessName(data[0].business_name);
      setCurrentBusinessUrl(data[0].business_url);
      setCurrentTelegramApiKey(data[0].telegram_api_key);
      setCurrentBotName(data[0].bot_name);
    })
    .catch(err => console.log(err))
    
    setEditDialogOpen(true);
  };

  /* FUNCIONES PARA PEDIRLE LOS DATOS AL USUARIO AL HACER WHATSAPP O TELEGRAM ENABLE */
  const handleClickOpen = (botId) => {
    setOpen(true);
    setBotId(botId);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'white',
      color: '#059CF1',
      fontSize: 20,
      fontWeight: 'bold',
      
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    
  }));

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px'
    
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#DAEDFD',
      
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
      
    },
    '&:last-child': {
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
  
  }));
  
  const getData = async (userEmail) => {
    fetch(`${BACKEND_URL}/getData2?email=${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBots(data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      // Redirect user to the login page if not logged in
      navigate('/login');
    } 
    const loggedInUserEmail = localStorage.getItem('email');
    getData(loggedInUserEmail);
  }, []);

  if (!isLoggedIn()) {
    return null;
  }

  const updateWhatsappEnable = async (whatsapp_enable, botId, callback) => {
    await fetch(`${BACKEND_URL}/updateWhatsappEnable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({whatsapp_enable, botId}),
    })
    .then((res) => res.json())
      .then((data) => {
        callback(data);
        alert(data);
      })
      .catch(err => console.log(err));
  }

  const sendWhatsappNew = async (phoneNumberId, whatsappApiKey) => {
    await fetch(`${BACKEND_URL}/whatsappNew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ botId, phoneNumberId, whatsappApiKey }),
    });
  };

  const updateTelegramEnable = async (telegram_enable, botId, callback) => {
    await fetch(`${BACKEND_URL}/updateTelegramEnable2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({telegram_enable, botId}),
    })
    .then((res) => res.json())
      .then((data) => {
        callback(data);
        alert(data);
      })
      .catch(err => console.log(err));
  }

  const handleChangeTelegram = (botId) => {
    const targetBot = bots.find((bot) => bot.id == botId);
    if (targetBot) {
      updateTelegramEnable(targetBot.telegram_enable == 1 ? 0 : 1, targetBot.id, (result) => {
        let returnValue = result;
        if (returnValue.toLowerCase().includes("successfully")) {
          const updatedBots = bots.map((bot) => {
            if (bot.id == botId) {
              // Update the telegram_enable value
              bot.telegram_enable = bot.telegram_enable == 1 ? 0 : 1;
            }
            return bot;
          });
          setBots(updatedBots);
        } else {
          handleEditButtonClick(botId);
        }
      });
    }
  };

  const handleChangeWhatsapp = (botId) => {
    const targetBot = bots.find((bot) => bot.id == botId);
    if (targetBot) {
      updateWhatsappEnable(targetBot.whatsapp_enable == 1 ? 0 : 1, targetBot.id, (result) => {
        let returnValue = result;
        if (returnValue.toLowerCase().includes("successfully")) {
          const updatedBots = bots.map((bot) => {
            if (bot.id === botId) {
              // Update the whatsapp_enable value
              bot.whatsapp_enable = bot.whatsapp_enable == 1 ? 0 : 1;
            }
            return bot;
          });
          setBots(updatedBots);
        } else {
          handleEditButtonClick(botId);
        }
      });
    }
  };

  const handleDeleteButtonClick = (botId) => {

  }

  const updateBotInfo = async (botId) => {
    await fetch(`${BACKEND_URL}/updateBotInfo2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        botId,
        currentId,
        currentBusinessName,
        currentBusinessUrl,
        currentTelegramApiKey,
        currentBotName,
      }),
    })
    .then((res) => res.json())
      .then((data) => {
        alert(data);
      })
      .catch(err => console.log(err))

  }


  return (
    
    <div className="mybots">
    <NavBar/> 
    <div className="marginTop"></div>
    <div className="container">
    <div className="title2">
    <h2>My bots</h2>
    </div>
    <StyledTableContainer className="tableContainer" component={Paper}>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Whatsapp Phone number Id and Api Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your Whatsapp Phone Number Id and Api Key.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumberId"
            label="Phone Number Id"
            type="text"
            fullWidth
            value={phoneNumberId}
            onChange={(e) => setPhoneNumberId(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: 'black',
              },
              '& .MuiOutlinedInput-input': {
                color: 'black',
              },
              '& .MuiInputLabel-outlined': {
                color: 'black',
              },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
            }}
          />
          <TextField
            margin="dense"
            id="whatsappApiKey"
            label="Whatsapp Api Key"
            type="text"
            fullWidth
            value={whatsappApiKey}
            onChange={(e) => setWhatsappApiKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              // Call your fetch function here with the entered values
              sendWhatsappNew(phoneNumberId, whatsappApiKey);
              handleClose();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} className="myDialog">
        <div className="closeBtn">
          <IconButton edge="end" color="inherit" onClick={() => setEditDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle fontWeight={"700"} fontSize={"1.5em"} className="myDialogTitle">Edit My Bot</DialogTitle>
        <DialogContent color="black">
          <DialogContentText color={"black"} paddingY={"10px"}>Please enter the required information.</DialogContentText>
          <TextField className="myTextField"
            margin="dense"
            id="sytemPrompt"
            label="ID"
            type="text"
            fullWidth
            value={currentId}
            onChange={(e) => setCurrentId(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          /> 
           
          <TextField className="myTextField"
            margin="dense"
            id="whatsappApiKey"
            label="Business Name"
            type="text"
            fullWidth
            value={currentBusinessName}
            onChange={(e) => setCurrentBusinessName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />          
          <TextField className="myTextField"
          margin="dense" 
          id="whatsappPhoneNumberId" 
          label="Busines URL"
          type="text" 
          fullWidth 
          value={currentBusinessUrl}
          onChange={(e) => setCurrentBusinessUrl(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField className="myTextField"
          margin="dense" 
          id="Bussines description" 
          label="Telegram Api Key" 
          type="text" 
          fullWidth 
          value={currentTelegramApiKey}
          onChange={(e) => {setCurrentTelegramApiKey(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField className="myTextField"
          margin="dense" 
          id="userTraining1" 
          label="Bot Name" 
          type="text" 
          fullWidth 
          value={currentBotName}
          onChange={(e) => {setCurrentBotName(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Delete</Button>
          <Button
            onClick={() => {
              // Call your fetch function here to save the edited data
              updateBotInfo(botId)
              setEditDialogOpen(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Table sx={{ minWidth: 400 }} className="table" aria-label="simple table">
        <TableHead className="tableHead" sx={{backgroundColor: 'white'}}>
            <StyledTableRow >
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center"> Name&nbsp;</StyledTableCell>
                {
                  (!isSmallScreen)?
                  <>
                  <StyledTableCell align="center">Business Name&nbsp;</StyledTableCell>
                  
                  </>
                  :
                  <></>
                }
                <StyledTableCell align="center">Whatsapp&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Telegram&nbsp;</StyledTableCell>
                {
                  (!isSmallScreen)?
                  <>
                <StyledTableCell align="center">Edit&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Delete&nbsp;</StyledTableCell>
                </>
                  :
                  <></>
                }
            </StyledTableRow>
        </TableHead>
        <TableBody>
        {bots.map(bot => (
              <StyledTableRow onClick={() => handleEditButtonClick(bot.id)} key={bot.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
                <StyledTableCell align='center' component="th" scope='row'>{bot.id}</StyledTableCell>
                <StyledTableCell align='center'>{bot.bot_name}</StyledTableCell>
                {
                  (!isSmallScreen)?
                  <>
                <StyledTableCell align='center'>{bot.business_name}</StyledTableCell>
                </>
                  :
                  <></>
                }
                <StyledTableCell align='center'>
                  <Switch {...label} 
                  checked={bot.whatsapp_enable == 1 ? true : false}
                  onChange={() => {
                    handleChangeWhatsapp(bot.id);
                    //handleClickOpen(bot.id);
                  }}/>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Switch {...label} 
                  checked={bot.telegram_enable == 1 ? true : false}
                  onChange={()=> {
                    handleChangeTelegram(bot.id);
                    }}/>
                </StyledTableCell>

                {
                  (!isSmallScreen)?
                  <>
                <StyledTableCell align="center">
                  <Button onClick={() => {
                    handleEditButtonClick(bot.id)
                  }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button onClick={() => {
                    handleDeleteButtonClick(bot.id)
                  }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </StyledTableCell>
                </>
                
                  :
                  <></>
                }
                
                
                {/* <StyledTableCell align='center'>{bot.bot_runnning}</StyledTableCell>*/}
              </StyledTableRow>
                ))}
        </TableBody>
      </Table>
      </StyledTableContainer>
      </div>
      </div>
  );
};
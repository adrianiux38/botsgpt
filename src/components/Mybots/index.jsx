import { Row, Col, Card, CardHeader, CardBody, CardFooter, Input } from "reactstrap";
import { useMediaQuery, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { NavBar } from '../NavBar'
import './Mybots.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { BottomNavigation } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [currentWhatsappApiKey, setCurrentWhatsappApiKey] = useState('');
  const [currentTelegramApiKey, setCurrentTelegramApiKey] = useState('');
  const [currentPhoneNumberId, setCurrentPhoneNumberId] = useState('');
  const [currentUserTraining1, setCurrentUserTraining1] = useState('');
  const [currentUserTraining2, setCurrentUserTraining2] = useState('');
  const [currentUserTraining3, setCurrentUserTraining3] = useState('');
  const [currentAssistantTraining1, setCurrentAssistantTraining1] = useState('');
  const [currentAssistantTraining2, setCurrentAssistantTraining2] = useState('');
  const [currentAssistantTraining3, setCurrentAssistantTraining3] = useState('');
  const [currentSystemPrompt, setCurrentSystemPrompt ] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  //funcion para abrir el form para hacer edit del bot
  const handleEditButtonClick = (botId) => {
    setBotId(botId);
    //consultar en la base de datos los datos de ese bot 
    fetch(`${BACKEND_URL}/getBotData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({botId}),
    })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      setCurrentSystemPrompt(data[0].prompt);
      setCurrentTelegramApiKey(data[0].telegramApiKey);
      setCurrentPhoneNumberId(data[0].phone_number_id);
      setCurrentWhatsappApiKey(data[0].whatsappApiKey);
      setCurrentUserTraining1(data[0].user_content1);
      setCurrentUserTraining2(data[0].user_content2);
      setCurrentUserTraining3(data[0].user_content3);
      setCurrentAssistantTraining1(data[0].assistant_content1);
      setCurrentAssistantTraining2(data[0].assistant_content2);
      setCurrentAssistantTraining3(data[0].assistant_content3);
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
    fetch(`${BACKEND_URL}/getData?email=${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
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
    await fetch(`${BACKEND_URL}/updateTelegramEnable`, {
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
    await fetch(`${BACKEND_URL}/updateBotInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({botId, currentSystemPrompt, currentWhatsappApiKey, currentTelegramApiKey, currentPhoneNumberId, currentUserTraining1, currentUserTraining2, currentUserTraining3, currentAssistantTraining1, currentAssistantTraining2, currentAssistantTraining3}),
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
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Bot</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter the required information.</DialogContentText>
          <TextField
            margin="dense"
            id="sytemPrompt"
            label="System prompt"
            type="text"
            fullWidth
            value={currentSystemPrompt || ''}
            onChange={(e) => setCurrentSystemPrompt(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />   
          <TextField
            margin="dense"
            id="whatsappApiKey"
            label="Whatsapp Api Key"
            type="text"
            fullWidth
            value={currentWhatsappApiKey || ''}
            onChange={(e) => setCurrentWhatsappApiKey(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />          
          <TextField
          margin="dense" 
          id="whatsappPhoneNumberId" 
          label="Whatsapp Phone Number ID"
          type="text" 
          fullWidth 
          value={currentPhoneNumberId}
          onChange={(e) => setCurrentPhoneNumberId(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField 
          margin="dense" 
          id="telegramApiKey" 
          label="Telegram Api Key" 
          type="text" 
          fullWidth 
          value={currentTelegramApiKey}
          onChange={(e) => {setCurrentTelegramApiKey(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField 
          margin="dense" 
          id="userTraining1" 
          label="User training 1" 
          type="text" 
          fullWidth 
          value={currentUserTraining1}
          onChange={(e) => {setCurrentUserTraining1(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField 
          margin="dense" 
          id="assistantTraining1" 
          label="Assistant training 1" 
          type="text" 
          fullWidth 
          value ={currentAssistantTraining1}
          onChange={(e) => {setCurrentAssistantTraining1(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField 
          margin="dense" 
          id="userTraining2" 
          label="User training 2" 
          type="text" 
          fullWidth 
          value={currentUserTraining2}
          onChange={(e) => {setCurrentUserTraining2(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField 
          margin="dense" 
          id="assistantTraining2" 
          label="Assistant training 2" 
          type="text" 
          fullWidth 
          value ={currentAssistantTraining2}
          onChange={(e) => {setCurrentAssistantTraining2(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField 
          margin="dense" 
          id="userTraining3" 
          label="User training 3" 
          type="text" 
          fullWidth 
          value={currentUserTraining3}
          onChange={(e) => {setCurrentUserTraining3(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField 
          margin="dense" 
          id="assistantTraining3" 
          label="Assistant training 3" 
          type="text" 
          fullWidth 
          value ={currentAssistantTraining3}
          onChange={(e) => {setCurrentAssistantTraining3(e.target.value)}}
          InputLabelProps={{
            shrink: true,
          }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
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
      <Table sx={{ minWidth: 650 }} className="table" aria-label="simple table">
        <TableHead className="tableHead" sx={{backgroundColor: 'white'}}>
            <StyledTableRow >
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Bot Name&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Business Name&nbsp;</StyledTableCell>
                <StyledTableCell align="center">WhatsappEnable&nbsp;</StyledTableCell>
                <StyledTableCell align="center">TelegramEnable&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Edit&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Delete&nbsp;</StyledTableCell>
            </StyledTableRow>
        </TableHead>
        <TableBody>
        {bots.map(bot => (
              <StyledTableRow key={bot.id} sx={{ '&:last-child td, &:last-child th': { border: 0 },'&:last-child': {
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
              }, }}>
                <StyledTableCell component="th" scope='row'>{bot.id}</StyledTableCell>
                <StyledTableCell align='center'>{bot.prompt}</StyledTableCell>
                {/*
                <StyledTableCell align='center'>{bot.telegramApiKey}</StyledTableCell>
                <StyledTableCell align='center'>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      className="whatsappApiKey"
                      name="whatsappApikey"
                      type="text"
                      id={`${bot.id}`}
                    />
                  </Box>
                </StyledTableCell>
                */}
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
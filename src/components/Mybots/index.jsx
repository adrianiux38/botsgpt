import { Row, Col, Card, CardHeader, CardBody, CardFooter, Input, CloseButton } from "reactstrap";
import { useMediaQuery, useTheme } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { NavBar } from '../NavBar'
import './Mybots.css'
import CloseIcon from '@mui/icons-material/Close';

import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { BottomNavigation, Icon, IconButton, Snackbar, Alert } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth'

import { BACKEND_URL } from '../../config.js';
import { ErrorOutlineOutlined } from "@mui/icons-material";

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
  const [currentPhoneNumberId, setCurrentPhoneNumberId] = useState('');
  const [currentWhatsappApiKey, setCurrentWhatsappApiKey] = useState('');
  const [currentTelegramApiKey, setCurrentTelegramApiKey] = useState('');
  const [currentBotName, setCurrentBotName] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [alertOpen, setAlertOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const navigate = useNavigate();

  //funcion para abrir el form para hacer edit del bot
  const handleEditButtonClick = async (bot, event) => {
    console.log(event.target.tagName)
    if(event.target.tagName !== 'TD' && event.target.tagName !== 'svg' && event.target.tagName !== 'BUTTON') return;
    setBotId(bot.id)
    //consultar en la base de datos los datos de ese bot 
    await fetch(`${BACKEND_URL}/getBotData2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({botId: bot.id}),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setCurrentId(data[0].currentId ?? '');
      setCurrentBusinessName(data[0].business_name ?? '');
      setCurrentBusinessUrl(data[0].business_url ?? '');
      setCurrentPhoneNumberId(data[0].whatsapp_phone_id ?? '');
      setCurrentWhatsappApiKey(data[0].whatsapp_api_key ?? '');
      setCurrentTelegramApiKey(data[0].telegram_api_key ?? '');
      setCurrentBotName(data[0].bot_name ?? '');
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
        data = data.map((bot) => ({...bot, isLodingTelegram: false, isLoadingWhatsapp: false}));
        console.log(data)
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

  const updateWhatsappEnable = async (whatsapp_enable, bot) => {
    const botIndex = bots.indexOf(bot);
    let success = false;
    setBots([
      ...bots.slice(0, botIndex),
      { ...bots[botIndex], isLoadingWhatsapp: true },
      ...bots.slice(botIndex + 1),
    ]);
    await fetch(`${BACKEND_URL}/updateWhatsappEnable2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({whatsapp_enable, botId: bot.id}),
    })
    .then((res) => res.json())
      .then((data) => {
        success = true;
        if(whatsapp_enable == 1){
          showMesage('Whatsapp Enabled')
        } else {
          showMesage('Whatsapp Disabled')
        };
      })
      .catch(err => console.log(err))
      .finally(() => setBots([
        ...bots.slice(0, botIndex),
        { ...bots[botIndex], isLoadingWhatsapp: false, whatsapp_enable: (success) ? whatsapp_enable : bot.whatsapp_enable },
        ...bots.slice(botIndex + 1),
      ]));
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

  const updateTelegramEnable = async (telegram_enable, bot) => {
    const botIndex = bots.indexOf(bot);
    let success = false;
    setBots([
      ...bots.slice(0, botIndex),
      { ...bots[botIndex], isLoadingTelegram: true },
      ...bots.slice(botIndex + 1),
    ]);
    await fetch(`${BACKEND_URL}/updateTelegramEnable2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({telegram_enable, botId: bot.id}),
    })
    .then((res) => res.json())
      .then((data) => {
        success = true;
        if(telegram_enable == 1) {
          showMesage('Telegram Enabled');
        } else {
          showMesage('Telegram Disabled');
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setBots([
          ...bots.slice(0, botIndex),
          { ...bots[botIndex], isLoadingTelegram: false, telegram_enable: (success) ? telegram_enable : bot.telegram_enable },
          ...bots.slice(botIndex + 1),
        ]);
      });
  }

  const handleChangeTelegram = (bot) => {
    const telegram_enable = bot.telegram_enable == 1 ? 0 : 1;
    updateTelegramEnable(telegram_enable, bot);
  };

  const handleChangeWhatsapp = (bot) => {
    const whatsapp_enable = bot.whatsapp_enable == 1 ? 0 : 1;
    updateWhatsappEnable(whatsapp_enable, bot);
  };

  const handleDeleteButtonClick = (bot) => {
    if (typeof bot === "number") {
      setBotId(bot);
    } else {
      setBotId(bot.id);
    }
    setOpenConfirmationDialog(true);
  };

  const handleConfirmationDialogClose = async (confirmed) => {
    setOpenConfirmationDialog(false);
    console.log(botId)
    if (confirmed) {
      await fetch(`${BACKEND_URL}/deleteBot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botId }),
      })
      .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if(data.success){
            let newList = bots.filter(bot => bot.id !== botId);
            setBots(newList);
            showMesage('Bot deleted');
          }
        })
        .catch(err => console.log(err))
        .finally (() => setEditDialogOpen(false));
    }
  };

  const updateBotInfo = async (botId) => {
    await fetch(`${BACKEND_URL}/updateBotInfo2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        botId,
        currentBusinessName,
        currentBusinessUrl,
        currentPhoneNumberId,
        currentWhatsappApiKey,
        currentTelegramApiKey,
        currentBotName,
      }),
    })
    .then((res) => res.json())
      .then((data) => {
        //alert(data);
        showMesage('Bot updated');
        const index = bots.findIndex(bot => bot.id === botId);
        setBots([
          ...bots.slice(0, index),
          {...bots[index], bot_name: currentBotName, business_name: currentBusinessName},
          ...bots.slice(index + 1),
        ])
      })
      .catch(err => console.log(err))

  }

  const showMesage = (message) => {
    setMessageAlert(message)
    setAlertOpen(true);
  }

  return (
    
    <div className="mybots">
    <NavBar/> 
    <div className="marginTop"></div>
    <div className="container2">
    <div className="title2">
    <h2>My bots</h2>
    </div>
    <StyledTableContainer className="tableContainer" component={Paper}>
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
              <StyledTableRow onClick={(event) => handleEditButtonClick(bot, event)} key={bot.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
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
                  {
                    (!bot.isLoadingWhatsapp)
                    ?
                    <Switch {...label} 
                    checked={bot.whatsapp_enable == "1" ? true : false}
                    onChange={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleChangeWhatsapp(bot);
                      //handleClickOpen(bot.id);
                    }}
                    />
                    :
                    <CircularProgress />
                  }
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {
                    (!bot.isLoadingTelegram)
                    ?
                    <Switch {...label} 
                    checked={bot.telegram_enable == "1" ? true : false}
                    onChange={(e)=> {
                      e.stopPropagation();
                      e.preventDefault();
                      handleChangeTelegram(bot);
                    }}
                    />
                    :
                    <CircularProgress />
                  }
                </StyledTableCell>

                {
                  (!isSmallScreen)?
                  <>
                <StyledTableCell align="center">
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    handleEditButtonClick(bot, e);
                  }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteButtonClick(bot)
                    
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

      <Snackbar open={alertOpen} autoHideDuration={2500} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '90%' }}>
          {messageAlert}
        </Alert>
      </Snackbar>

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
            id="phoneNumberId"
            label="Phone Number Id"
            type="text"
            fullWidth
            value={currentPhoneNumberId}
            onChange={(e) => setCurrentPhoneNumberId(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField className="myTextField"
            margin="dense"
            id="whatsappApiKey"
            label="Whatsapp Api Key"
            type="text"
            fullWidth
            value={currentWhatsappApiKey}
            onChange={(e) => setCurrentWhatsappApiKey(e.target.value)}
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
          <Button onClick={() => {
            handleDeleteButtonClick(botId);
          }}
          style={{color: 'red'}}
          >
            Delete
          </Button>
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

      <Dialog open={openConfirmationDialog} onClose={() => handleConfirmationDialogClose(false)} className="myDialogDelete">
        <DialogContent style={{background:"#F4F9FD", borderRadius: "20px"}}>
          <ErrorOutlineOutlined color="error" style={{fontSize:"72px", width: "100%"}}/>
          <DialogContentText style={{color:"#42A5F6"}}>Are you sure you want to delete this bot?</DialogContentText>
          <hr style={{borderColor: "#059CF1", borderWidth: "0.2px"}} />
        </DialogContent>
        <DialogActions style={{background:"#F4F9FD"}}>
          <Button onClick={() => handleConfirmationDialogClose(false)}>Cancel</Button>
          <Button onClick={() => handleConfirmationDialogClose(true)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  );
};
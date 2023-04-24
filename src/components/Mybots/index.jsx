
import React, { useState, useEffect } from "react";
import { NavBar } from '../NavBar'
import './Mybots.css'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,

} from "reactstrap";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

export const Mybots = () => {
  const [bots, setBots] = useState([]);
  const [whatsappEnable, setWhatsappEnable] = useState(true);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    fetch("http://localhost:3001/getData", {
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
      .catch(err => console.log(err))
   
  };

  const updateWhatsappEnable = async (whatsapp_enable, botId) => {
    await fetch("http://localhost:3001/updateWhatsappEnable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({whatsapp_enable, botId}),
    });
  }

  const updateTelegramEnable = async (telegram_enable, botId) => {
    await fetch("http://localhost:3001/updateTelegramEnable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({telegram_enable, botId}),
    });
  }

  const handleChangeTelegram = (botId) => {
    const updatedBots = bots.map(bot => {
      if (bot.id === botId) {
        bot.telegram_enable = bot.telegram_enable === 1 ? 0 : 1;
        updateTelegramEnable(bot.telegram_enable, bot.id);
      }
      return bot;
    });
    setBots(updatedBots);
  };

  const handleChangeWhatsapp = (botId) => {
    const updatedBots = bots.map(bot => {
      if (bot.id === botId) {
        bot.whatsapp_enable = bot.whatsapp_enable === 1 ? 0 : 1;
        updateWhatsappEnable(bot.whatsapp_enable, bot.id);
      }
      return bot;
    });
    setBots(updatedBots);
  };


  return (
    
    <div>
    <NavBar/>
    <h2>Mys bots</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <StyledTableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Prompt&nbsp;</StyledTableCell>
                <StyledTableCell align="center">TelegramApiKey&nbsp;</StyledTableCell>
                <StyledTableCell align="center">WhatsappApiKey&nbsp;</StyledTableCell>
                <StyledTableCell align="center">WhatsappEnable&nbsp;</StyledTableCell>
                <StyledTableCell align="center">TelegramEnable&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Creation Status&nbsp;</StyledTableCell>
            </StyledTableRow>
        </TableHead>
        <TableBody>
        {bots.map(bot => (
              <StyledTableRow key={bot.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component="th" scope='row'>{bot.id}</StyledTableCell>
                <StyledTableCell align='center'>{bot.prompt}</StyledTableCell>
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
                <StyledTableCell align='center'>
                  <Switch {...label} 
                  checked={bot.whatsapp_enable == 1 ? true : false}
                  onChange={()=> {
                    handleChangeWhatsapp(bot.id);
                    }}/>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <Switch {...label} 
                  checked={bot.telegram_enable == 1 ? true : false}
                  onChange={()=> {
                    handleChangeTelegram(bot.id);
                    }}/>
                </StyledTableCell>
                
                <StyledTableCell align='center'>
                  <Input
                    type="checkbox"
                    id={`check${bot.id}`}
                  />
                </StyledTableCell>
                {/* <StyledTableCell align='center'>{bot.bot_runnning}</StyledTableCell>*/}
              </StyledTableRow>
                ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
  );
};

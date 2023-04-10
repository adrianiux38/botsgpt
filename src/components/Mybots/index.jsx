
import React, { useState, useEffect } from "react";
import { NavBar } from '../NavBar'
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
import TextField from '@mui/material/TextField';

export const Mybots = () => {
  const [bots, setBots] = useState([]);

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
    fetch("https://botsgpt.adriangutierr26.repl.co/getData", {
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
                <StyledTableCell align="center">Creation Status&nbsp;</StyledTableCell>
            </StyledTableRow>
        </TableHead>
        <TableBody>
        {bots.map(bot => (
            <StyledTableRow key={bot.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                 <StyledTableCell component="th" scope='row'>{bot.id}</StyledTableCell>
                <StyledTableCell align='center'>{bot.prompt}</StyledTableCell>
                <StyledTableCell align='center'>{bot.telegramApiKey}</StyledTableCell>
                <StyledTableCell align='center'>{bot.creation_status}</StyledTableCell>
            </StyledTableRow>
                ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
  );
};

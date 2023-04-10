import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Header } from '../Header';
import TextField from '@mui/material/TextField';
import { NavBar } from '../NavBar';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const PromptForm = ({showBot}) => { 
    const [botGoal, setBotGoal] = useState("");
    const [telegramApiKey, setTelegramApiKey] = useState("");
    const changeBotGoal = (e) => setBotGoal(e.target.value);
    const changeApiKey = (e) => setTelegramApiKey(e.target.value);


    const handleSendButton = () => {
        fetch('https://botsgpt.adriangutierr26.repl.co/createBot', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            botGoal: botGoal,
            telegramApiKey: telegramApiKey
          })
        })
        .then(res => res.json())
        .then(async (data) => {
            try{
              console.log(data)
              //Ahora si mostramos que su bot ya se pudo crear
              showBot()
            }
            catch(error){
              console.log("OpenAI no mandó un formato JSON válido")
            }
            
        })
        .catch(err => console.log(err))
        
      }

    return(
    <div>
        <NavBar/>
        <Header/>
        <Box id="box" sx={{width: '100%', display: "flex", paddingTop:"5%", alignContent:"center", flexDirection:"column", alignItems:"center", justifyContent:"center", justifyItems:"center", justifySelf:"center"}}>
        <h1 style={{maxWidth:'70%', color:'white'}}>Create your own ChatGPT for your business</h1>

        <Box
        component="form"
        sx={{display:'flex', alignSelf:'center', alignContent:'center',maxWidth:'100%', justifyContent:'center', color:'white',
        '& .MuiTextField-root': { m: 1, width: '70vw', alignSelf:'center', display:'flex'},
        }}
        noValidate
        autoComplete="off"
    >
        <div>
        <TextField
            id="outlined-multiline-flexible"
            label="Describe what your AI has to do"
            type="text"
            value={botGoal}
            onChange={changeBotGoal}
            multiline
            maxRows={4}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="Input your telegram API Key"
            type="text"
            value={telegramApiKey}
            onChange={changeApiKey}
            multiline
            maxRows={4}
        />
        </div>
        </Box>

        <Stack spacing={2} direction="row">
        <Button id="webcreate" variant="contained" sx={{marginTop:"20px"}} onClick={()=> {handleSendButton()}}>Create</Button>
        </Stack>
    </Box>
  </div>
    );
} 


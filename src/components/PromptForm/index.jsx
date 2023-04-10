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
    const [userContent1, setUserContent1] = useState("");
    const [userContent2, setUserContent2] = useState("");
    const [userContent3, setUserContent3] = useState("");
    const [assistantContent1, setAssistantContent1] = useState("");
    const [assistantContent2, setAssistantContent2] = useState("");
    const [assistantContent3, setAssistantContent3] = useState("");

    const changeBotGoal = (e) => setBotGoal(e.target.value);
    const changeApiKey = (e) => setTelegramApiKey(e.target.value);
    const changeUserContent1 = (e) => setUserContent1(e.target.value);
    const changeUserContent2 = (e) => setUserContent2(e.target.value);
    const changeUserContent3 = (e) => setUserContent3(e.target.value);
    const changeAssistantContent1 = (e) => setAssistantContent1(e.target.value);
    const changeAssistantContent2 = (e) => setAssistantContent2(e.target.value);
    const changeAssistantContent3 = (e) => setAssistantContent3(e.target.value);


    const handleSendButton = () => {
        fetch('https://botsgpt.adriangutierr26.repl.co/createBot', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            botGoal: botGoal,
            telegramApiKey: telegramApiKey,
            userContent1: userContent1,
            userContent2: userContent2,
            userContent3: userContent3,
            assistantContent1: assistantContent1, 
            assistantContent2: assistantContent2,
            assistantContent3: assistantContent3
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
        <TextField
            id="outlined-multiline-flexible"
            label="Training user query 1"
            type="text"
            value={userContent1}
            onChange={changeUserContent1}
            multiline
            maxRows={4}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="Training agent response 1"
            type="text"
            value={assistantContent1}
            onChange={changeAssistantContent1}
            multiline
            maxRows={4}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="Training user query 2"
            type="text"
            value={userContent2}
            onChange={changeUserContent2}
            multiline
            maxRows={4}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="Training agent response 2"
            type="text"
            value={assistantContent2}
            onChange={changeAssistantContent2}
            multiline
            maxRows={4}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="Training user query 3"
            type="text"
            value={userContent3}
            onChange={changeUserContent3}
            multiline
            maxRows={4}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="Training agent response 3"
            type="text"
            value={assistantContent3}
            onChange={changeAssistantContent3}
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


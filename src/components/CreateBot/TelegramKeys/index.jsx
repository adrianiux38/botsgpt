import React from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import { Button, TextField, Box, ThemeProvider, Grid } from '@mui/material';
import  Info from './assets/info.svg'

const TelegramKeys = ({handleCancel, handleContinue, handleBack, updateStepData }) => {
  const changeTelegramKey = (e) => updateStepData({ telegramApiKey: e.target.value });
    return (
      <ThemeProvider theme={userSignTheme}>
        <Grid container sx={{ minHeight: '100vh', background: 'linear-gradient(45deg, #6a1b9a 30%, #42a5f5 90%)' }}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
              }}
            >

              <Box
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  bgcolor: 'white',
                  position: 'relative',
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{ flex: '1', height: '100%' }}
                >
                  <Grid container sx={{display:'flex' }}>
                      <Grid item xs sx={{display:'flex', alignSelf:'flex-start'}}>
                      <Box my={1}>
                          <Button variant='contained' color= 'error' onClick={handleCancel}>
                          Cancel
                          </Button>
                      </Box>
                      </Grid>
                  </Grid>
                  <p style={{display: 'flex', fontFamily:'poppins', fontSize:'1.2em', marginBottom: '0%', color:'#6F3FF8', fontWeight:'bold'}}>Telegram API Token</p>
                  <TextField
                    fullWidth
                    id='custom-input'
                    label='Telegram Api Token'
                    variant='outlined'
                    sx={{ alignSelf: 'center', justifySelf: 'center', mb:'4%', mt:'4%'}}
                    onChange={changeTelegramKey}
                  />
                  <div style={{display:"flex", flexDirection:'row', justifyContent:"center", alignContent:"center", justifyItems:"center", marginBottom:'3%'}}>
                  <img src={Info} style={{marginRight:'2%'}}/>
                  <a href='www.youtube.com/adrianguts'><p style={{display: 'flex', fontFamily:'inter', fontSize:'1em', color:'rgba(0, 0, 0, 0.5)', fontWeight:'bold'}}>Watch our video about how to get your Whatsapp Api Key and Phone number Id</p></a>
                  </div>
                 <Grid container sx={{display:'flex'}}>
                    <Grid item xs sx={{display:'flex', flex: 0.5, justifyContent:'flex-start'}}>
                      <Box my={1}>
                        <Button variant='contained' color='backbutton' onClick={handleBack}>
                          Go back
                        </Button>
                      </Box>
                    </Grid>
                      <Grid item xs sx={{display:'flex', flex: 0.5, justifyContent:'flex-end'}}>
                      <Box my={1}>
                        <Button variant='contained' color='success' onClick={handleContinue}>
                          Continue
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  };

  export default TelegramKeys;
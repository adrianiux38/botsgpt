import { React, useState, useEffect } from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import { Button, TextField, Box, ThemeProvider, Grid } from '@mui/material';
import  Info from './assets/info.svg'
import useTextFieldData from '../../../hooks/useTextFieldData';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import "./Telegram.css"

const TelegramKeys = ({handleCancel, handleContinue, handleBack, updateStepData, botId }) => {
  const { textFieldValue1, handleTextField1Change } = useTextFieldData(botId, 7);
  const [isValidStep, setIsValidStep] = useState(false);
  const [isOpen, setOpen] = useState(false);

 const openModal = () => {
   setOpen(true);
  }

  const changeTelegramKey = (e) => {
    handleTextField1Change(e)
    updateStepData({ telegram_api_key: e.target.value });
    setIsValidStep((e.target.value !== '') && ( e.target.value !== null));
  }

  useEffect(() => {	
    setIsValidStep((textFieldValue1 !== '') && ( textFieldValue1 !== null));      	
  }, [textFieldValue1]);
    
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
                  width: {
                    xs: '80%', // en pantallas extra pequeñas (menos de 600px) el ancho será del 90%
                    sm: '75%', // en pantallas pequeñas (600px o más) el ancho será del 75%
                    md: '60%', // en pantallas medianas (960px o más) el ancho será del 60%
                    lg: '50%', // en pantallas grandes (1280px o más) el ancho será del 50%
                  },
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
                    focused={true}
                    variant='outlined'
                    sx={{ alignSelf: 'center', justifySelf: 'center', mb:'4%', mt:'4%'}}
                    value={ textFieldValue1 }
                    onChange={changeTelegramKey}
                  />
                  <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId='NnZ55c2IMlM' onClose={() => setOpen(false)} />
                  <div style={{display:"flex", flexDirection:'row', justifyContent:"center", alignContent:"center", justifyItems:"center", marginBottom:'3%'}}>
                    <img src={Info} style={{marginRight:'2%'}} alt='info' />
                    <p className="linkStyle" onClick={openModal}>
                      Watch our video about how to get your Telegram Api Key
                    </p>

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
                        <Button variant='contained' color='success' onClick={handleContinue} disabled={!isValidStep}>
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
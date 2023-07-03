import React from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import useTextFieldData from '../../../hooks/useTextFieldData';
import { Button, TextField, Box, ThemeProvider, Grid } from '@mui/material';
import  Info from './assets/info.svg'

const WhatsappKeys = ({handleCancel, handleContinue, handleBack, updateStepData, botId }) => {
  const { textFieldValue1, textFieldValue2, handleTextField1Change, handleTextField2Change, isLoading } = useTextFieldData(botId, 8);

  const handleChange1 = (e) => {
    handleTextField1Change(e);
    updateStepData({ whatsappApiKey: e.target.value });
  }

  const handleChange2 = (e) => {
    handleTextField2Change(e);
    updateStepData({ whatsappPhoneId: e.target.value });
  }

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
                  <p style={{display: 'flex', fontFamily:'poppins', fontSize:'1.2em', marginBottom: '0%', color:'#6F3FF8', fontWeight:'bold'}}>Whatsapp API Key</p>
                  <TextField
                    fullWidth
                    id='whatsapp-api-key-input'
                    label='Whatsapp Api Key'
                    variant='outlined'
                    placeholder={ textFieldValue1 ? '' : 'Whatsapp Api Key'}
                    value={ textFieldValue1 }
                    onChange={handleChange1}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ alignSelf: 'center', justifySelf: 'center', mb:'4%', mt:'4%'}}
                  />
                  <p style={{display: 'flex', fontFamily:'poppins', fontSize:'1.2em', marginBottom: '0%', color:'#6F3FF8', fontWeight:'bold'}}>Phone Number ID</p>
                  <TextField
                    fullWidth
                    id='phone-number-id-input'
                    label='Phone number ID'
                    variant='outlined'
                    placeholder={ textFieldValue2 ? '' : 'Meta Phone Number ID'}
                    value={ textFieldValue2 }
                    onChange={handleChange2}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ alignSelf: 'center', justifySelf: 'center', mb:'1%', mt:'4%'}}
                  />
                  <div style={{display:"flex", flexDirection:'row', justifyContent:"center", alignContent:"center", justifyItems:"center", marginBottom:'3%'}}>
                  <img src={Info} style={{marginRight:'2%'}}/>
                  <a href='https://youtu.be/NUwN3exDJ6Y'><p style={{display: 'flex', fontFamily:'inter', fontSize:'1em', color:'rgba(0, 0, 0, 0.5)', fontWeight:'bold'}}>Watch our video about how to get your Whatsapp Api Key and Phone number Id</p></a>
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

  export default WhatsappKeys;
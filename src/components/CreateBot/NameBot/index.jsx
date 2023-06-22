import {React, useState } from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import useTextFieldData from '../../../hooks/useTextFieldData';
import { Button, TextField, Box, ThemeProvider, Grid } from '@mui/material';

const NameBot = ({handleCancel, handleContinue, handleBack, updateStepData, botId}) => {
  const { textFieldValue1, textFieldValue2, handleTextField1Change, handleTextField2Change, isLoading } = useTextFieldData(botId, 1);
  const handleChange1 = (e) => {
    handleTextField1Change(e);
    updateStepData({ botName: e.target.value });
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
                  <p style={{fontFamily:'poppins', fontSize:'1.6em', marginBottom: '1%'}}>Write the name of your custom Gpt</p>
                  <TextField
                    fullWidth
                    id='custom-input'
                    label='Your AI Name'
                    placeholder={ textFieldValue1 ? '' : 'Your AI Name'}
                    value={ textFieldValue1 }
                    onChange={handleChange1}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='outlined'
                    sx={{ alignSelf: 'center', justifySelf: 'center', mb:'4%', mt:'4%'}}
                  />
                 <Grid container sx={{display:'flex'}}>
                    <Grid item xs sx={{display:'flex', flex: 0.5, justifyContent:'flex-start'}}>
                      <Box my={1}>

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

  export default NameBot;
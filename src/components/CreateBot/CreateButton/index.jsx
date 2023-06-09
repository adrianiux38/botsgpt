import React from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import { Button, Box, ThemeProvider, Grid } from '@mui/material';

const CreateButton = ({ handleCancel, handleBack, createBot, botId}) => {
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
                  <Grid container sx={{ display: 'flex' }}>
                    <Grid item xs sx={{ display: 'flex', alignSelf: 'flex-start' }}>
                      <Box my={1}>
                        <Button variant='contained' color='error' onClick={handleCancel}>
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <p style={{ fontFamily: 'poppins', fontSize: '1.6em', marginBottom: '1%' }}>Congratulations! Your bot is Ready</p>

                  {/* Replaced TextField with a Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {createBot(botId); handleCancel();}}
                    sx={{ alignSelf: 'center', justifySelf: 'center', mb: '6%', mt: '6%', width: '50%' }}
                  >
                    Create my bot
                  </Button>

                  <Grid container sx={{ display: 'flex' }}>
                    <Grid item xs sx={{ display: 'flex', flex: 0.5, justifyContent: 'flex-start' }}>
                      <Box my={1}>
                        <Button variant='contained' color='backbutton' onClick={handleBack}>
                          Go back
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

  export default CreateButton;
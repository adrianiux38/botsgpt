import React from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import useTextFieldData from '../../../hooks/useTextFieldData';
import { Button, TextField, Box, ThemeProvider, Grid } from '@mui/material';

const AdditionalDetails = ({handleCancel, handleContinue, handleBack, updateStepData, botId}) => {
const { textFieldValue1, textFieldValue2, handleTextField1Change, handleTextField2Change, isLoading } = useTextFieldData(botId, 6);

const handleChange1 = (e) => {
handleTextField1Change(e);
updateStepData({ additionalDetails: e.target.value });
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
                <p style={{fontFamily:'poppins', fontSize:'1.6em', marginBottom: '1%'}}>What else would you want your AI to do?</p>
                <TextField
                fullWidth
                id='custom-input'
                label='Additional Details'
                variant='outlined'
                placeholder={ textFieldValue1 ? '' : 'e.g. if the client asks for the top selling products, send him the following url: www.topsellingproducts.com'}
                value={ textFieldValue1 }
                onChange={handleChange1}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    alignSelf: 'center',
                    justifySelf: 'center',
                    mb: '4%',
                    mt: '4%',
                    '& .MuiOutlinedInput-input': {
                        paddingBottom: '20%',
                    }
                    }}
                />
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

export default AdditionalDetails;
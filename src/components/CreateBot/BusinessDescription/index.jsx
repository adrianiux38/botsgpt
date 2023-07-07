import {React, useState, useEffect} from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import useTextFieldData from '../../../hooks/useTextFieldData';
import { Button, TextField, Box, ThemeProvider, Grid } from '@mui/material';

const BusinessDescription = ({handleCancel, handleContinue, handleBack, updateStepData, botId}) => {
const { textFieldValue1, textFieldValue2, handleTextField1Change, handleTextField2Change, isLoading } = useTextFieldData(botId, 3);
const [isValidStep, setIsValidStep] = useState(false);

const handleChange1 = (e) => {
    handleTextField1Change(e);
    updateStepData({ businessDescription: e.target.value });
    setIsValidStep((e.target.value !== '') && ( e.target.value !== null));
    }
    
    const handleFocus= (e) => {
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
                <p style={{fontFamily:'poppins', fontSize:'1.6em', marginBottom: '1%'}}>What does your business do/sell?</p>
                <TextField
                fullWidth
                autoFocus
                id='custom-input'
                label='Describe your business'
                variant='outlined'
                placeholder={ textFieldValue1 ? '' : 'Describe your business'}
                value={ textFieldValue1 }
                onChange={(e) => {if(e.target.value.length <= 300) handleChange1(e)}}
                InputLabelProps={{
                    shrink: true,
                }}
                multiline
                inputProps={{ maxLength: 300 }}
                rows={5}
                rowsMax={5} // Número máximo de líneas antes de mostrar una barra de desplazamiento
                sx={{
                    alignSelf: 'center',
                    justifySelf: 'center',
                    mb: '4%',
                    mt: '4%',
                    
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

export default BusinessDescription;
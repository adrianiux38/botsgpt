import { React, useState, useEffect} from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import useTextFieldData from '../../../hooks/useTextFieldData';
import { Button, TextField,  Box, ThemeProvider, Grid, IconButton } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Whalogo from './assets/whasapp.png';
import Telegramlogo from './assets/telegram.png';
import { BACKEND_URL } from '../../../config';
import CheckCircle from '@mui/icons-material/CheckCircle';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

import './PlatformSelect.css'


const Card = ({ children, clicked, onClick }) => (
    <Box
      className={`botcategory${clicked ? ' botcategory-selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </Box>
  );

const PlatformSelect = ({ handleCancel, handleContinue, handleBack, updateStepData, botId }) => {
    const [selectedDivs, setSelectedDivs] = useState([]);
    const { textFieldValue1, textFieldValue2, handleTextField1Change, handleTextField2Change, isLoading } = useTextFieldData(botId, 5);

    useEffect(() => {
      if (textFieldValue1 !== undefined ) {
        if (parseInt(textFieldValue1, 10) === 1 && !selectedDivs.includes(1)) {
          setSelectedDivs(prevSelectedDivs => [...prevSelectedDivs, 1]);
        } else if (parseInt(textFieldValue1, 10) === 0 && selectedDivs.includes(1)) {
          setSelectedDivs(prevSelectedDivs => prevSelectedDivs.filter((divIndex) => divIndex !== 1));
        }
      }
    }, [textFieldValue1]);

    useEffect(() => {    
      if (textFieldValue2 !== undefined) {
        console.log('textFieldValue2: ' + textFieldValue2)
        if (parseInt(textFieldValue2, 10) === 2 && !selectedDivs.includes(2)) {
          setSelectedDivs(prevSelectedDivs => [...prevSelectedDivs, 2]);
        } else if (parseInt(textFieldValue2, 10) === 0 && selectedDivs.includes(2)) {
          setSelectedDivs(prevSelectedDivs => prevSelectedDivs.filter((divIndex) => divIndex !== 2));
        }
      }
    }, [textFieldValue2]);

    const handleClick = (index) => {
      if (selectedDivs.includes(index)) {
        setSelectedDivs(selectedDivs.filter((divIndex) => divIndex !== index));
      } else {
        setSelectedDivs([...selectedDivs, index]);
      }
    };

    useEffect(()=> {
      fetch(`${BACKEND_URL}/getBotData2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botId }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(12123)
        console.log(data[0]);
        let res = []
        const whatsapp = data[0].whatsapp_selected;
        const telegram = data[0].telegram_selected;
        if(whatsapp == "1") res.push(1);
        if(telegram == "1") res.push(2);
        setSelectedDivs(res);
      })
      .catch(err => console.log(err))
    },[]);

    const changeSelectedPlatforms = () => {
      if (selectedDivs.length === 0) {
        alert("Please select a platform in order to continue");
        return;
      } else if (selectedDivs.length > 0) { 
        const telegramSelected = selectedDivs.includes(2) ? 1 : 0;
        const whatsappSelected = selectedDivs.includes(1) ? 1 : 0;

        console.log('telegramselected: ' + telegramSelected);
        console.log('whatsappSelected: ' + whatsappSelected);

        updateStepData({ telegramSelected, whatsappSelected });
        handleContinue();
      }
    };

    const handleContinueWithPlatforms = () => {
      changeSelectedPlatforms();
    };

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
                flexDirection:'column'
              }}
            >
            <Grid container sx={{display:'flex'}}>
                <Grid item xs sx={{display:'flex', alignSelf:'flex-start'}}>
                    <Box my={1}>
                        <Button variant='contained' color= 'error' onClick={handleCancel}>
                        Cancel
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <p style={{fontFamily:'poppins', fontSize:'1.6em', marginBottom: '5%', marginTop:'1%'}}>Where do you want to interact with your custom ChatGPT?</p>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '5%',
                  width: '65%',
                  height: '50%',
                }}
              >
                  <Card key={1} clicked={selectedDivs.includes(1)} onClick={() => handleClick(1)}>
                    <img src={Whalogo} style={{maxWidth:'150px', marginTop: '5%'}}/>
                    <p style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                      Whatsapp
                    </p>
                    {selectedDivs.includes(1) ? (
                        <CheckCircle color="primary" style={{marginBottom:'6%'}}/>
                    ) : (
                        <CheckCircleOutline color="disabled" style={{marginBottom:'6%'}}/>
                    )}
                  </Card>
                  <Card key={2} clicked={selectedDivs.includes(2)} onClick={() => handleClick(2)}>
                    <img src={Telegramlogo} style={{maxWidth:'150px', marginTop: '5%'}}/>
                    <p style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                      Telegram
                    </p>
                    {selectedDivs.includes(2) ? (
                        <CheckCircle color="primary" style={{marginBottom:'6%'}}/>
                    ) : (
                        <CheckCircleOutline color="disabled" style={{marginBottom:'6%'}}/>
                    )}
                  </Card>
              </Box>
              <Grid container sx={{display:'flex', marginTop: '5%'}}>
                    <Grid item xs sx={{display:'flex', flex: 0.5, justifyContent:'flex-start'}}>
                      <Box my={1}>
                        <Button variant='contained' color='backbutton' onClick={handleBack}>
                          Go back
                        </Button>
                      </Box>
                    </Grid>
                      <Grid item xs sx={{display:'flex', flex: 0.5, justifyContent:'flex-end'}}>
                      <Box my={1}>
                        <Button variant='contained' color='success' onClick={handleContinueWithPlatforms} disabled={selectedDivs.length === 0}>
                          Continue
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default PlatformSelect;
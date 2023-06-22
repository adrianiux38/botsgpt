import { React, useState} from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Button, TextField,  Box, ThemeProvider, Grid, IconButton } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import './CategorySelect.css'

const Card = ({ children, clicked, onClick, updateStepData }) => (
    
  <Box className={`botcategory${clicked ? ' botcategory-selected' : ''}`} onClick={onClick}>
    {children}
  </Box>
);


const CategorySelect = ({ handleCancel, handleContinue, handleBack }) => {
    const [selectedDiv, setSelectedDiv] = useState(null);

    const handleClick = (index) => {
        setSelectedDiv(index);
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
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection:'column'
              }}
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
            <p style={{fontFamily:'poppins', fontSize:'1.6em', marginBottom: '5%', marginTop:'1%'}}>What do you want your AI to do?</p>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '5%',
                  width: '100%',
                  height: '50%',
                }}
              >
                  <Card key={1} clicked={selectedDiv === 1} onClick={() => handleClick(1)}>
                    <IconButton disableRipple disableFocus>
                      <AttachMoneyIcon style={{fontSize:'150px'}} />
                    </IconButton>
                    <p style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                      Sales Agent
                    </p>
                  </Card>
                  <Card key={2} clicked={selectedDiv === 2} onClick={() => handleClick(2)}>
                    <IconButton disableRipple disableFocus>
                      <SupportAgentIcon style={{fontSize:'150px'}} />
                    </IconButton>
                    <p style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                      Customer Service
                    </p>
                  </Card>
                  <Card key={3} clicked={selectedDiv === 3} onClick={() => handleClick(3)}>
                    <IconButton disableRipple disableFocus>
                      <CalendarMonthOutlinedIcon style={{fontSize:'150px'}} />
                    </IconButton>
                    <p style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                      Book meetings
                    </p>
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
                        <Button variant='contained' color='success' onClick={handleContinue}>
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

export default CategorySelect;
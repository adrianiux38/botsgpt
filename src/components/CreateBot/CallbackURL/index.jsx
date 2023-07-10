import {React, useState , useEffect,useRef} from 'react';
import { userSignTheme } from '../../../utils/userSignTheme';
import useTextFieldData from '../../../hooks/useTextFieldData';
import { Button, TextField, Box, ThemeProvider, Grid } from '@mui/material';
import  Info from './assets/info.svg'
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {ToastContainer, toast } from 'react-toastify';
import "./Callback.css"

const CallbackURL= ({handleCancel, handleContinue, handleBack, updateStepData, botId }) => {
  
  const [isValidStep, setIsValidStep] = useState(false);
  
  const [isOpen, setOpen] = useState(false);

  const textRef = useRef(null);

  function handleCopyClick() {
    const text = textRef.current.innerText;
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard!");
        
      })
      .catch(err => {
        console.error('Error al copiar texto: ', err);
      });
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
                  <p style={{display: 'flex', fontFamily:'poppins', fontSize:'1.2em', marginBottom: '0%', color:'#6F3FF8', fontWeight:'bold'}}>Whatsapp Callback URL</p>
                  <div className="Copy" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <div style={{padding:"15px", margin: "25px", backgroundColor: '#E0E0E0', borderRadius:"100px",  }}>
                      <p style={{color:'dark-gray', fontWeight:"700"}}  ref={textRef}>https://whats-node-gpt-AdrianGutierr26.replit.app/chatbot</p>
                    </div>
                    <Button variant='contained' color='success' style={{marginBottom:"30px"}} onClick={()=>{handleCopyClick(); setIsValidStep(true)}}>
                    <FileCopyIcon style={{marginRight:"5px" }} />
                      Copy CallbackURL</Button>
                      <ToastContainer position="bottom-left" />
                  </div>
                                    
                    <div style={{ display:"flex", flexDirection:'row', justifyContent:"center", alignContent:"center", justifyItems:"center", marginBottom:'3%'}}>
                      <img src={Info} style={{marginRight:'2%'}}/>
                      <p className="linkStyle" onClick={()=> setOpen(true)}>
                        Watch our video about how to use this Callback
                      </p>
                      <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="NUwN3exDJ6Y" onClose={() => setOpen(false)} />
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

  export default CallbackURL;
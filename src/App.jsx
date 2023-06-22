import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Mybots } from './components/Mybots';
import { PromptForm } from './components/PromptForm';
import {React, useState, useEffect} from 'react';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import { Container, Box, Typography } from '@mui/material';

import CreateBot from './components/CreateBot';

import { isMobileDevice } from './utils/checkdevice';

function App() {
  const [botCreated, setBotCreated] = useState(false);



  function showBot(){
    setBotCreated(true)
  }

  const mobileWarning = isMobileDevice() ? (
    <div className="mobile-warning">
    Please access using your computer/laptop
  </div>
  ) : null;

  if (isMobileDevice()) {
    return (
      <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          boxShadow={2}
          borderRadius={4}
          p={3}
        >
          <Typography variant="h5">Please access using a desktop computer or laptop</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Mybots />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/my-bots" element={<Mybots />} />
          <Route path="/set-password" element={<RegisterComponent />} />
          <Route path="/create-bot" element={<CreateBot/>} />
        </Routes>
      </Router>

      {/*{botCreated && <p>Your own Gpt has been created!</p>}*/}
    </div>
  );
}

export default App;
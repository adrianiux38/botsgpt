import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Mybots } from './components/Mybots';
import { PromptForm } from './components/PromptForm';
import {React, useState} from 'react';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import { isMobileDevice } from './utils/checkdevice';
import { Container, Box, Typography } from '@mui/material';

function App() {
  const [botCreated, setBotCreated] = useState(false);
  function showBot() {
    setBotCreated(true);
  }

 

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Mybots />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/my-bots" element={<Mybots />} />
          <Route path="/set-password" element={<RegisterComponent />} />
          <Route path="/create-bot" element={<PromptForm showBot={showBot} />} />
        </Routes>
      </Router>

      {/*{botCreated && <p>Your own Gpt has been created!</p>}*/}
    </div>
  );
}

export default App;

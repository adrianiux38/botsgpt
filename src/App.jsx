import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Mybots } from './components/Mybots';
import CreateBot from './components/CreateBot';
import Account from './components/Account';
import Forgot from './components/Forgot';
import { React, useState } from 'react';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import UserContex from './context/UserContext';
import MyBotContext from './context/MyBotContext';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {

  const [userData, setUserData] = useState({
    email: localStorage.getItem('email'),
    token: localStorage.getItem('token'),
    loggedWith: localStorage.getItem('loggedWith'),
  });

  const [myBotData, setMyBotData] = useState(null);

  return (
    <UserContex.Provider value={[userData, setUserData]}>
      <MyBotContext.Provider value={[myBotData, setMyBotData]}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Mybots />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/my-bots" element={<Mybots />} />
              <Route path="/set-password" element={<RegisterComponent />} />
              <Route path="/create-bot/" element={<CreateBot />} />
              <Route path="/account" element={<Account />} />
              <Route path="/forgot" element={<Forgot />} />
            </Routes>
          </Router>
        </div>
      </MyBotContext.Provider>
    </UserContex.Provider>
  );
}

export default App;

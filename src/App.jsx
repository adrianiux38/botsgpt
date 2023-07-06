import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Mybots } from './components/Mybots';
import CreateBot from './components/CreateBot';
import Account from './components/Account';
import { React, useState } from 'react';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import UserContex from './context/UserContext';

function App() {

  const [userData, setUserData] = useState(null)

  return (
    <UserContex.Provider value={[userData, setUserData]}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Mybots />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/my-bots" element={<Mybots />} />
            <Route path="/set-password" element={<RegisterComponent />} />
            <Route path="/create-bot" element={<CreateBot />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Router>
      </div>
    </UserContex.Provider>
  );
}

export default App;

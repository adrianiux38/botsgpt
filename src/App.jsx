import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Mybots } from './components/Mybots';
import CreateBot from './components/CreateBot';
import { React } from 'react';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Mybots />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/my-bots" element={<Mybots />} />
          <Route path="/set-password" element={<RegisterComponent />} />
          <Route path="/create-bot" element={<CreateBot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

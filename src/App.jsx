import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { Mybots } from './components/Mybots';
import { PromptForm } from './components/PromptForm';
import {React, useState} from 'react';


function App() {
  const [botCreated, setBotCreated] = useState(false);

  function showBot(){
    setBotCreated(true)
  }
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PromptForm showBot={showBot}/>}/>
          <Route path="/my-bots" element={<Mybots />}/>
          <Route path="/create-bot" element={<PromptForm showBot={showBot}/>}/>
        </Routes>
      </Router>
      
      {/*{botCreated && <p>Your own Gpt has been created!</p>}*/}
    </div>
  );
}

export default App;

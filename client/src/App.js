import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Main from './components/main';
import Fridge from './components/fridge';


function App() {
  return (
    <div className="App">
      <div className="bgimage"></div>
      <Router>
        <Main path='/'/>
        <Fridge path='/fridge'/>
      </Router>
    </div>
  );
}

export default App;

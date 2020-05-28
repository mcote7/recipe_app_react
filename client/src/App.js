import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Fridge from './components/fridge';
import Search from './components/search';
import Main from './components/main';


function App() {
  return (
    <div className="App">
      <div className="bgcolor"></div>
      <Router>
        <Main path='/'/>
        <Fridge path='/fridge'/>
        <Search path='/fridge-search'/>
      </Router>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import Game from './components/game.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Game />
      </div>
    );
  }
}

export default App;

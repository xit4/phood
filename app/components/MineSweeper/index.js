import React, { Component } from 'react';
import './style.scss';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }
}

export default App;
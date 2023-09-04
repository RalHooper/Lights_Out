import React, { Component } from 'react';
import Board from "./Board";
import './App.css';


class App extends Component {
  nrows = 5; // Replace with the desired number of rows
  ncols = 5; // Replace with the desired number of columns
  chanceLightStartsOn = 0.3;
  
  render() {
    return (
      <div className='App'>
      <Board
      nrows={this.nrows}
      ncols={this.ncols}
      chanceLightStartsOn={this.chanceLightStartsOn}
    />
      </div>
    );
  }
}

export default App;

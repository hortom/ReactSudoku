import * as React from "react";
import { Component } from 'react';
import GameBoard from './GameBoard.jsx';
import GameInput from './GameInput.jsx';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>React Sudoku Solver</h2>
                </div>
                <GameBoard store={this.props.store}/>
                <GameInput />
            </div>
        );
    }
}

export default App;

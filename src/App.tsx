import * as React from "react";
import GameBoard from './GameBoard';
import GameInput from './GameInput';

import './App.css';

class App extends React.PureComponent<any, any>
{
	render()
	{
        return (
            <div className="App">
                <div className="App-header">
                    <h2>React Sudoku Solver</h2>
                </div>
                <GameBoard store={this.props.store}/>
                <GameInput store={this.props.store}/>
            </div>
        );
    }
}

export default App;

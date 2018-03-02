import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App.jsx';
import SudokuStore from './SudokuStore';

import './index.css';

const store = new SudokuStore();

/*
import { Component } from 'react'
import {observer} from "mobx-react";

@observer
class Time extends Component
{
	render()
	{
		return(
			<h1>Times: {this.props.store.time}</h1>
		);
	}
}

ReactDOM.render(<Time store={store} />, document.getElementById('root'));
//*/
ReactDOM.render(<App store={store}/>, document.getElementById('root'));

window.addEventListener("keydown", function (event)
{
	if (event.defaultPrevented) {
		return; // Do nothing if the event was already processed
	}
  
	switch (event.key) {
		case "ArrowDown":
			console.log('down');
			store.selected += 9;
			// code for "down arrow" key press.
			break;
		case "ArrowUp":
			console.log('up');
			store.selected -= 9;
		// code for "up arrow" key press.
			break;
		case "ArrowLeft":
			console.log('left');
			store.selected -= 1;
		// code for "left arrow" key press.
			break;
		case "ArrowRight":
			console.log('right');
			store.selected += 1;
		// code for "right arrow" key press.
			break;
		default:
			return; // Quit when this doesn't handle the key event.
	}
  
	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window
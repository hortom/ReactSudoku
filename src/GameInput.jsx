import * as React from 'react'
import { Component } from 'react'
import './GameInput.css';

export default class GameInput extends Component {
	render() {
		return (
			<div className="GameInput">
				<input type="text" pattern="[0-9 \.]" title="Sudoku puzzle, allowed: 0-9 dot and space." placeholder="Input Sudoku here..."/>
			</div>
		)
	}
}

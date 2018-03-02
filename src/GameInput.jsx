import * as React from 'react'
import { Component } from 'react'
import './GameInput.css';
import { observer } from 'mobx-react';

@observer
export default class GameInput extends Component {
	constructor(props)
	{
		super(props);
		this.focusTextInput = this.focusTextInput.bind(this);
	}

	focusTextInput(focus)
	{
		if (this.textInput == undefined) return;

		if (focus && document.activeElement != this.textInput)
			this.textInput.focus();
		else if (!focus && document.activeElement == this.textInput)
			this.textInput.blur();
	}

	render() {
		const active = this.props.store.active == "input";
		const className = active ? "GameInput--input__active" : "GameInput--input";

		this.focusTextInput(active);

		return (
			<div className="GameInput">
				<input
					ref={(input) => { this.textInput = input; }}
					className={className}
					type="text"
					pattern="[0-9 \.]"
					title="Sudoku puzzle, allowed: 0-9 dot and space."
					placeholder="Input Sudoku here..."
				/>
			</div>
		)
	}
}

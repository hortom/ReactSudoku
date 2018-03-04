import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react';
import Button from './Button.jsx';

import './GameInput.css';

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
					id="GameInput"
					ref={(input) => { this.textInput = input; }}
					className={className}
					type="text"
					pattern="[0-9 \.]"
					title="Sudoku puzzle, allowed: 0-9 dot and space."
					placeholder="Input Sudoku here..."
				/>
				<Button classes=" Button__func BfLeft" id="ButtonImport" text="Import" />
				<Button classes=" Button__func BfLeft" id="ButtonExport" text="Export" />
				<Button classes=" Button__solve BfRight" id="ButtonFillSingles" text="Fill Singles (ENTER)" />
			</div>
		)
	}
}

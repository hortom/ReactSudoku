import * as React from "react";
import { Component } from 'react';
import SudokuField from './SudokuField.jsx';
import { observer } from 'mobx-react';

import './GameBoard.css';

@observer
export default class GameBoard extends Component {
	constructor(props)
	{
		super(props);
	}

	render() {
		const { boardData, selected, fixed } = this.props.store;

		const board = boardData.map(function(value, i) {
			const x = Math.floor((i % 9) / 3);
			const y = Math.floor(Math.floor(i / 9) / 3);
			return (
				<SudokuField
					id={i}
					key={i}
					value={value}
					additionalClasses={ (i == selected ? ' sfSelected' : '') + ((x + y) % 2 == 0 ? ' sfLight' : '') + (fixed[i] ? ' sfFix' : '') }
				/>
			);
		});

		return (
			<div className="GameBoard">
				{board}
			</div>
		)
	}
}

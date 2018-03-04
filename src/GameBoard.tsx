import * as React from "react";
import SudokuField from './SudokuField';
import { observer } from 'mobx-react';

import './GameBoard.css';

@observer
export default class GameBoard extends React.Component<any, any>
{
	render()
	{
		const { boardData, selected, order, isValid } = this.props.store;
		const active = this.props.store.active == "board";
		const board = boardData.map(function(value, i) {
			const x = Math.floor((i % 9) / 3);
			const y = Math.floor(Math.floor(i / 9) / 3);
			return (
				<SudokuField
					id={i}
					key={i}
					value={value}
					order={order[i]}
					additionalClasses={
						(active && i == selected ? ' sfSelected' : '') +
						((x + y) % 2 == 0 ? ' sfLight' : '') +
						(order[i] == 0 ? ' sfFix' : '') +
						(isValid ? '' : ' sfInvaild') 
					}
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

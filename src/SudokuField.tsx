import * as React from "react";

import './SudokuField.css';

export default class SudokuField extends React.Component<any, any>
{
	// to recognise the digits alone
	static sfNumbers = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256];

	shouldComponentUpdate(nextProps, nextState)
	{
		return (nextProps.value != this.props.value || nextProps.order != this.props.order || nextProps.additionalClasses != this.props.additionalClasses);
	}

	render() {
		const { value, id, additionalClasses, order } = this.props;
		const i = SudokuField.sfNumbers.indexOf(value);

		let nums;

		if (i == -1 || order < 0)
		{
			let s = '';
			for (let j = 1; j < 10 ; j++)
			{
				s += (value & SudokuField.sfNumbers[j] ? j : "\u00a0" ); // non breakable space
			}
			nums = <span>{s.substr(0, 3)}<br/>{s.substr(3, 3)}<br/>{s.substr(6, 3)}</span>;
		}

		const val = (nums == undefined ? <h1>{i}</h1> : nums);

		return(
			<div
				id={"sf-" + id}
				key={id}
				className={"SudokuField" + this.props.additionalClasses + (i == -1 ? " sfNums" : "")}
			>
				{val}
			</div>
		);
	}
}
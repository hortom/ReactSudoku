import * as React from "react";

import './Button.css';

export default class GameBoard extends React.PureComponent<any, any>
{
	render()
	{
		return (
			<div
				id={this.props.id}
				className={"Button" + this.props.classes}
			>
				{this.props.text}
			</div>
		);
	}
}
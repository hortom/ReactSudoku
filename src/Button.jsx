import * as React from "react";
import { Component } from 'react';

import './Button.css';

export default class GameBoard extends Component
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
import {observable, computed, action, reaction } from "mobx";
import { parseBoard } from './Helper.jsx';

export default class SudokuStore
{
	@observable boardData = [];
	@observable fixed = [];
	@observable active = 'board'; // what is the active area: board, input, none
	@observable selected = -1; // selected field on the board

	@observable time = 0;

	constructor()
	{
		//const b = '......68.....73..93.9....4549.......8.3.5.9.2.......3696....3.87..68.....28......'; // hard
		const b = '....7...43..1.5..9.5.294.3.6.....2...4.....6...2.....8.7.841.5.1..5.2..34...3....'; // medium
		//const b = '..8....37..2976.1.7.4..365....19..86..16253..69..34....574..9.3.4.7528..28....7..'; // easy
		parseBoard(b, this.boardData, this.fixed);
		this.selected = 0;
		/*
		for (let i = 0; i < 81; i++)
		{
			this.boardData[i] = 511;
			this.fixed[i] = 0;
		}
*/
		this.tick();
	}

	tick()
	{
		setTimeout(() => {
			this.increment()
			this.tick()
		}, 1000)
	}

	@action
	increment()
	{
		this.time++;
	}
}

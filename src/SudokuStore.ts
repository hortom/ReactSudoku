import {observable, computed, action, reaction } from "mobx";
import { parseBoard } from './util/Helper';
import Solver from './Solver';

export default class SudokuStore
{
	@observable boardData = [];
	@observable isValid = true;
	@observable order = []; // 0. fixed, any other like 1., 2., 3. is the order of the filled fields
	@observable active = 'board'; // what is the active area: board, input, none
	@observable selected = -1; // selected field on the board
	@observable mode = 'manual'; // mode: manual (user can input), solve (it will solve)

	@observable time = 0;

	nth = 1;
	nums = new Map([[0, 1], [1, 1], [2, 2], [4, 3], [8, 4], [16, 5], [32, 6], [64, 7], [128, 8], [256, 9]]);

	constructor()
	{
		//const b = '......68.....73..93.9....4549.......8.3.5.9.2.......3696....3.87..68.....28......'; // hard
		const b = '....7...43..1.5..9.5.294.3.6.....2...4.....6...2.....8.7.841.5.1..5.2..34...3....'; // medium
		//const b = '..8....37..2976.1.7.4..365....19..86..16253..69..34....574..9.3.4.7528..28....7..'; // easy
		parseBoard(b, this.boardData, this.order);
		this.init();
		this.selected = 0;

		Solver.initSolver(this);
		Solver.copyBoardBack();

		/*
		for (let i = 0; i < 81; i++)
		{
			this.boardData[i] = 511;
			this.fixed[i] = 0;
		}
*/
	}

	init()
	{
		this.nth = 1;
	}

	@action
	importBoard(b)
	{
		parseBoard(b, this.boardData, this.order);
		this.init();
		this.simplify();
	}

	exportBoard()
	{
		let s = "";
		for (let i = 0; i < 81; i++)
		{
			s += this.order[i] >= 0 && this.nums.has(this.boardData[i]) ? this.nums.get(this.boardData[i]) : '.';
		}

		return s;
	}

	@action
	setField(value:number, eliminate:boolean)
	{
		const v = 1 << (value - 1);

		if (this.order[this.selected] < 0 && (this.boardData[this.selected] & v) != 0)
		{
			this.boardData[this.selected] = v;
			this.order[this.selected] = this.nth++;
			
			if (eliminate)
			{
				this.simplify();
			}
		}
	}

	@action
	clearField()
	{
		if (this.order[this.selected] > 0)
		{
			for (let i = 0; i < 81; i++)
			{
				if (this.order[i] < 0 || !this.nums.has(this.boardData[i]))
					this.boardData[i] = 511;
			}
			this.order[this.selected] = -1;
			this.boardData[this.selected] = 511;

			this.simplify();
		}
	}

	simplify()
	{
		Solver.copyBoard();
		Solver.simplify();
		Solver.copyBoardBack();
	}

	@action
	fillSingles()
	{
		for (let i = 0; i < 81; i++)
		{
			if (this.order[i] < 0 && this.nums.has(this.boardData[i]))
				this.order[i] = this.nth++;
		}	
	}

	@action
	copyBoardBack(b, o)
	{
		for (let i = 0; i < 81; i++)
		{
			this.boardData[i] = b[i];
			this.order[i] = o[i];
		}
	}
}

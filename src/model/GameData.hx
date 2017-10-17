package model;

import action.BoardAction;
import react.ReactUtil.copy;
import redux.IMiddleware;
import redux.IReducer;
import redux.StoreMethods;

/**
 * ...
 * @author Tamas Hortobagyi
 */

typedef SudokuState = {
	var board:Array<Int>;
	var selected:Int;
	var active:ApplicationPart;
	var message:String;
}

enum ApplicationPart {
	Board;
	Input;
}

class GameData
	implements IReducer<BoardAction, SudokuState>
	implements IMiddleware<BoardAction, ApplicationState>
{
	public var initState:SudokuState = {
		board: [for (i in 0...81) 511],
		selected: -1,
		active: ApplicationPart.Board,
		message: "Welcome to React Sudoku!"
	};
	public var store:StoreMethods<ApplicationState>;

	public function new() { }
	
	/* SERVICE */

	public function reduce(state:SudokuState, action:BoardAction):SudokuState
	{
		return switch(action)
		{
			case RndFill:
				var newBoard = [for (i in 0...81) Std.int(Math.random() * 511 + 1)];
				copy(state, {
					board: newBoard
				});
				
			case Set(id, value):
				copy(state, {
					board: [
						for (i in 0 ... state.board.length)
						if (i != id) state.board[i];
						else value
					]
				});
		}
	}
	
	public function middleware(action:BoardAction, next:Void -> Dynamic)
	{
		return switch(action)
		{
			//case RndFill: loadEntries();
			default: next();
		}
	}
}
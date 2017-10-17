package view;

import js.html.Element;
import js.html.Event;
import model.GameData;
import react.ReactComponent;
import react.ReactMacro.jsx;
import redux.react.IConnectedComponent;

/**
 * ...
 * @author Tamas Hortobagyi
 */
class Game extends ReactComponentOfState<SudokuState> implements IConnectedComponent
{
	public function new(props:Dynamic)
	{
		super(props);
	}
	
	/**
	 * Very important rule of `mapState`:
	 * - return either value types (int/string)
	 * - or objects/arrays as-is: avoid creating new objects/arrays here
	 *
	 * Creating a new objects in `mapState` will trigger a systematic re-render
	 * for each and every state update because the shallow-comparison of the new
	 * state object will find an object that changed.
	 * - Array map/filter/slice create new Arrays.
	 */
	function mapState(state:ApplicationState, props:Dynamic):SudokuState
	{
		var sudoku:SudokuState = state.sudoku;

		return sudoku;
	}

	override public function render():ReactElement
	{
		trace(this.state);
		return jsx('
			<div className="game">
				<BoardView
					board=${this.state.board}
					selected=${this.state.selected}
					active=${this.state.active == ApplicationPart.Board}
					dispatch=${dispatch}
				/>
			</div>
		');
	}
}


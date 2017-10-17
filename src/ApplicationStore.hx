package;

import action.BoardAction;
import model.GameData;
import redux.Redux;
import redux.Store;
import redux.StoreBuilder.*;

/**
 * ...
 * @author Tamas Hortobagyi
 */
class ApplicationStore
{
	static public function create():Store<ApplicationState>
	{
		// store model, implementing reducer and middleware logic
		var gameData = new GameData();
		
		// create root reducer normally, excepted you must use
		// 'StoreBuilder.mapReducer' to wrap the Enum-based reducer
		var rootReducer = Redux.combineReducers({
			sudoku: mapReducer(BoardAction, gameData)
		});
		
		// create middleware normally, excepted you must use
		// 'StoreBuilder.mapMiddleware' to wrap the Enum-based middleware
		var middleware = Redux.applyMiddleware(
			mapMiddleware(BoardAction, gameData)
		);
		
		// user 'StoreBuilder.createStore' helper to automatically wire
		// the Redux devtools browser extension:
		// https://github.com/zalmoxisus/redux-devtools-extension
		return createStore(rootReducer, null, middleware);
	}
	
	static public function startup(store:Store<ApplicationState>)
	{
		// use regular 'store.dispatch' but passing Haxe Enums!
		store.dispatch(BoardAction.RndFill);
			//.then(function(_) {
			//	store.dispatch(BoardAction.Set(0, 7));
			//});
	}
}
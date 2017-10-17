package;

import js.Browser;
import view.Game;
import react.ReactDOM;
import react.ReactMacro.jsx;
import redux.Store;
import redux.react.Provider;

/**
 * ...
 * @author Tamas Hortobagyi
 */
class Main
{
	static function main()
	{
		var store = ApplicationStore.create();
		render(store);
		
		ApplicationStore.startup(store);
	}
	
	static function render(store:Store<ApplicationState>)
	{
		ReactDOM.render(jsx('
			<Provider store=${store}>
				<Game />
			</Provider>
		'), Browser.document.getElementById('app'));
		
	}
}
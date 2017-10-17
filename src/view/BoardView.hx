package view;

import js.Browser;
import js.html.Element;
import js.html.Event;
import js.html.MouseEvent;
import react.ReactComponent;
import react.ReactMacro.jsx;

/**
 * ...
 * @author Tamas Hortobagyi
 */
class BoardView extends ReactComponentOfPropsAndState<BoardProps, BoardState>
{
	public function new(props:BoardProps)
	{
		super(props);
		
		this.state = {
			selected: this.props.selected
		}
	}
	
	override public function shouldComponentUpdate(nextProps:BoardProps, nextState:BoardState):Bool
	{
		return (nextProps.selected != this.props.selected ||
			nextProps.active != this.props.active ||
			nextState.selected != this.state.selected ||
			nextProps.board.join(',') != this.props.board.join(',')
			//nextState.board.join(',') != this.state.board.join(',')
		);
	}
	
	override public function render():ReactElement
	{
		var board:Array<ReactElement> = [];
		
		for (i in 0...81)
		{
			var x = Std.int((i % 9) / 3);
			var y = Std.int(Std.int(i / 9) / 3);
			
			board.push(jsx('
				<SField
					id=${i}
					key=${i}
					value=${this.props.board[i]}
					additionalClass=${ i == this.state.selected ? ' sfieldSelected' : ((x + y) % 2 == 0 ? ' sfieldLight' : '') }
				/>
			'));
		}
		
		var className = 'board' + (this.props.active ? ' active' : '');
		
		return jsx('
			<div className=${className} onClick=${this.onClickHandler}>
				${board}
			</div>
		');
	}
	
	function onClickHandler(e:MouseEvent)
	{
		var element = Browser.document.elementFromPoint(e.clientX, e.clientY);
		var tagName = element.tagName.toLowerCase();
		if (tagName == 'p' || tagName == 'span')
		{
			element = element.parentElement;
			tagName = element.tagName.toLowerCase();
		}
		
		if (tagName == 'div')
		{
			setState(cast({selected: Std.parseInt(element.id.substr(3))}:BoardState));
		}
	}
}

typedef BoardProps = {
	var board:Array<Int>;
	var selected:Int;
	var active:Bool;
}

typedef BoardState = {
	@:optional var selected:Int;
}

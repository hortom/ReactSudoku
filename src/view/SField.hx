package view;

import js.html.Element;
import js.html.Event;
import react.ReactComponent;
import react.ReactMacro.jsx;

/**
 * ...
 * @author Tamas Hortobagyi
 */
class SField  extends ReactComponentOfProps<SFieldProps>
{
	static var numbers = [0, 1, 2, 4, 8, 16, 32, 64, 128, 256];
	
	override public function shouldComponentUpdate(nextProps:SFieldProps, nextState:Dynamic):Bool
	{
		return (this.props.value != nextProps.value || this.props.additionalClass != nextProps.additionalClass);
	}
	
	override public function render():ReactElement
	{
		var className = 'sfield' + this.props.additionalClass;
		
		var i = numbers.indexOf(this.props.value);
		if (i != -1)
		{
			return jsx('
				<div className=${className} id=${"sf_"+this.props.id}>
					<p>${i}</p>
				</div>
			');
		}
		else
		{
			var s = '';
			for (i in 1 ... numbers.length)
			{
				s += this.props.value & numbers[i] == 0 ? ' ' : '$i';
			}
			return jsx('
				<div className=${className} id=${"sf_"+this.props.id}>
					<span>
						${s.substr(0, 3)}<br/>
						${s.substr(3, 3)}<br/>
						${s.substr(6, 3)}
					</span>
				</div>
			');
		}
	}
}

typedef SFieldProps = {
	var id:Int;
	var value:Int;
	var additionalClass:String;
}
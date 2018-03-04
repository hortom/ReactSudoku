import SudokuStore from './SudokuStore';

export default class EventHandler
{
	private store:SudokuStore;

	constructor(store:SudokuStore)
	{
		this.store = store;

		this.keyDownHandler = this.keyDownHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);

		document.removeEventListener("keydown", this.keyDownHandler, true);
		document.removeEventListener("click", this.clickHandler, true);

		document.addEventListener("keydown", this.keyDownHandler, true);
		document.addEventListener("click", this.clickHandler, true);
	}

	private clickHandler(event)
	{
		if (event.defaultPrevented) return; // Do nothing if the event was already processed
		
		var e = event.target;
		while (e.id == '' && e.parentNode != undefined)
		{
			e = e.parentNode;
		}

		var id:string = e.id;
		if (id != undefined)
		{
			const { store } = this;

			switch(id)
			{
				case 'GameInput':
					store.active = "input";
					break;
				case 'root':
					store.active = "board";
					break;
				case 'ButtonUndo':
					store.undo();
				default:
					if (id.indexOf("sf-") == 0)
					{
						store.active = "board";
						store.selected = parseInt(id.substr(3));
					}
					else
						return;
			}

			event.preventDefault();
		}
	}

	private keyDownHandler(event)
	{
		if (event.defaultPrevented) return; // Do nothing if the event was already processed
	
		const { store } = this;
console.log(event.key);
		if (store.active == "board" && store.mode == "manual")
		{
			switch (event.key) {
				case "ArrowDown":
					if (store.selected < 72)
						store.selected += 9;
					else
						store.active = "input";
					break;
				case "ArrowUp":
					if (store.selected > 8)
						store.selected -= 9;
					break;
				case "ArrowLeft":
					if (store.selected > 0)
						store.selected -= 1;
					else
						store.selected = 80;
					break;
				case "ArrowRight":
					if (store.selected < 80)
						store.selected += 1;
					else
					store.selected = 0;
					break;
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					const value = event.key.charCodeAt(0) - 48;
					console.log("value: ", value);
					store.setField(value, true);
					break;
				default:
					return; // Quit when this doesn't handle the key event.
			}
		}
		else if (store.active == "input" && store.mode == "manual")
		{
			switch (event.key) {
				case "ArrowUp":
					store.active = "board";
					break;
				default:
					return; // Quit when this doesn't handle the key event.
			}			
		}
	
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	}
}

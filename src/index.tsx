import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import SudokuStore from './SudokuStore';
import EventHandler from './EventHandler';

import './index.css';

const store = new SudokuStore();
const eventHandle = new EventHandler(store);

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

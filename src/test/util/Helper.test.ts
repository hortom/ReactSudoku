import { parseBoard } from '../../util/Helper';
import { assert } from 'chai';

describe('Helper - parseBoard', function(){
	it('Should handle undefined', function(){
		let board:Array<number> = [];
		let order:Array<number> = [];

		let expectedBoard:Array<number> = [];
		let expectedOrder:Array<number> = [];
		for (let i = 0; i < 81; i++)
		{
			expectedBoard[i] = 511;
			expectedOrder[i] = -1;
		}

		parseBoard(undefined, board, order);
		assert.deepEqual(board, expectedBoard);
		assert.deepEqual(order, expectedOrder);
	});

	it('Should handle filled board', function(){
		let board:Array<number> = [];
		let order:Array<number> = [];

		let expectedBoard:Array<number> = [];
		let expectedOrder:Array<number> = [];
		for (let i = 0; i < 81; i++)
		{
			expectedBoard[i] = 1 << (i % 9);
			expectedOrder[i] = 0;
		}

		parseBoard('123456789123456789123456789123456789123456789123456789123456789123456789123456789', board, order);
		assert.deepEqual(board, expectedBoard);
		assert.deepEqual(order, expectedOrder);		
	});
});
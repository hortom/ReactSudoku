import Solver from './Solver.jsx';

module.exports = {
	parseBoard: parseBoard
}

function parseBoard(s, board, fixed)
{
	if (!s) s = '';

	while (s.length < 81) s += '.';

	for (let i = 0; i < 81; i++)
	{
		var c = s.charCodeAt(i);

		// For numbers, 1-9:
		if (c > 48 && c <= 58)
		{
			board[i] = (1 << (c - 49));
			fixed[i] = true;
		}
		else
		{
			board[i] = 511;
			fixed[i] = false;
		}
	}

	//let solver = Solver;
	Solver.init(board);
}
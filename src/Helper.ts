import Solver from './Solver.jsx';

export function parseBoard(s, board, order)
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
			order[i] = 0;
		}
		else
		{
			board[i] = 511;
			order[i] = -1;
		}
	}
}
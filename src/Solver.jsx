export default class Solver
{
	static init(board)
	{
		this.board = board;//board.slice(0, board.length);

		this.rows = [];
		this.cols = [];

		for (let i = 0; i < 9; i++)
		{
			this.rows[i] = [i * 9];
			this.cols[i] = [i];

			for (let j = 1; j < 9; j++)
			{
				this.rows[i][j] = this.rows[i][j - 1] + 1;
				this.cols[i][j] = this.cols[i][j - 1] + 9;
			}
		}

		this.sqrs = [
			[ 0,  1,  2,  9, 10, 11, 18, 19, 20],
			[ 3,  4,  5, 12, 13, 14, 21, 22, 23],
			[ 6,  7,  8, 15, 16, 17, 24, 25, 26],
			[27, 28, 29, 36, 37, 38, 45, 46, 47],
			[30, 31, 32, 39, 40, 41, 48, 49, 50],
			[33, 34, 35, 42, 43, 44, 51, 52, 53],
			[54, 55, 56, 63, 64, 65, 72, 73, 74],
			[57, 58, 59, 66, 67, 68, 75, 76, 77],
			[60, 61, 62, 69, 70, 71, 78, 79, 80]
		];

		this.nums = new Map([[0, 1], [1, 1], [2, 1], [4, 1], [8, 1], [16, 1], [32, 1], [64, 1], [128, 1], [256, 1]]);

		this.simplify();
	}

	static simplifyOne(a)
	{
		var occ = 0, v = 0, modified = false;
		for (let i = 0; i < 9; i++) // collect every single number
		{
			v = Math.abs(this.board[a[i]]);
			if (this.nums.has(v)) occ |= v;
		}

		if (occ != 0)
		{
			occ = occ ^ 0xffff;
			for (let i = 0; i < 9; i++)
			{
				v = Math.abs(this.board[a[i]]);
				if (!this.nums.has(v))
				{
					v = this.board[a[i]] = v & occ;
					modified = modified || this.nums.has(v);
				}
			}
		}

		return modified;
	}

	static simplify()
	{
		var modified = false; // any new single value?
		for (let i = 0; i < 9; i++)
		{
			modified = modified || this.simplifyOne(this.rows[i]);
			modified = modified || this.simplifyOne(this.cols[i]);
			modified = modified || this.simplifyOne(this.sqrs[i]);
		}

		if (modified)
			this.simplify();
	}
}

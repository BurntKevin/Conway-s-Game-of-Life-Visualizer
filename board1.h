// Game of Life on a 10×10 grid

#define NN 10

int N = NN;

char board[NN][NN] = {
	{1,0,0,0,0,0,0,0,0,0},
	{1,1,0,0,0,0,0,0,0,0},
	{0,0,0,1,0,0,0,0,0,0},
	{0,0,1,0,1,0,0,0,0,0},
	{0,0,0,0,1,0,0,0,0,0},
	{0,0,0,0,1,1,1,0,0,0},
	{0,0,0,1,0,0,1,0,0,0},
	{0,0,1,0,0,0,0,0,0,0},
	{0,0,1,0,0,0,0,0,0,0},
	{0,0,1,0,0,0,0,0,0,0},
};

char newboard[NN][NN];
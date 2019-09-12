# Conway's Game of Life

Conway's Game of Life is a fascinating simulation highlighting the many ways an entity can develop and I wanted to visualize it in a fun neat program.

I initially started off with developing it in C but since I had also learnt MIPS, I decided to use it at least once in a project. Both versions are available and working.
I also decided to make a more interactive design on a web page with more dynamic features such as custom board sizes and custom boards rather than the predesigned boards used in C and MIPS.

# Rules
The game is simple.
1. If the cell is alive, then it stays alive if it has 2 or 3 live neighbours.
2. If the cell is dead, then it springs to life if it has 3 live neighbours.

# Ultimate Result
It is interesting that although there are seemingly infinite patterns, these patterns slowly settle into two categories, still lifes (groups of cells which never move) and oscillators (groups of cells which repeat the same pattern at a point). However, it is expected since the conditions placed on the cells are constant and as it is generally not beneficial to collide with other groups, cells would have a better chance at survival if they were stationary.

# C and MIPS Implementation
Both programs are performing the same application. The programs use a reference board and then you get to select the number of iterations where a terminal output will show every iteration until it is complete.

# Website Implementation
There is a grid with 50px by 50px cells filling the page where these cells can be clicked on or by holding mouse 1 over the cells to make the cells alive or dead. There is the standard run and stop features so that it is possible to visualize the simulation. In addition, it also has a clear board, auto-fill cells with a probability slider, custom speed of iterations and custom size which adjusts the density of cells on the page.
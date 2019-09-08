# Conway's Game of Life

Conway's Game of Life is a fascinating simulation highlighting the many ways an entity can develop and I wanted to visualize it in a fun neat program.

I initially started off with developing it in C but since I had also learnt MIPS, I decided to use it at least once in a project. Both versions are available and working.

# Rules
The game is simple.
1. If the cell is alive, then it stays alive if it has 2 or 3 live neighbours.
2. If the cell is dead, then it springs to life if it has 3 live neighbours.

# Ultimate Result
It is interesting that although there are seemingly infinite patterns, these patterns slowly settle into a few main lifestyles which is to be expected due to the constant conditions placed on the cells.

**Still lifes**: The cells never move.

**Oscillators**: Repeats the same pattern at a point.

**Spaceships**: Repeats the same pattern and traverses the grid.

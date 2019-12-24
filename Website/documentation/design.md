# Goal #
To provide an easily accessible simulation of Conway's Game of Life.

# Product Produced #
* Buttons placed on the top.
* User can run, stop, clear, create a random board, adjust simulation speed, adjust board speed and visualise Conway's Game of Life.
* Board is gray with a highly dark green border and light blue alive cells.

# Designs #
## Functionality ##
### Run/Stop Button ###
* Allows the user to stop the simulation so that they are able to make edits to the board.
* Allows the user to start the simulation.

### Clear ###
* The user is able to quickly clear the board so that they are able to test a new board state.

### Randomise Board ###
* The user is able to quickly create a board.
* Randomise slider so that the user can create a custom density of alive cells.

### Speed ###
* The user is able to speed up the simulation so that they can quickly see the end result.
* The user is able to slow down the simulation so that they can more clearly see the progress of the algorithm.

### Size ###
* The user is able to adjust the density of cells so that they can simulate a larger board state.
* Adjusting the board smaller will cause the program to forget the outer cells which were removed.

### Creating/Deleting Alive Cells ###
* The user can click to tactically change the state of cells.
* The user can drag over cells to quickly change the state of cells.
* Cells can be changed during run-time so that the user is able to make quick edits rather than pause the current simulation.

## User Interface ##
### Placement of Buttons ###
* Placing the buttons at the top of the screen is intuitive to the user and allows the button to be immediately apparent rather than hiding it on the bottom.
* We could place the buttons on the side, but that would increase complexity due to alignment issues and as we will not be able to fill the entire sidebar, it would be a waste of real estate.

### Board Colour ###
* I have tested a multitude of colours and I believe that a dark background looks better as it looks less quirky and has a higher level of professionalism. I have looked into having a white or somewhat white colours but it makes the board relatively hard to see.
* I chose the cell colour to be brighter as it was a good contrast to the background of the board and blue seemed to be a good colour to suit.

### Board Size ###
* The board defaults to a 50 by 50 cell filling up to 100% of the user' screen, excluding normal margins from side of screen.

### Font and Style of Buttons ###
* This was handled by Materialize CSS with a few minor edits to make it scale well to the website. The given CSS is of sufficient quality.
* The green slider buttons look good.
* Buttons when highlighted will increase in opacity to help aid the user.

### Run and Stop Button ###
* While the simulation is running, 'Stop' is displayed while when the simulation is paused, 'Run' is displayed.

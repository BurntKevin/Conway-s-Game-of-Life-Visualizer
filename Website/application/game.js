// Creating next generation's board state
function nextBoard() {
    var height = boardHeight();

    // Creating board template
    var boardState = [];
    for (var i = 0; i < height; i++) {
        boardState[i] = [];
    }

    // Obtaining current board state
    var cells = document.getElementsByClassName("potentialCell");
    Array.from(cells).forEach(function(element) {
        // Deciphering cells - Cells are formated in r{row}c{column}
        // Obtaining id section
        var cell = element.id.split("r");
        // Obtaining row, column section
        cell = cell[1].split("c");

        // Deciphered Cells
        row = parseInt(cell[0]);
        column = parseInt(cell[1]);

        // Copying cells
        if (element.className == "potentialCell cellAlive") {
            // Copy alive
            boardState[row][column] = true;
        } else {
            // Copy dead
            boardState[row][column] = false;
        }
    });

    // Calculating if cell is alive or dead in next iteration
    Array.from(cells).forEach(function(element) {
        // Deciphering cells - Cells are formated in r{row}c{column}
        // Obtaining id section
        var cell = element.id.split("r");
        // Obtaining row, column section
        cell = cell[1].split("c");

        // Deciphered Cells
        row = parseInt(cell[0]);
        column = parseInt(cell[1]);

        // Checking the status of the cell
        if (nextIterationAlive(row, column, boardState) == false) {
            // Updating cell as dead
            element.className = "potentialCell";
        } else {
            // Updating cell as alive
            element.className = "potentialCell cellAlive";
        }
    });
}

// Checking if a cell if alive in the next generation
function nextIterationAlive(row, column, boardState) {
    // Obtaining neighbours of a cell
    var neighbours = countNeighbours(row, column, boardState);

    // Calculating status of cell
    if (boardState[row][column] == true) {
        // Current state if alive
        if (neighbours < 2 || neighbours > 3) {
            // Dead
            return false;
        } else {
            // Alive
            return true;
        }
    } else if (neighbours == 3) {
        // Revived
        return true;
    } else {
        // Remains dead
        return false;
    }
}

function countNeighbours(row, column, boardState) {
    var neighbours = 0;

    for (var i = -1; i < 2; i++) {
        // For potential neighbour to the left, same and right
        for (var j = -1; j < 2; j++) {
            // For the potential neighbour to the top, same and bottom
            if ((row + i) < 0 || (column + j) < 0 || (row + i) >= boardState.length || (column + j) >= boardState[0].length) {
                // Checking if it is a valid cell - coordinates on board
                continue;
            }
            if (i == 0 && j == 0) {
                // You are not a neighbour of yourself
                continue;
            }
            // Potential neighbour
            if (boardState[row + i][column + j] == true) {
                neighbours++;
            }
        }
    }
    return neighbours;
}

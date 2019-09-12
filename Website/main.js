// Main
var mouseDrag = false;
var running = false;
newBoard();

// Supporting Functions
// Creating board according to size slider with a fit to screen goal
// At 100% size, the grids are 50 pixels each
function newBoard() {
    var size = document.getElementById("sizeSlider");

    // Creating board template
    var boardState = [];
    for (var i = 0; i < Math.trunc((screen.height - 150) * size.value / 100 / 50); i++) {
        boardState[i] = [];
    }

    // Setting board template to false (dead cells)
    for (var i = 0; i < Math.trunc((screen.height - 150) * size.value / 100 / 50); i++) {
        for (var j = 0; j < Math.trunc(screen.width * size.value / 100 / 50); j++) {
            boardState[i][j] = false;
        }
    }

    // Updating boardState with the current board's state if applicable
    var cells = document.getElementsByClassName("potentialCell");
    Array.from(cells).forEach(function(element) {
        var cell = element.id.split("r");
        cell = cell[1].split("c");
        if (parseInt(cell[0]) < Math.trunc((screen.height - 150) * size.value / 100 / 50) && parseInt(cell[1]) < Math.trunc(screen.width * size.value / 100 / 50)) {
            if (element.className == "potentialCell cellAlive") {
                console.log(3);
                // If there is a cell alive, update boardState with the alive cell
                boardState[parseInt(cell[0])][parseInt(cell[1])] = true;
            }
        }
    });

    // Updating board with new board
    text = "";
    for (var i = 0; i < Math.trunc((screen.height - 150) * size.value / 100 / 50); i++) {
        for (var j = 0; j < Math.trunc(screen.width * size.value / 100 / 50); j++ ) {
            if (boardState[i][j] == false) {
                // Dead Cell
                text += `<div class = "potentialCell" id = "r${i}c${j}"></div>`;
            } else {
                // Alive cell
                text += `<div class = "potentialCell cellAlive" id = "r${i}c${j}"></div>`;
            }
        }
    }
    document.getElementsByClassName("grid")[0].innerHTML = text;

    // Styling board so that columns match up
    document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + Math.trunc(screen.width * size.value / 100 / 50) + ", auto)";

    // Grid cell 'dead' and 'alive' user interactivity
    var cells = document.getElementsByClassName("potentialCell");
    for (var i = 0; i < cells.length; i++) {
        addEventListeners(cells[i]);
    }

    // Activate mouse over cell feature
    document.getElementsByClassName("grid")[0].addEventListener("mousedown", function() { mouseDrag = true; });
    document.getElementsByClassName("grid")[0].addEventListener("mouseup", function() { mouseDrag = false; });
}

// Adds event listeners to grid cells
function addEventListeners(item) {
    item.addEventListener("click", clickCell);
    item.addEventListener("mouseenter", mouseOverCell)
}

// Cell on click
function clickCell(event) {
    if (event.srcElement.className == "potentialCell") {
        // Dead cell
        event.srcElement.className = "potentialCell cellAlive";
    } else {
        // Alive cell
        event.srcElement.className = "potentialCell";
    }
}

// Cell on mouseover
function mouseOverCell(event) {
    if (mouseDrag == true) {
        if (event.srcElement.className == "potentialCell") {
            // Dead cell
            event.srcElement.className = "potentialCell cellAlive";
        } else {
            // Alive cell
            event.srcElement.className = "potentialCell";
        }
    }
}

// Run
function startBoard() {
    running = true;
    var speed = document.getElementById("speedSlider");
    timer = setInterval(nextBoard, speed.value);
}

// Stop
function stopBoard() {
    running = false;
    clearInterval(timer);
}

// Speed Slider
document.getElementById("speedSlider").oninput = function() {
    if (running = true) {
        // Restart timer
        stopBoard();
        startBoard();
    }
    // Update value
    document.getElementById("speedDisplay").innerHTML = this.value + "ms";
}

// Creating next generation's board state
function nextBoard() {
    var size = document.getElementById("sizeSlider");
    // Creating board template
    var boardState = [];
    for (var i = 0; i < Math.trunc((screen.height - 150) * size.value / 100 / 50); i++) {
        boardState[i] = [];
    }

    // Obtaining current board state
    var cells = document.getElementsByClassName("potentialCell");
    Array.from(cells).forEach(function(element) {
        var cell = element.id.split("r");
        cell = cell[1].split("c");
        if (element.className == "potentialCell cellAlive") {
            // Copy alive
            boardState[parseInt(cell[0])][parseInt(cell[1])] = true;
        } else {
            // Copy dead
            boardState[parseInt(cell[0])][parseInt(cell[1])] = false;
        }
    });

    // Calculating if cell is alive or dead in next iteration
    Array.from(cells).forEach(function(element) {
        var cell = element.id.split("r");
        cell = cell[1].split("c");
        if (nextIterationAlive(parseInt(cell[0]), parseInt(cell[1]), boardState) == false) {
            // Cell dead
            element.className = "potentialCell";
        } else {
            // Cell alive
            element.className = "potentialCell cellAlive";
        }
    });
}

// Is cell alive in the next generation
function nextIterationAlive(row, column, boardState) {
    var neighbours = countNeighbours(row, column, boardState);

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
        for (var j = -1; j < 2; j++) {
            if ((row + i) < 0 || (column + j) < 0 || (row + i) >= boardState.length || (column + j) >= boardState[0].length) {
                // Checking if there is a possible cell
                continue;
            }
            if (i == 0 && j == 0) {
                // You are not a neighbour of yourself
                continue;
            }
            if (boardState[row + i][column + j] == true) {
                neighbours++;
            }
        }
    }
    return neighbours;
}

// Clear board
function clearBoard() {
    var cells = document.getElementsByClassName("potentialCell");
    for (var i = 0; i < cells.length; i++) {
        cells[i].className = "potentialCell";
    }
}

// Randomise board
function randomBoard() {
    var cells = document.getElementsByClassName("potentialCell");
    var probability = document.getElementById("probabilitySlider");
    for (var i = 0; i < cells.length; i++) {
        var number = Math.floor((Math.random() * 100) + 1);
        if (probability.value < number) {
            // Dead cell
            cells[i].className = "potentialCell";
        } else {
            // Alive cell
            cells[i].className = "potentialCell cellAlive";
        }
    }
}

// Probability Slider
document.getElementById("probabilitySlider").oninput = function() {
    document.getElementById("probabilityDisplay").innerHTML = this.value + "%";
}

// Size Slider
document.getElementById("sizeSlider").oninput = function() {
    if (running == true){
        stopBoard();
        newBoard();
        startBoard();
    } else {
        newBoard();
    }
    document.getElementById("sizeDisplay").innerHTML = this.value + "%";
}

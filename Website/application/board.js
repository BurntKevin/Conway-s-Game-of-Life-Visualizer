// Main
var mouseDrag = false;
var running = false;
newBoard();

// Creating board according to size slider value with a fit to screen goal
// At 100% size, the cells are 50 by 50 pixels each
function newBoard() {
    // Commonly used values
    var height = boardHeight();
    var width = boardWidth();

    // Creating board template
    // Creating height axis
    var boardState = [];
    for (var i = 0; i < height; i++) {
        boardState[i] = [];
    }

    // Creating width axis
    // Setting board template to false (dead cells)
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            boardState[i][j] = false;
        }
    }

    // Updating boardState with the current board's state if applicable
    var cells = document.getElementsByClassName("potentialCell cellAlive");
    Array.from(cells).forEach(function(element) {
        // Deciphering cells - Cells are formated in r{row}c{column}
        // Obtaining id section
        var cell = element.id.split("r");
        // Obtaining row, column section
        cell = cell[1].split("c");

        // Deciphered Cells
        row = parseInt(cell[0]);
        column = parseInt(cell[1]);

        // Checking if cell is within new dimensions
        if (row < height && column < width) {
            // Cell is within boundaries of new board, making cell alive
            boardState[row][column] = true;
        }
    });

    // Updating displayed board with new board
    board = "";
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (boardState[i][j] == false) {
                // Dead Cell
                board += `<div class = "potentialCell" id = "r${i}c${j}"></div>`;
            } else {
                // Alive Cell
                board += `<div class = "potentialCell cellAlive" id = "r${i}c${j}"></div>`;
            }
        }
    }
    document.getElementsByClassName("grid")[0].innerHTML = board;

    // Styling board so that columns match up
    document.getElementsByClassName("grid")[0].style.gridTemplateColumns = "repeat(" + width + ", auto)";

    // Adding grid cell 'dead' and 'alive' user interactivity
    var cells = document.getElementsByClassName("potentialCell");
    for (var i = 0; i < cells.length; i++) {
        addCellEventListeners(cells[i]);
    }

    // Activate mouse over cell feature
    document.getElementsByClassName("grid")[0].addEventListener("mousedown", function() { mouseDrag = true; });
    document.getElementsByClassName("grid")[0].addEventListener("mouseup", function() { mouseDrag = false; });
}

// Calculates the board's height
function boardHeight() {
    var size = document.getElementById("sizeSlider").value / 100;
    return Math.trunc(screen.height * size / 50);
}

// Calculates the board's width
function boardWidth() {
    var size = document.getElementById("sizeSlider").value / 100;
    return Math.trunc(screen.width * size / 50);
}

// Adds event listeners to grid cells
function addCellEventListeners(item) {
    item.addEventListener("click", clickCell);
    item.addEventListener("mouseenter", mouseoverCell)
}

// Cells change from alive to dead or dead to alive when clicked
function clickCell(event) {
    if (event.srcElement.className == "potentialCell") {
        // Dead cell
        event.srcElement.className = "potentialCell cellAlive";
    } else {
        // Alive cell
        event.srcElement.className = "potentialCell";
    }
}

// Cells change from alive to dead or dead to alive when mouseover
function mouseoverCell(event) {
    // If mouse is currently being dragged
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

// Run or start simulation
function startOrStopBoard() {
    if (running == true) {
        // Simulation is currently running - stopping simulation
        stopBoard();
        document.getElementById("runningStatus").innerHTML = "Run";
    } else {
        // Simulation is not running - starting simulation
        startBoard();
        document.getElementById("runningStatus").innerHTML = "Stop";
    }
}

// Running the simulation
// Uses the speed slider as adjustments can be made by the user for speed of simulation
function startBoard() {
    running = true;
    var speed = document.getElementById("speedSlider").value;
    timer = setInterval(nextBoard, speed);
}

// Stopping the simulation
function stopBoard() {
    running = false;
    clearInterval(timer);
}

// Clear board
function clearBoard() {
    // Obtaining cells
    // Bug (?): Obtaining "potentialCell cellAlive" only partially clears cells
    // requiring multiple clicks of clear to fully clear
    var cells = document.getElementsByClassName("potentialCell");

    // Setting all cells to dead
    for (var i = 0; i < cells.length; i++) {
        cells[i].className = "potentialCell";
    }
}

// Randomise board
function randomBoard() {
    // Obtaining values
    var cells = document.getElementsByClassName("potentialCell");
    var probability = document.getElementById("probabilitySlider").value;

    // Randomising board
    for (var i = 0; i < cells.length; i++) {
        // Randomly generating an integer from 1 to 100
        var number = Math.floor((Math.random() * 100) + 1);

        if (probability < number) {
            // Dead cell
            cells[i].className = "potentialCell";
        } else {
            // Alive cell
            cells[i].className = "potentialCell cellAlive";
        }
    }
}

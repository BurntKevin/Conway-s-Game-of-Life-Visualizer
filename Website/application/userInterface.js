// Speed Slider
document.getElementById("speedSlider").oninput = function() {
    // If simulation is running, adjust timer to the new speed
    if (running == true) {
        stopBoard();
        startBoard();
    }

    // Update speed value displayed to user
    document.getElementById("speedDisplay").innerHTML = this.value + "ms";
}

// Probability Slider
document.getElementById("probabilitySlider").oninput = function() {
    // Updating probability displayed
    document.getElementById("probabilityDisplay").innerHTML = this.value + "%";
}

// Size Slider
document.getElementById("sizeSlider").oninput = function() {
    // Adjusting board size
    if (running == true) {
        // Requires restarting board
        stopBoard();
        newBoard();
        startBoard();
    } else {
        // Adjusting board size
        newBoard();
    }
    
    // Updating size displayed
    document.getElementById("sizeDisplay").innerHTML = this.value + "%";
}

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

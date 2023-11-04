const gridSize = 5;
const dots = [];

function createGrid() {
    const gameContainer = document.getElementById("game-container");

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.setAttribute("data-row", i);
            dot.setAttribute("data-col", j);
            dot.addEventListener("click", toggleDot);
            gameContainer.appendChild(dot);
            dots.push(dot);
        }
    }
}

function toggleDot() {
    this.classList.toggle("active");

    // Check for win condition
    const activeDots = document.querySelectorAll(".dot.active");
    if (activeDots.length === dots.length) {
        alert("Congratulations! You connected all the dots!");
        resetGame();
    }
}

function resetGame() {
    dots.forEach(dot => dot.classList.remove("active"));
}

createGrid();

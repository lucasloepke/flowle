const gridSize = 5;
const titleScreen = document.getElementById('title-screen'); // ""?
const gameContainer = document.getElementById('game-container');
const round = document.getElementById('round');
gameContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

function startGame() {
    titleScreen.style.display = "none";
    round.style.display = "flex";
    gameContainer.style.display = "grid";
}

const dots = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
let currentLine = null;
let currentColor = null;

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = 'black';
        gameContainer.appendChild(dot);
        dots[i][j] = dot;

        dot.addEventListener('mousedown', (e) => {
            if (e.target.style.backgroundColor !== 'black') {
                currentColor = e.target.style.backgroundColor;
                currentLine = [e.target];
            }
        });

        dot.addEventListener('mouseup', (e) => {
            if (e.target.style.backgroundColor === currentColor) {
                currentLine.push(e.target);
                currentLine = null;
                currentColor = null;
                if (isGridFilled()) {
                    alert('Congratulations! You connected all dots and filled the grid!');
                }
            }
        });

        dot.addEventListener('mouseenter', (e) => {
            if (currentLine && (e.target.style.backgroundColor === 'black' || e.target.style.backgroundColor === currentColor)) {
                e.target.style.backgroundColor = currentColor;
                currentLine.push(e.target);
            }
        });
    }
}

// Set two dots of each color
const colors = ['blue', 'red', 'green'];
for (const color of colors) {
    getEmptyDot().style.backgroundColor = color;
    getEmptyDot().style.backgroundColor = color;
}

function getEmptyDot() {
    let dot;
    do {
        const i = Math.floor(Math.random() * gridSize);
        const j = Math.floor(Math.random() * gridSize);
        dot = dots[i][j];
    } while (dot.style.backgroundColor !== 'black');
    return dot;
}

function isGridFilled() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (dots[i][j].style.backgroundColor === 'black') {
                return false;
            }
        }
    }
    return true;
}


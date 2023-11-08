// Define an array of daily preset patterns

const dailyPatterns = [
    // Pattern for Day 1
    [
        ['var(--blue)', 'black', 'var(--red)', 'black', 'var(--spring-green)'],
        ['black', 'black', 'var(--yellow)', 'black', 'var(--steel-pink)'],
        ['black', 'black', 'black', 'black', 'black'],
        ['black', 'var(--red)', 'black', 'var(--spring-green)', 'black'],
        ['black', 'var(--blue)', 'var(--yellow)', 'var(--steel-pink)', 'black']
    ],
    [
        ['black', 'black', 'black', 'black', 'black'],
        ['black', 'var(--spring-green)', 'black', 'var(--yellow)', 'black'],
        ['black', 'black', 'var(--yellow)', 'black', 'black'],
        ['black', 'black', 'var(--blue)', 'black', 'var(--red)'],
        ['var(--blue)', 'var(--spring-green)', 'var(--red)', 'black', 'black']
    ],
    [
        ['black', 'black', 'black', 'black', 'var(--yellow)'],
        ['black', 'var(--spring-green)', 'black', 'black', 'var(--spring-green)'],
        ['black', 'black', 'black', 'var(--yellow)', 'var(--blue)'],
        ['black', 'black', 'black', 'var(--red)', 'black'],
        ['var(--red)', 'var(--blue)', 'black', 'black', 'black']
    ],
    [
        ['black', 'black', 'black', 'black', 'black', 'black'],
        ['var(--yellow)', 'var(--blue)', 'var(--spring-green)', 'var(--steel-pink)', 'black', 'black'],
        ['var(--blue)', 'black', 'black', 'var(--red)', 'black', 'black'],
        ['var(--red)', 'black', 'black', 'black', 'black', 'var(--yellow)'],
        ['black', 'var(--spring-green)', 'black', 'black', 'var(--steel-pink)', 'var(--vivid-sky-blue)'],
        ['black', 'black', 'black', 'var(--vivid-sky-blue)', 'black', 'black']
    ],
    [
        ['black', 'black', 'black', 'var(--spring-green)', 'black', 'black'],
        ['black', 'var(--yellow)', 'black', 'var(--red)', 'black', 'black'],
        ['black', 'black', 'black', 'var(--yellow)', 'black', 'var(--spring-green)'],
        ['black', 'black', 'var(--blue)', 'black', 'black', 'var(--steel-pink)'],
        ['black', 'black', 'black', 'black', 'var(--red)', 'black'],
        ['black', 'black', 'black', 'black', 'var(--blue)', 'var(--steel-pink)']
    ],
    [
        ['black', 'black', 'black', 'black', 'black', 'black', 'black'],
        ['black', 'black', 'black', 'black', 'black', 'black', 'black'],
        ['black', 'black', 'black', 'black', 'var(--vivid-sky-blue)', 'var(--blue)', 'black'],
        ['black', 'var(--blue)', 'black', 'black', 'black', 'black', 'var(--red)'],
        ['var(--red)', 'black', 'black', 'black', 'var(--spring-green)', 'black', 'black'],
        ['var(--vivid-sky-blue)', 'black', 'var(--yellow)', 'black', 'black', 'var(--spring-green)', 'black'],
        ['var(--steel-pink)', 'black', 'black', 'black', 'black', 'var(--steel-pink)', 'var(--yellow)']
    ],         

    // Pattern for Day 2, and so on...
];

const gridSize = 5;
const titleScreen = document.getElementById('title-screen');
const gameContainer = document.getElementById('game-container');
const round = document.getElementById('round');

// Initialize the currentDay pattern (you can change this to load patterns for different days)
const currentDay = 0;
const pattern = dailyPatterns[currentDay];

gameContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

function startGame() {
    titleScreen.style.display = "none";
    round.style.display = "flex";
    gameContainer.style.display = "grid";
    beginTime();
}

const dots = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
let currentLine = null;
let currentColor = null;

for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = pattern[i][j];
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
                    stopTime();
                    const isCorrect = checkSolution();
                    if (isCorrect) {
                        alert('Congratulations! You connected all dots correctly in ' + counter + ' seconds!');
                    } else {
                        alert('Sorry, your solution is incorrect. Please try again.');
                    }
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

// Function to check the solution against the reference path
function checkSolution() {
    // Define the reference solution for the current pattern (modify as needed)
    const referenceSolution = [
        ['var(--blue)', 'var(--yellow)', 'var(--yellow)', 'var(--red)', 'var(--red)'],
        ['var(--blue)', 'var(--yellow)', 'var(--yellow)', 'var(--yellow)', 'var(--red)'],
        ['var(--blue)', 'var(--blue)', 'var(--spring-green)', 'var(--yellow)', 'var(--red)'],
        ['var(--spring-green)', 'var(--spring-green)', 'var(--spring-green)', 'var(--yellow)', 'var(--red)'],
        ['var(--spring-green)', 'var(--yellow)', 'var(--yellow)', 'var(--yellow)', 'var(--red)'],
    ];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const dotColor = dots[i][j].style.backgroundColor;
            const solutionColor = referenceSolution[i][j];
            if (dotColor !== solutionColor) {
                return false; // Incorrect color at this position
            }
        }
    }
    return true; // The solution matches the reference path
}
function setLevel(x) {
    document.getElementById('level').textContent = "Day " + (x + 1);
}

var timer;
var counter;

function beginTime() {
    counter = 0;
    timer = setInterval(function () {
        counter++;
        document.getElementById("timer").innerHTML = counter + 's';
    }, 1000);
}

function stopTime() {
    clearInterval(timer);
}

const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
    clearDots();
});

function clearDots() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const dotColor = dots[i][j].style.backgroundColor;
            const originalColor = pattern[i][j];
            
            if (dotColor !== originalColor) {
                dots[i][j].style.backgroundColor = 'black';
            }
        }
    }
}


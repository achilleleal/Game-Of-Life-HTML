import GameOfLife from './gameOfLife'

const board = document.getElementById('game');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const counter = document.getElementById('counter');
const interval = document.querySelector('input');

let gridWidth = 30;
let gridHeight = 30;

checkScreenSize();

const Game = new GameOfLife()

counter.innerHTML = 0;

startBtn.addEventListener('click', run);

resetBtn.addEventListener('click', resetGrid);

interval.addEventListener('change', updateGameSpeed)

window.addEventListener('resize', updateGrid);

generateGrid();


//* Functions

const revertStartBtn = () => {
    startBtn.innerHTML = 'Start';
    startBtn.classList.remove('running');
}

function run() {
    if (!Game.running) {
        startBtn.innerHTML = 'Stop';
        startBtn.classList.add('running');
        Game.start(interval.value, counter, revertStartBtn);
    } else {
        Game.stop();
        revertStartBtn();
    }
}

function resetGrid() {
    Game.reset();
    revertStartBtn();
    const alives = Array.from(document.getElementsByClassName('alive'));
    alives.forEach(cell => cell.classList.remove('alive'));
}

function generateGrid() {
    for (let y = 0; y < gridHeight; y++) {

        const row = document.createElement('div');
        row.classList.add('row');
    
        for (let x = 0; x < gridWidth; x++) {
    
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => cell.classList.toggle('alive'))
    
            row.appendChild(cell);
        }

        board.appendChild(row) 
    }
}

function checkScreenSize() {
    let windowHasChanged = false;
    const minScreenSize = 700;

    const smallGridSize = 15;
    const defaultGridSize = 30;

    if (window.innerWidth < minScreenSize && gridWidth === defaultGridSize) {
        gridWidth = smallGridSize;
        gridHeight = smallGridSize;
        windowHasChanged = true;

    } else if (window.innerWidth > minScreenSize && gridWidth === smallGridSize) {
        gridWidth = defaultGridSize;
        gridHeight = defaultGridSize;
        windowHasChanged = true;
    }

    return windowHasChanged;
}

function updateGrid() {
    if (checkScreenSize()) {
        board.innerHTML = '';
        generateGrid();
    }
}

function updateGameSpeed() {
    if (Game.running) {
        Game.stop();
        Game.start(interval.value, counter, revertStartBtn);
    }
}
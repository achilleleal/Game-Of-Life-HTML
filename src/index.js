import GameOfLife from './gameOfLife'

const board = document.getElementById('game');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const counter = document.getElementById('counter');
const interval = document.querySelector('input');

const gridWidth = 40
const gridHeight = 40;

const Game = new GameOfLife()

counter.innerHTML = 0;

startBtn.addEventListener('click', run);

resetBtn.addEventListener('click', resetGrid);

generateGrid()


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

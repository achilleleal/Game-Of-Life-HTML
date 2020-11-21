import gameOfLife from './gameOfLife'

const game = document.getElementById('game');
const startBtn = document.getElementById('start-btn');
const counter = document.getElementById('counter');
const interval = document.querySelector('input');

const gridWidth = 10
const gridHeight = 6;
let running = false;

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

        game.appendChild(row) 
    }
}

function run() {

    if (!running) {
        startBtn.classList.add('running');
        counter.innerHTML = 0;

        const onEnd = () => {
            startBtn.classList.remove('running');
            running = false
        }

        running = true;

        gameOfLife(interval.value, gridWidth, counter, onEnd);

    }
}

startBtn.addEventListener('click', run);

generateGrid()
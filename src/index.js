import gameOfLife from './gameOfLife'

const game = document.getElementById('game');
const startBtn = document.getElementById('start-btn');
const counter = document.getElementById('counter');

let grid = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0,0,0],
	[0,0,0,1,0,0,0,0,0,0],
	[0,1,1,1,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

function generateGrid() {
    for (let y = 0; y < grid.length; y++) {

        const row = document.createElement('div');
        row.classList.add('row');
    
        for (let x = 0; x < grid[y].length; x++) {
    
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => cell.classList.toggle('alive'))
    
            row.appendChild(cell);
        }
        game.appendChild(row) 
    }
}

function run() {

    startBtn.classList.add('running');
    counter.innerHTML = 0;

    const end = () => startBtn.classList.remove('running');
    const interval = document.querySelector('input').value;

    gameOfLife(interval, grid, game, counter, end);
}

startBtn.addEventListener('click', run);

generateGrid()
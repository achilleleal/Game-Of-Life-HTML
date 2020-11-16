const game = document.getElementById('game')

let grid = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0,0,0],
	[0,0,0,1,0,0,0,0,0,0],
	[0,1,1,1,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]

for (let y = 0; y < grid.length; y++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let x = 0; x < grid[y].length; x++) {
        const cell = document.createElement('div');
        cell.innerHTML = "X"
        cell.classList.add('cell');
        row.appendChild(cell);
    }
    game.appendChild(row)
}
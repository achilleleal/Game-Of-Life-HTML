import _ from "lodash";

const game = document.getElementById('game');

let grid = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0,0,0],
	[0,0,0,1,0,0,0,0,0,0],
	[0,1,1,1,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

const gameOfLife = () => {

    try {

        let newGen;
        let gen = 0;

        const loop = setInterval(() => {
            console.log(gen)

            game.innerHTML = '';
            newGen = _.cloneDeep(grid); 

            for (let y = 0; y < grid.length; y++) {

                const row = document.createElement('div');
                row.classList.add('row');

                for (let x = 0; x < grid[y].length; x++) {

                    const cell = document.createElement('div');
                    cell.classList.add('cell');

                    const gridCell = grid[y][x]
                    const totalNeighbours = upperCells(x,y) + bottomCells(x,y) + lineCells(x,y)

                    if (gridCell) {
                        if (totalNeighbours < 2 || totalNeighbours > 3) {
                            cell.classList.add('dead');
                            newGen[y][x] = 0; // Cell dies
                        } else {// Else cell lives
                            cell.classList.add('alive');
                        }
                    } else {
                        if (totalNeighbours === 3) {
                            cell.classList.add('alive');
                            newGen[y][x] = 1; // Cell is born!
                        } else {
                            cell.classList.add('dead');
                        }
                    }

                    row.appendChild(cell);
                }
                game.appendChild(row) 
            }

            if (_.isEqual(grid, newGen)) {
                clearInterval(loop)
            } else {
                gen++;
                grid = newGen;
            }

        }, 500)

    } catch (err) {
        console.log('Error: ', err)
    }
}

gameOfLife()

// Counts the two adjacent cells to the current one
function lineCells(x,y) {

    const prevCell = x > 0 
                        ? grid[y][x-1] 
                        : 0;

    const nextCell = x < grid[y].length - 1 
                      ? grid[y][x+1] 
                      : 0;

    return prevCell + nextCell
}

// Counts the three upper neighbour cells of the current one
function upperCells(x,y) {
    if (grid[y-1]) {

        const uCell = grid[y-1][x];

        const previousUCell = x > 0 
                                ? grid[y-1][x-1] 
                                : 0;

        const nextUCell = x < grid[y-1].length - 1 
                            ? grid[y-1][x+1] 
                            : 0;

        return uCell + previousUCell + nextUCell;
    }
    return 0;
}

// Counts the three lower neighbour cells of the current one
function bottomCells(x,y) {
    if (grid[y+1]) {

        const bCell = grid[y+1][x];

        const previousBCell = x > 0 
                                ? grid[y+1][x-1] 
                                : 0;
                                
        const nextBCell = x < grid[y+1].length - 1 
                            ? grid[y+1][x+1] 
                            : 0;

        return bCell + previousBCell + nextBCell;
    }
    return 0;
}


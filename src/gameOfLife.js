import _ from "lodash";


const gameOfLife = (interval, grid, game, counter, callback) => {

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
                const totalNeighbours = upperCells(grid,x,y) + bottomCells(grid,x,y) + lineCells(grid,x,y)

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
            callback()
        } else {
            gen++;
            counter.innerHTML = gen;
            grid = newGen;
        }

    }, interval)
}

// Counts the two adjacent cells to the current one
function lineCells(grid,x,y) {

    const prevCell = x > 0 
                        ? grid[y][x-1] 
                        : 0;

    const nextCell = x < grid[y].length - 1 
                      ? grid[y][x+1] 
                      : 0;

    return prevCell + nextCell
}

// Counts the three upper neighbour cells of the current one
function upperCells(grid,x,y) {
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
function bottomCells(grid,x,y) {
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

export default gameOfLife;
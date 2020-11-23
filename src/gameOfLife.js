import _ from "lodash";

export default class GameOfLife {
    constructor() {
        this.gens = 0;
        this.running = false;
        this.interval = undefined;
    }

    start(time, counter, callback) {

        this.running = true;

        const rows = Array.from(document.getElementsByClassName('row'));

        // Create a binary representation of each cell
        // 0 = cell is dead
        // 1 = cell is alive
        let cellsRef = rows.map(
            row => Array.from(row.children).map(
                cell => cell.className === 'cell alive' ? 1 : 0
            )
        );

        this.interval = setInterval(() => { 
    
            // Deep clone the reference to be able to mutate it on the fly without affecting cell replication outcome
            // The clone will be used to loop through each cell and check its neighbours
            const cells = _.cloneDeep(cellsRef)
    
            cells.forEach(
                (row, y) => {
                    row.forEach(
                        (cell, x) => {
                            const neighbours = lineCells(cells, x, y) + upperCells(cells, x, y) + bottomCells(cells, x, y)

                            if ( cell && neighbours < 2 || neighbours > 3 ) {
                                // Cell dies by underpopulation or overpopulation
                                rows[y].children[x].classList.remove('alive'); // Update cell in display grid
                                cellsRef[y][x] = 0; // Update cell status in ref

                            } else if (neighbours === 3) {
                                // Cell is born when it has exactly 3 neighbours
                                rows[y].children[x].classList.add('alive');
                                cellsRef[y][x] = 1;
                            }
                            // else the status of the cell doesn't change
                        }
                    )
            })
    
            if (_.isEqual(cells, cellsRef)) {
                /*
                If the grid hasn't changed, it means that the game has softlocked.
                It won't change anymore unless the player changes the cell arrangement, so further looping is unneeded.

                Stop the game to let the player change the arrangements.
                */
                this.stop()
                callback() // Effects to be executed when game is over (change a button's bg, etc.)
            } else {
                this.gens++;
                counter.innerHTML = this.gens; // Update game counter
            }
    
        }, time)
    }

    stop() {
        clearInterval(this.interval);
        this.running = false;
    }

    reset() {
        this.stop();
        this.gens = 0;
        counter.innerHTML = 0;
    }
}



// Counts the left and right neighbour cells of the current cell
function lineCells(cells, x, y) {

    const prevCell = cells[y][x-1] || 0;

    const nextCell = cells[y][x+1] || 0;

    return prevCell + nextCell
}

// Counts the three neighbour cells in the row above of the current cell  
function upperCells(cells, x, y) {

    if (y > 0) {
        const upperRow = y - 1

        const uCell = cells[upperRow][x];

        const previousUCell = cells[upperRow][x-1] || 0;

        const nextUCell = cells[upperRow][x+1] || 0;

        return uCell + previousUCell + nextUCell;
    }
    return 0;
}

// Counts the three neighbour cells in the row below of the current cell  
function bottomCells(cells, x, y) {

    if (y < cells.length-1) {
        const bottomRow = y+1;

        const bCell = cells[bottomRow][x];

        const previousBCell = cells[bottomRow][x-1] || 0 
                                
        const nextBCell = cells[bottomRow][x+1] || 0;

        return bCell + previousBCell + nextBCell;
    }
    return 0;
}

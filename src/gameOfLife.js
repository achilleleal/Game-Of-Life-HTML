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

        let cellsRef = rows.map(
            row => Array.from(row.children).map(
                cell => cell.className === 'cell alive' ? 1 : 0
            )
        );

        this.interval = setInterval(() => { 
    
            const cells = _.cloneDeep(cellsRef)
    
            cells.forEach(
                (row, y) => {
                    row.forEach(
                        (cell, x) => {
                            const neighbours = lineCells(cells, x, y) + upperCells(cells, x, y) + bottomCells(cells, x, y)

                            if ( cell && neighbours < 2 || neighbours > 3 ) {
                                rows[y].children[x].classList.remove('alive');
                                cellsRef[y][x] = 0;

                            } else if (neighbours === 3) {
                                rows[y].children[x].classList.add('alive');
                                cellsRef[y][x] = 1;
                            }
                        }
                    )
            })
    
            if (_.isEqual(cells, cellsRef)) {
                this.stop()
                callback()
            } else {
                this.gens++;
                counter.innerHTML = this.gens;
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



// Counts the two adjacent cells to the current one
function lineCells(cells, x, y) {

    const prevCell = cells[y][x-1] || 0;

    const nextCell = cells[y][x+1] || 0;

    return prevCell + nextCell
}

// Counts the three upper neighbour cells of the current one
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

// Counts the three lower neighbour cells of the current one
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

import _ from "lodash";


const gameOfLife = (interval, width, counter, callback) => {

    let gen = 0;
    let hasNotChanged = 0;

    const docCells = document.getElementsByClassName('cell');
    let cellsRef = Array.from(docCells).map(cell => cell.className === 'cell alive' ? 1 : 0);

    const loop = setInterval(() => { 

        const cells = [...cellsRef]

        cells.forEach((cell, i) => {

            const neighbours = lineCells(cells, i) + upperCells(cells, i, width) + bottomCells(cells, i, width)

            if ( cell && neighbours < 2 || neighbours > 3 ) {
                docCells[i].classList.remove('alive');
                cellsRef[i] = 0;

            } else if (neighbours === 3) {
                docCells[i].classList.add('alive');
                cellsRef[i] = 1;
            }

        })

        console.log(cells)

        if (_.isEqual(cells, cellsRef)) {
            clearInterval(loop)
            callback()
        } else {
            gen++;
            counter.innerHTML = gen;
            hasNotChanged = 0;
        }

    }, interval)
}

// Counts the two adjacent cells to the current one
function lineCells(cells, i) {

    const prevCell = i > 0 
                        ? cells[i-1] 
                        : 0;

    const nextCell = i < cells.length - 1 
                      ? cells[i+1]  
                      : 0;

    return prevCell + nextCell
}

// Counts the three upper neighbour cells of the current one
function upperCells(cells, i, width) {

    const upperRow = i-width;

    if (upperRow >= 0) {

        const uCell = cells[upperRow];

        const previousUCell = i > 0 
                                ? cells[upperRow-1] 
                                : 0;

        const nextUCell = i < cells.length - 1 
                            ? cells[upperRow+1] 
                            : 0;

        return uCell + previousUCell + nextUCell;
    }
    return 0;
}

// Counts the three lower neighbour cells of the current one
function bottomCells(cells, i, width) {

    const bottomRow = i+width;

    if (cells.length-1 - bottomRow >= 0) {

        const bCell = cells[bottomRow];

        const previousBCell = cells[bottomRow-1];
                                
        const nextBCell = cells[bottomRow+1];

        return bCell + previousBCell + nextBCell;
    }
    return 0;
}

export default gameOfLife;
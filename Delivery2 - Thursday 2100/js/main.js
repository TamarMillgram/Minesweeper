'use strict'
const MINE = '💣'
const FLAG = '🚩'
// const EMPTY = ''

var gBoard
var gGameInterval
var gGame
var gLevel

function onInit(gameLevel, numsMines) {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gLevel = {
        SIZE: gameLevel,
        MINES: numsMines
    }
    gBoard = buildBoard()
    console.log(gBoard)
    renderBoard(gBoard)

}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    // board[0][0].isMine = true
    // board[3][3].isMine = true


    findMinesNegsCount(board)
    return board
}

function minesOnBoard(numsMines, board, pos) {
    while (numsMines > 0) {
        for (var i = 0; i < gLevel.SIZE; i++) {
            for (var j = 0; j < gLevel.SIZE; j++) {
                if (!board[i][j].isMine && pos.i !== i && pos.j !== j) {
                    if (numsMines > 0 && Math.random() < gLevel.MINES / gLevel.SIZE ** 2) {
                        numsMines--
                        board[i][j].isMine = true
                    }
                }
            }
        }
    }
}


function findMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                var currCell = board[i][j]
                currCell.minesAroundCount = setMinesNegsCount(i, j, board)
            }
        }
    }
    return board
}


function setMinesNegsCount(rowIdx, colIdx, board) {
    var minesAroundCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j];
            if (currCell.isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}


function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            var className = ''
            strHTML += `\t<td 
                        class="cell ${className}" 
                        onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="javascript:flagMark(this, ${i}, ${j});return false;"></td>\n`
        }
        strHTML += `</tr>\n`
    }
    //  console.log(strHTML)

    const elCell = document.querySelector('.board')
    elCell.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (cell.isMarked || cell.isShown) return;
    cell.isShown = true
    if (cell.isShown && cell.isMine) {
        elCell.innerText = MINE
        elCell.className = 'mine'
    } else if (cell.isShown && cell.minesAroundCount) {
        elCell.innerText = cell.minesAroundCount
        elCell.className = 'shown'
    } else {
        elCell.className = 'shown'
    }
}


function onRightClick() {
    elCell.strHTML = FLAG
    el.addEventListener('contextmenu', function (ev) {
        ev.preventDefault()
        flagMark()
        return false
    }, false)
}

function flagMark(elCell, i, j) {
    var cell = gBoard[i][j]
    if (cell.isMarked) {
        cell.isMarked = false;
        elCell.innerText = '';
    } else {
        cell.isMarked = true;
        elCell.innerText = FLAG;
    }
}


// function expandShown(board, elCell, i, j) {
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= board.length) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= board[0].length) continue
//             var currCell = board[i][j];
//             if (currCell === '') {
//                 currCell.isShown = true
//             }
//         }
//     }

// }

// function onCellMarked(elCell, i, j) {

//     var cell = gBoard[i][j];

//     if (elCell.innerHTML === '') {
//         currCell.isMarked = true

//     } else if (elCell.innerHTML === FLAG); currCell.isMarked = false
// }


function checkGameOver() {

}


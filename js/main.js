'use strict'
const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''

// The Model
var gBoard
var gGameInterval
var gGame
var gLevel

function onInit() {
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gLevel = {
        SIZE: 4,
        MINES: 2
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
            board[i][j] = {
                minesAroundCount: setMinesNegsCount(board),
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    board[0][0].isMine = true
    board[3][3].isMine = true

    return board
}

function setMinesNegsCount(board) {
    var minesAroundCount = 0
    for (var i = board[i] - 1; i <= board[i] + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === board[j] && j === board[j]) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) minesAroundCount++
        }
    }
    console.log('minesAroundCount',minesAroundCount);
    return minesAroundCount
}


function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]

            var className = (cell.isMine) ? 'mine' : ''
            // if (cell.isShown) className += ' shown'

            strHTML += `\t<td class="cell ${className}
                        onclick="cellClicked(this, ${i}, ${j})" >
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    // console.log(strHTML)

    const elCell = document.querySelector('.board')
    elCell.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
    const cell = gBoard[i][j]
    if (cell.isMine || cell.isShown) return
    console.log('Cell clicked: ', elCell, i, j)
}
'use strict'
const MINE = '💣'
const FLAG = '🚩'
const ICON = '<img src="img/smiley.png" alt=""></img>'

var gLives = 3
var gBoard
var gGameInterval
var gGame
var gLevel
var isFirstClick

function onInit(gameLevel, numsMines) {
    isFirstClick = true
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
    // placeMines(gBoard)
    // findMinesNegsCount(gBoard)
    renderBoard(gBoard)
    document.querySelector('.timer').innerText = '00:000'

    if (gLives === 0) {
        var elLives = document.querySelector('.lives')
        elLives.innerText = '❤️ ❤️ ❤️'
        var elRestart = document.querySelector('.restart')
        var newRestartHTML = '<img src="img/smiley.png" alt="">'
        elRestart.innerHTML = newRestartHTML;
        elRestart.onclick = function () { onInit(4, 2) }
    }

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

    return board
}

function placeMines(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var emptyPos = getEmptyLocation(board)
        // console.log('emptyPos', emptyPos)
        board[emptyPos.i][emptyPos.j].isMine = true
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
                        data-i="${i}" data-j="${j}"
                        onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="javascript:flagMark(this, ${i}, ${j});return false;"></td>\n`
        }
        strHTML += `</tr>\n`
    }
    //  console.log(strHTML)

    const elCell = document.querySelector('.board')
    elCell.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    startTimer()
    if (gGame.isOn) {
        var cell = gBoard[i][j]
        if (cell.isMarked || cell.isShown) return;

        if (isFirstClick) {
            isFirstClick = false
            placeMines(gBoard, i, j)
            findMinesNegsCount(gBoard)
        }

        cell.isShown = true
        if (cell.isShown && cell.isMine) {
            MineClicked(elCell)
        } else if (cell.isShown && cell.minesAroundCount) {
            elCell.innerText = cell.minesAroundCount
            elCell.classList.add('shown')
            gGame.shownCount++
        } else {
            elCell.classList.add('shown')
            gGame.shownCount++
            expandShown(gBoard, elCell, i, j)

        }
        checkGameOver()
    }
}

function MineClicked(elCell) {
    elCell.innerText = MINE
    elCell.classList.add('mine')
    gLives--
    // console.log('gLives', gLives);
    if (gLives === 2) {
        var elLives = document.querySelector('.lives')
        elLives.innerText = '❤️ ❤️ 💔'
        var elRestart = document.querySelector('.restart')
        var newRestartHTML = '<img src="img/upset.png" alt="">'
        elRestart.innerHTML = newRestartHTML
        elRestart.onclick = function () { onInit(4, 2) }
    } else if (gLives === 1) {
        var elLives = document.querySelector('.lives')
        elLives.innerText = '❤️ 💔 💔'
        var elRestart = document.querySelector('.restart')
        var newRestartHTML = '<img src="img/upset.png" alt="">'
        elRestart.innerHTML = newRestartHTML
        elRestart.onclick = function () { onInit(4, 2) }
    } else {
        var elLives = document.querySelector('.lives')
        elLives.innerText = '💔 💔 💔'
        var elRestart = document.querySelector('.restart')
        var newRestartHTML = '<img src="img/sad.png" alt="">'
        elRestart.innerHTML = newRestartHTML;
        elRestart.onclick = function () { onInit(4, 2) }
        gameOver()
    }
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gGameInterval)
    document.querySelector('.timer').innerText = '00:00'

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if(currCell.isMine) {
                var elCell = document.querySelector('.cell')
                elCell.classList.add('mine')
                elCell.innerText = MINE
            }
        }
    }
}

function onRightClick() {
    el.addEventListener('contextmenu', function (ev) {
        ev.preventDefault()
        flagMark()
        checkGameOver()
        return false
    }, false)
}

function flagMark(elCell, i, j) {
    gGame.markedCount++
    var cell = gBoard[i][j]
    if (cell.isMarked) {
        cell.isMarked = false;
        elCell.innerText = '';
    } else {
        cell.isMarked = true;
        elCell.innerText = FLAG;
    }
}

function expandShown(board, elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === cellI && j === cellJ) continue
            if (!board[i][j].minesAroundCount && !board[i][j].isMine && !board[i][j].isMarked) {
                board[i][j].isShown = true

                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.classList.add('shown')

            }
        }
    }

}

function checkGameOver() {
    // console.log('gGame.shownCount', gGame.shownCount);
    // console.log('gGame.markedCount', gGame.markedCount);
    var boradCells = gLevel.SIZE ** 2
    if (gGame.markedCount === gLevel.MINES && gGame.shownCount === boradCells - gLevel.MINES) {
        victory()
    }
}

function victory() {
    gGame.isOn = false
    clearInterval(gGameInterval)
    document.querySelector('#timer').innerText = '00:000'
    var elRestart = document.querySelector('.restart')
    var newRestartHTML = '<img src="img/happy.png" alt="">'
    elRestart.innerHTML = newRestartHTML
    elRestart.onclick = function () { onInit(4, 2) }
}



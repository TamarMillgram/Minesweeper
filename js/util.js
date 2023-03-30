'use strict'

function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}


function getEmptyLocation(board) {
    var emptyLocations = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                emptyLocations.push({ i, j })

            }
        }
    }
    if (!emptyLocations.length) return null
    var randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    return emptyLocations[randIdx]
}
function getRandomIntInclusive(min, max) {
   var pos = Math.floor(Math.random() * (max - min + 1)) + min
    return pos
}

// function findEmptyPos(board) {
//     var emptyPoss = []
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = board[i][j]
//             var pos = { i, j }
//             // var pos = { i: i, j: j }
//             emptyPoss.push(pos)


//         }
//     }
//     var randIdx = getRandomInt(0, emptyPoss.length)
//     var randPos = emptyPoss[randIdx]
//     console.log('randPos', randPos);
//     return randPos
// }



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min+1) + min)
}
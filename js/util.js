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



function findEmptyPos(board) {
    const emptyPoss = []
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {

          emptyPoss.push({ i, j }) // {i:1,j:3}
        
      }
    }
    // var randIdx = getRandomInt(0, emptyPoss.length)

    return emptyPoss
  }



// function findEmptyPos(board) {

//     var emptyPoss = []

//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
//             var cell = board[i][j]
//             if (!cell) {
//                 var pos = { i, j }
//                 // var pos = { i: i, j: j }
//                 emptyPoss.push(pos)
             
//             }
//         }
//     }
//     var randIdx = getRandomInt(0, emptyPoss.length)
//     var randPos = emptyPoss[randIdx]
//     console.log('randPos',randPos);
//     return randPos
// }



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}
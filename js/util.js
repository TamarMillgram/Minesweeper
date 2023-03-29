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

  
function findEmptyPos() {
      
    var emptyPoss = []
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j]
            // console.log('cell', cell)
            // console.log('cell === \'\'', cell === '')
            // console.log('!cell', !cell)
            if (!cell) {
                var pos = { i, j }
                // var pos = { i: i, j: j }
                emptyPoss.push(pos)
              }
          }
      }
      var randIdx = getRandomInt(0, emptyPoss.length)
      var randPos = emptyPoss[randIdx]
      return randPos
  }



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}
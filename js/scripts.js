let count = 1
const boardArray = new Array()
const xLeft = ['x', 'x', 'x', 'x', 'x']
const oLeft = ['o', 'o', 'o', 'o']
const scoreArray = [0, 0, 0]
const playerArray = ['JIM', 'DRAW', 'MELISSA']
let xWin = false;
let oWin = false;
let winner = '';

$('.p1-prompt-text').html("It's your turn, " + playerArray[0] + "!")
$('.p2-prompt-text').html("")

const checkWin = function (array) {
  const winArray = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]]

  for (let i = 0; i < winArray.length; i++) {
     xWin = winArray[i].every(function (e) {
       winner = array[e]
       return array[e] === 'x'

     })
     oWin = winArray[i].every(function (e) {
       winner = array[e]
       return array[e] === 'o'
     })
     if(xWin || oWin){
       return true
     }
  }
}

const renderBoard = function (array, xLeft, oLeft) {
  for (let i = 0; i < array.length; i++) {
    $('#' + i).html(array[i])
  }
  for (let i = 0; i < 5; i++) {
    if(xLeft[i] === undefined) {
      $('#x' + i).html('')
    } else {
      $('#x' + i).html(xLeft[i])
    }
  }
  for (let i = 0; i < 4; i++) {
    if(oLeft[i] === undefined) {
      $('#o' + i).html('')
    } else {
      $('#o' + i).html(oLeft[i])
    }
  }

  for (let i = 0; i < scoreArray.length; i++) {
    $('#player' + i).html(playerArray[i] + ':  <span id="score0" class="score">'+ scoreArray[i] + '</span>')
  }
}

renderBoard(boardArray, xLeft, oLeft)

$('.square').on('click',function(e) {
  let squareClicked = boardArray[+$(this).attr('id')]
  let length = boardArray.filter((e) =>
  {return e !== undefined}).length

  if((length % 2 === 0) && (squareClicked === undefined) && (xWin === false) && (oWin === false)) {
    boardArray[+$(this).attr('id')] = 'x'
    if(checkWin(boardArray)){
      $('.p2-prompt-text').html("You won, " + playerArray[0] + "!")
      $('.p1-prompt-text').html("You won, " + playerArray[0] + "!")
      scoreArray[0] = scoreArray[0] + 1
    } else {
      $('.p2-prompt-text').html("It's your turn, " + playerArray[2] + "!")
      $('.p1-prompt-text').html("")
    }

    xLeft.pop()
    renderBoard(boardArray, xLeft, oLeft)
  } else if ((length % 2 === 1) && (squareClicked === undefined) && (xWin === false) && (oWin === false)){
    boardArray[+$(this).attr('id')] = 'o'
    if(checkWin(boardArray)) {
      $('.p1-prompt-text').html("You won, " + playerArray[2] + "!")
      $('.p2-prompt-text').html("You won, " + playerArray[2] + "!")
      scoreArray[2] = scoreArray[2] + 1
    } else {
      $('.p1-prompt-text').html("It's your turn, " + playerArray[0] + "!")
      $('.p2-prompt-text').html("")
    }
    oLeft.pop()
    renderBoard(boardArray, xLeft, oLeft)
  } else {
    console.log('seat taken! or game is over')
  }
  console.log(boardArray)

  length = boardArray.filter((e) =>
  {return e !== undefined}).length

  console.log(winner)
  if(length === 9 && (!xWin && !oWin)) {
    $('.p1-prompt-text').html("BORING! It was a draw...")
    $('.p2-prompt-text').html("BORING! It was a draw...")
    scoreArray[1] = scoreArray[1] + 1
    renderBoard(boardArray, xLeft, oLeft)
  }
})

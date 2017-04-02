let count = 1
const boardArray = new Array()
const xLeft = ['x', 'x', 'x', 'x', 'x']
const oLeft = ['o', 'o', 'o', 'o']
const Player = function (name){
  this.name = name
}

const renderBoard = function (array, xLeft, oLeft) {
  for(let i = 0; i < array.length; i++) {
    $('#' + i).html(array[i])
  }
  for(let i = 0; i < 5; i++) {
    if(xLeft[i] === undefined) {
      $('#x' + i).html('')
    } else {
      $('#x' + i).html(xLeft[i])
    }
  }
  for(let i = 0; i < 4; i++) {
    if(oLeft[i] === undefined) {
      $('#o' + i).html('')
    } else {
      $('#o' + i).html(oLeft[i])
    }
  }
}

renderBoard(boardArray, xLeft, oLeft)

$('.square').on('click',function(e) {
  let squareClicked = boardArray[+$(this).attr('id')]
  let length = boardArray.filter((e) =>
  {return e !== undefined}).length

  if((length % 2 === 0) && (squareClicked === undefined)) {
    boardArray[+$(this).attr('id')] = 'x'
    $('.p2-prompt-text').html("It's your turn, Player Two!")
    $('.p1-prompt-text').html("")
    xLeft.pop()
    renderBoard(boardArray, xLeft, oLeft)
  } else if ((length % 2 === 1) && (squareClicked === undefined)){
    boardArray[+$(this).attr('id')] = 'o'
    $('.p1-prompt-text').html("It's your turn, Player One!")
    $('.p2-prompt-text').html("")
    oLeft.pop()
    renderBoard(boardArray, xLeft, oLeft)
  } else {
    console.log('seat taken!')
  }
  console.log(boardArray)
  console.log(xLeft)
  console.log(oLeft)

  length = boardArray.filter((e) =>
  {return e !== undefined}).length

  if(length === 9) {
    console.log('game over')
  }
})

export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const bestMove =  (squares, ai , human) =>{
  console.log(squares);
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  for(let i = 0; i < 9 ; i++){
    const row = Math.floor(i/3)
    const coluam = (i%3).toFixed()
    if(squares[i]){
       board[row][coluam] = squares[i]
    }
  }
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      
      if (board[i][j] == '') {
        board[i][j] = ai

        console.log(i,j,board);
        let score = minimax(board, 0, false, squares,ai,human);
        console.log(score);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai
  const index = 3*move.i + move.j
  return index
}

let scores = {
  X: 10,
  O: -10,
  tie:0
};

const equals3 = (a, b, c)  => {
  return a == b && b == c && a != '';
}

const checkWinner = (board) => {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

const minimax =  (board, depth, isMaximizing, squares, ai,human) => {
  let result = checkWinner(board)
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false, squares, ai,human);
          board[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = human;
          let score =  minimax(board, depth + 1, true, squares, ai,human);
          board[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
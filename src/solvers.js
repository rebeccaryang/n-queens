/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var rooksBoard = new Board({n:n}); //fixme
  rooksBoard.togglePiece(0,0);
  for(var i = 1; i < n; i++){
    rooksBoard.togglePiece(i,i);
  }
  var solution = rooksBoard.rows()
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme
  var factorial = function(num){
    if(num===0){
      return 1 
    }
    return factorial(num-1) * num;
  }
  solution = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution;
  var generatePossibilities = function(board,currentRow,queensPlaced){
    if(queensPlaced == n){
      solution = JSON.stringify(board.rows());
      return;
    } 
    else if(currentRow >= n){
      return null;
    }
    
    for(var i = 0; i < n; i++){
      
      board.togglePiece(currentRow,i); 
      var isConflict = board.hasAnyQueensConflicts(); // if it has a conflict === true
      board.togglePiece(currentRow,i);
      if(isConflict === false){
        board.togglePiece(currentRow,i);
        generatePossibilities(board,currentRow+1,queensPlaced+1);
        board.togglePiece(currentRow,i);
      }
    }
  }  
  if(n == 1){
    board.togglePiece(0,0);
    solution = JSON.stringify(board.rows());
    board.togglePiece(0,0);
  }
  if(n == 2 || n == 3){
    solution = JSON.stringify(board.rows())
  } 
  else {
    generatePossibilities(board,0,0);
  }
  
  solution = JSON.parse(solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  var solutionEven = 0;
  var solutionMiddle = 0;
  var generatePossibilities = function(board,currentRow,queensPlaced){
   
  // If the board is odd 
   if(n%2===1){ 
    //If, in the odd board, it's NOT the middle row, add to solutionsEven
    if(queensPlaced == n && board.rows()[0][Math.floor(n/2)] !== 1){
      solutionEven++;
      return;
    } 
    //If, in the odd board, it IS the middle row, add to solution middle (should only happen once)
    if(queensPlaced == n && board.rows()[0][Math.floor(n/2)] === 1){
      solutionMiddle++;
      return;
    }
  }
  //If board is even then add to solutionEvens. 
  if(n%2 === 0){
    if(queensPlaced == n){
      solutionEven++;
      return;
    } 
  }
    else if(currentRow >= n){
      return null;
    }

    var i = currentRow === 0 ? Math.floor(n/2) : 0;

    for(i; i < n; i++){
      board.togglePiece(currentRow,i); 
      var isConflict = board.hasAnyQueensConflicts(); // if it has a conflict === true
      board.togglePiece(currentRow,i);
      if(isConflict === false && queensPlaced === currentRow){
        board.togglePiece(currentRow,i);
        generatePossibilities(board,currentRow+1,queensPlaced+1);
        board.togglePiece(currentRow,i);
      }
    }
  }
    
  if(n == 0){
    return 1;
  }
  if(n == 1){
    return 1;
  } else if(n == 2 || n == 3){
    return 0;
  } else {
    generatePossibilities(board,0,0);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionEven*2 + solutionMiddle);
  return solutionEven*2 + solutionMiddle;
};


// window.countNQueensSolutions = function(n) {
//   var board = new Board({n:n});
//   var solution = 0;
//   var generatePossibilities = function(board,currentRow,queensPlaced){
//     if(queensPlaced == n){
//       solution++;
//       return;
//     } 
//     else if(currentRow >= n){
//       return null;
//     }

//     for(var i = 0; i < n; i++){
//       board.togglePiece(currentRow,i); 
//       var isConflict = board.hasAnyQueensConflicts(); // if it has a conflict === true
//       board.togglePiece(currentRow,i);
//       if(isConflict === false && queensPlaced === currentRow){
//         board.togglePiece(currentRow,i);
//         generatePossibilities(board,currentRow+1,queensPlaced+1);
//         board.togglePiece(currentRow,i);
//       }
//     }
//   }  
//   if(n == 1){
//     solution = 1;
//   } else if(n == 2 || n == 3){
//     solution = 0;
//   } else {
//     generatePossibilities(board,0,0);
//   }

//   console.log('Number of solutions for ' + n + ' queens:', solution);
//   return solution;
// };

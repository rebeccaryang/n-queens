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
    for(var j = 1; j < n; j++){
      rooksBoard.togglePiece(i,j);
      if(rooksBoard.hasAnyRooksConflicts()){
        rooksBoard.togglePiece(i,j);
      }
    }
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
  var solution = 0; //fixme

  if(n == 2 || n == 3){
    return solution;
  }
  var generatePossibilities = function(board,currentRow,queensPlaced){
    if(queensPlaced == n){
      solution++
    } else if(currentRow >= n){
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
  var board = new Board({n:n});
  generatePossibilities(board,0,0);


  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};

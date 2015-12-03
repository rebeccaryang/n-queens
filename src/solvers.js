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
  if(n <= 3){
    return 0;
  }
  var queensBoard = new Board({n:n});
  queensBoard.togglePiece(0,1);
  for(var i = 1; i<n;i++){
    for(var j = 0;j<n;j++){
      queensBoard.togglePiece(i,j);
      if(queensBoard.hasAnyQueensConflicts()){
        queensBoard.togglePiece(i,j);
      }
    }
  }
  var solution = queensBoard.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

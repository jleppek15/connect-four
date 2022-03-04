/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let i = 0; i < HEIGHT; i++){
        board.push([]);
    }
    board.forEach(function(ele){
        for (let x=0; x < WIDTH; x++){
            ele.push(null);
        }
    })
    console.log(board);
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.querySelector('#board');
   // TODO: add comment for this code
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
   //creates a new table element assigned to "top" that new table elements will be appended to, it also sets its id to 'column-top' and creates an event listener for every child element, which activates the function 'handleClick'
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
   //this loop creates table rows until the variable WIDTH has been reached, setting their id to x and also appending them to the "top" variable. The next line appends the whole creation to the original board HTML element.
 
   // TODO: add comment for this code
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
     //This loop creates table COLUMNS until the HEIGHT variable has been reached. Setting their id to 'y'. It then creates a full row of table rows for each column created, setting their variable to the 'y-x' coordinates. Then it appends the created elements to their places
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   let result = null;
   for (let i = 0; i < board.length; i++){
           board[i][x] ? i++ : result = i;
   }
 return result;
}

 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const gamePiece = document.createElement('div');
   gamePiece.setAttribute('class', 'piece');
   if(currPlayer === 1){
       gamePiece.setAttribute('id', 'player1')
   }
   else{
       gamePiece.setAttribute('id', 'player2')
   }
   let correctCell = document.getElementById(`${y}-${x}`);
   correctCell.append(gamePiece);
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   if(msg){
   throw alert(msg);
   }
   else{
       throw alert('THE GAME IS OVER!')
   }
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   var x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   var y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);
   board[y][x] = currPlayer;
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if(board.every(function(val){
       let end = false;
       for (let spot of val){
           spot ? end = true : end = false;
       }
        return end;
    }))
       {
       return endGame();
    }
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   //CAN YOU REWRITE AS TERNARY FUNCTION***
currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
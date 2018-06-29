// This creates the board/players and possible winning combinations in an array.
////////////////////////////////////////////////////////////////////////////////
var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
// This stores a reference to all of the class=cells.
///////////////////////////////////////////////
const cells = document.querySelectorAll('.cell');
startGame();
// This starts the game. It also starts the game again when you click the replay
// button and resets all the cells.
////////////////////////////////////////////////////////////////////////////////
function startGame() {
	document.querySelector(".endgame").style.display = "none";
	//This gives the origBoard it's array from 0-9
	origBoard = Array.from(Array(9).keys());
	//Removes all x and o from board, highlight backgroundColor and prevents click.
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}
//Gives the id of cell number and starts the turn function.
///////////////////////////////////////////////////////////
function turnClick(square) {
	//Checks index of squareId to see if still a number or Player X or O.
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		//Computer checks if tie or not. If not will take a turn.
		if (!checkTie()) turn(bestSpot(), aiPlayer);
	}
//Gets an id from the square and checks against a win or not.
/////////////////////////////////////////////////////////////
//Creates an array of squareId and player who selected it.
function turn(squareId, player) {
	origBoard[squareId] = player;
	//Fills square with players id X or O.
	document.getElementById(squareId).innerText = player;
	//Runs the checkWin or gameWon functions i.e has the game been won or not?
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}
//Defines the checkWin function.
////////////////////////////////
function checkWin(board, player) {
	//Creates an index of positions on the board that have already been played.
	//merges the array.
	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	//Loops through every winning combo and creates index.
	for (let [index, win] of winCombos.entries()) {
		//Checks to see if player has played in every square that counts as a win.
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			//If player has won. Lists the combo and the player that selected them.
			gameWon = {index: index, player: player};
			break;
		}
	}
	//If player won, return the gameOver function.
	return gameWon;
}
//What happens when the game has been won.
//////////////////////////////////////////
function gameOver(gameWon) {
	//Searches through the index of wins, finds the winner and colors the winning
	//squares combo.
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	//Disables the eventListener in each cell to stop player being able to click.
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	//Declares winner or loser and shows the text
	declareWinner(gameWon.player == huPlayer ? "Winner Winner Chicken Dinner!" : "Game Over Loser. Try Again!");
}

//Computer checks to see what element is in the square. If number it will return
//the number.
///////////////////////////////////////////////////////////////////
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}
//Function to tell where computer will play by finding the first empty square.
//Really dumb AI.
//////////////////////////////////////////////////////////////////////////////
function bestSpot() {
	return emptySquares()[0];
}
//Sees if every square is filled up but no-one has won. Runs tie function.
//////////////////////////////////////////////////////////////////////////
function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			//Colors background and prevents player from clicking.
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
//Runs the visuals from html and css for a Winner.
//////////////////////////////////////////////////
function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

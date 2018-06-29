# Project 0

## Tic Tac Toe

## Build Status
Complete

## Feautures

Very proud of the the array of winning arrays that i came up with.

There are a few lines of code that were completed by my uncle in law that is complete ninja code. They will be referenced below.

## Code Example

Here is the code that was completed by my Uncle In law, that I cannot take any credit for.

###### This gives the origBoard it's array from 0-9

origBoard = Array.from(Array(9).keys());

###### Checks index of squareId to see if still a number or Player X or O.

if (typeof origBoard[square.target.id] == 'number') {
  turn(square.target.id, huPlayer)
###### Computer checks if tie or not. If not will take a turn.
  if (!checkTie()) turn(bestSpot(), aiPlayer);

###### Creates an index of positions on the board that have already been played and merges the array.

	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	//Loops through every winning combo and creates index.
	for (let [index, win] of winCombos.entries()) {
		//Checks to see if player has played in every square that counts as a win.
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			//If player has won. Lists the combo and the player that selected them.
			gameWon = {index: index, player: player};
			break;


## Credits

Marcus Cook Helped with some of the Javascript. Which I would Not have been able to without him.

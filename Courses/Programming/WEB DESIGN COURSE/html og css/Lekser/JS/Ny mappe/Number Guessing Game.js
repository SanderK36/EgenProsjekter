//Create secret number
var secretNumber = 56;

//ask user for guess
var guess = prompt('Guess a number');

//check guess is right
if (Number(guess) === secretNumber) {
	alert('YOU GOT IT RIGHT!');
} else if (Number(guess) > secretNumber) {
	//otherwise, check if higher
	alert('Too high.  Guess again!');
} else if (Number(guess) < secretNumber) {
	alert('Too low.  Guess again!');
}

var secretNumber = 76;
var guess = prompt('Guess a number!');
if (Number(guess) === secretNumber) {
	alert('YOU GOT IT RIGHT!');
} else if (Number(guess) > secretNumber) {
	alert('Too high. Guess again!');
} else if (Number(guess) < secretNumber) {
	alert('Too low. Guess again!');
}

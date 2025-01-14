/**
 * Hangman
 * @revision $Id$
 */

var Hangman = function () {
	var BLANK = '_';
	var MAX_TRIES = 6;
	var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var words	= ['monkey','pirate','ninja','unicorn','roflcopter','omgwtf'];
	
	var word = '';
	var tries = 0;
	var display = [];
	
	function setLetters () {
		var choices = [];
		for (var x=0; x<letters.length; ++x)
			choices.push('<a href="">' + letters[x] + '</a>');
		document.getElementById("letters").innerHTML = choices.join('');
		var choices = document.querySelectorAll("#letters a");
		for (var j=0; j<choices.length; ++j)
			choices[j].onclick = makeGuess;
	}
	
	function setWord () {
		word = words[Math.ceil(Math.random() * words.length-1)];
		for (var i=0; i<word.length; ++i)
			display.push(BLANK);
		document.getElementById("word").innerHTML = display.join(' ');
	}
	
	function makeGuess (evt) {
		evt.preventDefault();
		if ('chosen'.indexOf(this.className) == -1) return;
		this.className += ' chosen';
		var correct = false;
		for (var g=0; g<word.length; ++g) {
			if (word[g].toUpperCase() == this.text) {
				display[g] = this.text;
				correct = true;
				this.className += ' correct';
			}
		}
		if (!correct) {
			this.className += ' incorrect';
			++tries;
			document.getElementById("part"+tries).style.display = 'block';
			if (tries == MAX_TRIES) {
				document.getElementById("part1").className += 'lost';
				endGame("LOST!");
			}
		} else {
			document.getElementById("word").innerHTML = display.join(' ');
			if (display.join('') == word.toUpperCase())
				endGame("WON!");
		}
	}
	
	function endGame (result) {
		document.getElementById("word").innerHTML = word.toUpperCase().split('').join(' ');
		document.getElementById("status").innerHTML = "YOU " + result;
	}
	
	function playGame () {
		setLetters();
		setWord();
	}	
	
	
	return {
		play 	: playGame
	}
	
}();


Hangman.play();

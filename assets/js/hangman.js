/**
 * Hangman
 * @revision $Id$
 */

function Hangman() {
	const MAX_TRIES = 6
    word = ''
    guessedLetters = []

    const startGame = () => {
        this.guessedLetters = [];
       // fetch('https://random-word-api.herokuapp.com/word?number=1')
       fetch('https://random-word-form.herokuapp.com/random/animal')
            .then(response => response.json())
            .then(data => {
                word = data[0].toUpperCase();
                setLetters();
                updateWord();
            });
    }
	
	const setLetters = () => {
        const le = document.getElementById("letters");
        le.innerHTML = ''; // clear
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => {
            let a = Object.assign(document.createElement('a'), { href: '#', className: 'letter', innerText: c, onclick: handleGuess});
            le.appendChild(a);
        });
	}
	
	const updateWord = () => {
        const we = document.getElementById('word');
        we.innerHTML = word.split('')
            .map(letter => guessedLetters.includes(letter) ? letter : '_')
            .join(' ');
	}

    const updateHangman = () => {
        
        guessedLetters.filter(c => !word.includes(c)).forEach((c,i) => {
            const elem = document.getElementById('part' + (i+1));
            elem.style.display = 'block';
        });

        if (guessedLetters.filter(c => !word.includes(c)).length === MAX_TRIES) {
            document.getElementById('part1').className += ' lost';
            return endGame(false);
        }
        if (word === document.getElementById('word').innerText.replace(/\s/g,'')) {
            return endGame(true);
        }
    }
	
    const handleGuess = (event) => {
        event.preventDefault();
        const elem = event.target;
        const letter = elem.text;
        if (letter.length !== 1) {
            return;
        }
        if (guessedLetters.includes(letter)) {
            return;
        }
        
        elem.className += ' chosen' + (word.includes(letter) ? ' correct' : ' incorrect');
        guessedLetters.push(letter);

        updateWord();
        updateHangman();
    }
	
	const endGame = (win) => {
        let ls = document.getElementsByClassName("letter")
        for (let i = 0; i < ls.length; i++) { ls[i].onclick = `javascript:void()` }
		document.getElementById("word").innerHTML = word.split('').join(' ');
		document.getElementById("status").innerHTML = "YOU " + (win ? "WIN" : "LOSE");
        console.log("Game over - ", win ? "win" : "lose");
	}

    return {
        startGame: startGame,
        endGame: endGame
    };
	
};

const app = new Hangman();
app.startGame();



// const guessedLetters = [];

// function startGame() {
//     fetch('https://random-word-api.herokuapp.com/word?number=1')
//         .then(response => response.json())
//         .then(data => {
//             word = data[0].toUpperCase();
//             updateWord();
//         });
// }

// const handleGuess = (event) => {
//     const letter = event.target.value;
//     if (letter.length !== 1) {
//         return;
//     }
//     if (guessedLetters.includes(letter)) {
//         return;
//     }
//     guessedLetters.push(letter);
//     updateWord();
//     updateHangman();
// }

// const updateWord = () => {
//     const wordElement = document.getElementById('word');
//     wordElement.innerHTML = word
//         .split('')
//         .map(letter => guessedLetters.includes(letter) ? letter : '_')
//         .join(' ');
// }

// const updateHangman = () => {
//     const hangmanElement = document.getElementById('hangman');
//     hangmanElement.src = `assets/images/hangman${guessedLetters.length}.png`;
// }


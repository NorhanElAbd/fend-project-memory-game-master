/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let card = document.getElementsByClassName('card');
let cards = [...card];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//loop through each card and create its HTML
//add each card's HTML to the page

let deck = document.getElementById('deck');

function startGame() {
    let shuffledCards = shuffle(cards);
    shuffledCards.forEach(function (card) {
        deck.appendChild(card);
    });
}

window.onload = startGame();

window.onload = function () {
    setInterval(update, 1000);
};

let restart = document.getElementById('restart');
let winScreen = document.getElementById('winScreen');

let restartGame = function () {
    Array.from(deck.children).forEach(function (card) {
        card.classList.remove('match');
        card.classList.remove('open');
        card.classList.remove('show');
        winScreen.style.display = "none";
        compareIconArray = [];
        timeMin = 0;
        timeSec = 0;
    });
    startGame();
}

restart.addEventListener('click', function () {
    resetStars();
    restartGame();
    resetScore();

});

let compareIconArray = [];
let compareElementArray = [];
let moves = document.getElementById('moves');
let movesCounter = 0;

let flipCard = function () {
    if (event.target.nodeName == "LI" && !event.target.classList.contains('open') && !event.target.classList.contains('match')) {
        event.target.classList.add("open");
        event.target.classList.add("show");

        compareElementArray.push(event.target);

        let icon = event.target.querySelector('.fa').classList.toString();
        compareIconArray.push(icon);

        if (compareIconArray.length == 2) {
            checkMatch();
            endGame();
        }
    }
}

deck.addEventListener('click', flipCard);


function checkMatch() {

    if (compareIconArray[0] === compareIconArray[1]) {
        compareElementArray.forEach(function (card) {
            card.classList.add('match');
            card.classList.remove('show');
            card.classList.remove('open');
        });
    }
    closeCards();
}

function closeCards() {
    calcScore();

    Array.from(deck.children).forEach(function (card) {
        setTimeout(function () {
            card.classList.remove("open");
            card.classList.remove("show");
            compareIconArray = [];
            compareElementArray = [];
        }, 500);
    });
}

function calcScore() {
    movesCounter++;
    moves.textContent = movesCounter.toString();
    starRate();
}

function resetScore() {
    movesCounter = 0;
    moves.textContent = movesCounter.toString();
}

let welldone = document.getElementById('wellDoneText');

function endGame() {
    let matchedCards = 0;
    Array.from(deck.children).forEach(function (card) {
        if (card.classList.contains('match')) {
            matchedCards++;
        }
    });

    if (matchedCards == 16) {
        winScreen.style.display = "block";
        welldone.textContent = 'Well Done you did ' + movesCounter + ' Moves in Time ' + timeMin + ':' + timeSec + ' seconds. and your star rate is ' + starNum + ' stars';
    }
}


let starCount = document.getElementsByClassName('fa-star');
let starArray = [...starCount];
let starNum = 3;

let starRate = function () {
    if (movesCounter == 4 || movesCounter == 8) {
        starNum--;
        for (let i = starNum; i > 0; i--) {
            if (starArray[i].classList.contains('fa-star') > -1) {
                starArray[i].classList.remove("fa-star");
                starArray[i].classList.add('fa-star-o');
                break;
            }
        }
    }
}

let resetStars = function () {
    let starReset = document.getElementsByClassName('fa-star-o');
    let starResetArray = [...starReset];
    for (let i = 0; i < starResetArray.length; i++) {
        if (starResetArray[i].classList.contains('fa-star-o') > -1) {
            starResetArray[i].classList.remove("fa-star-o");
            starResetArray[i].classList.add('fa-star');
        }
    }
    starNum = 3;
};

let timeMin = 0
    timeSec = 0;

let renderMin = document.getElementById('min');
let renderSec = document.getElementById('sec');    

function update() {
    timeSec++;
    if (timeSec == 59) {
        timeMin++;
        timeSec = 0;
    }
    renderMin.innerText = timeMin;
    renderSec.innerText = timeSec;
}

let playAgain = document.getElementById('playAgain');

playAgain.addEventListener('click', function () {
    resetScore();
    resetStars();
    restartGame();
    winScreen.style.display = 'none';
});

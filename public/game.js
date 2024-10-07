const gameBoard = document.querySelector('.game-board');
const resetBtn = document.getElementById('reset-btn');


let cardValues = [];
let selectedCards = [];
let matchedCards = [];
let totalMatches = 0;
const cardCount = 36; // 6x6 grid
const totalPairs = cardCount / 2;


function initializeGame() {
    
    selectedCards = [];
    matchedCards = [];
    totalMatches = 0;
    cardValues = generateCardValues();


    gameBoard.innerHTML = '';

    
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}


function generateCardValues() {
    let values = Array.from({ length: totalPairs }, (_, i) => i + 1).flatMap(i => [i, i]);
    
    values.sort(() => Math.random() - 0.5);
    return values;
}


function flipCard(event) {
    const card = event.target;
    const index = card.dataset.index;
    const value = card.dataset.value;

    
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    
    card.classList.add('flipped');
    card.textContent = value;
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.value === card2.dataset.value) {
        
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        totalMatches++;

        if (totalMatches === totalPairs) {
            setTimeout(() => alert('Congratulations! You win!'), 500);
        }
    } else {
        
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
        }, 1000);
    }

    
    selectedCards = [];
}


resetBtn.addEventListener('click', initializeGame);


initializeGame();

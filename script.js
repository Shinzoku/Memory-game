document.addEventListener('DOMContentLoaded', function () {
    // Liste des symboles Unicode utilisés dans le jeu
    const symbols = ['🌟', '🌈', '🍎', '🎉', '🚀', '🐼', '🎸', '🍕']; // Vous pouvez ajouter d'autres symboles Unicode

    // Création d'un tableau de cartes en dupliquant chaque symbole
    const cards = [...symbols, ...symbols]; // Chaque symbole doit apparaître deux fois

    let flippedCards = []; // Cartes retournées temporairement
    let matchedCards = []; // Cartes assorties
    let errorNbrs = 0; // Nombre d'erreurs accumulées

    // Fonction pour mélanger les éléments d'un tableau
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Fonction pour créer le plateau de jeu
    function createGameBoard() {
        shuffle(cards);

        const gameBoard = document.getElementById('game-board');

        cards.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.textContent = ''; // Le texte est vide au début
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    // Fonction appelée lorsqu'une carte est retournée
    function flipCard() {
        const card = this;

        // Vérifiez si la carte peut être retournée
        if (flippedCards.length < 2 && !flippedCards.includes(card)) {
            flippedCards.push(card);
            card.textContent = card.dataset.symbol;

            // Si deux cartes sont retournées, vérifie si elles correspondent
            if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000); // Une attente de 1 seconde avant de vérifier la correspondance
            }
        }
    }

    // Fonction pour vérifier si les cartes retournées correspondent
    function checkMatch() {
        const [card1, card2] = flippedCards;

        // Vérifie si les symboles des deux cartes correspondent
        if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
        } else {
            card1.textContent = '';
            card2.textContent = '';
            errorNbrs++
        }

        flippedCards = []; // Réinitialise les cartes retournées

        // Si toutes les cartes sont assorties, affiche un message de victoire et réinitialise le jeu
        if (matchedCards.length === cards.length) {
            alert('Félicitations, vous avez gagné !');
            resetGame();
        }
        
        // Si le nombre d'erreurs atteint 5, affiche un message de défaite et réintialise le jeu
        if (errorNbrs === 5) {
            alert('Dommage, vous avez perdu !');
            resetGame();
        }
    }

    // Fonction pour réinitialiser le jeu
    function resetGame() {
        flippedCards = [];
        matchedCards = [];
        errorNbrs = 0;
        document.getElementById('game-board').innerHTML = '';
        createGameBoard();
    }

    // Initialise le jeu en créant le plateau de jeu
    createGameBoard();
});
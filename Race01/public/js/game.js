document.addEventListener("DOMContentLoaded", function () {
    let playerHealth = 20;
    let aiHealth = 20;
    let playerPoints = 10;
    let aiPoints = 10;
    let playerCards = [];
    let aiCards = [];
    let playerDrawnCardIds = [];
    let aiDrawnCardIds = [];
    let isPlayerTurn;
    let timer;
    let timeLeft = 10;

    async function startGame() {
        await coinFlip();
        if (isPlayerTurn) {
            startPlayerTurn();
        } else {
            playAITurn();
        }
    }

    function coinFlip() {
        return new Promise((resolve) => {
            const coin = document.getElementById("coin");
            const coinResult = document.getElementById("coin-result");
            const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';  // Determine heads or tails

            // Remove any previous result classes
            coin.classList.remove('heads', 'tails');

            // Reset the transform first to avoid conflicts with subsequent animations
            coin.style.transform = 'rotateY(0deg)';

            // Trigger a repaint to ensure the reset is applied immediately
            void coin.offsetWidth;

            // Set new class and transform for the flip
            const rotationDegrees = flipResult === 'heads' ? 1800 : 1980;  // Heads: 1800deg, Tails: 1980deg
            coin.style.transform = `rotateY(${rotationDegrees}deg)`;
            coin.classList.add(flipResult);  // Add either 'heads' or 'tails' class for styling

            setTimeout(() => {
                // Display the result after the animation ends
                coinResult.textContent = flipResult === 'heads'
                    ? "Heads - Player goes first!"
                    : "Tails - AI goes first!";
                isPlayerTurn = flipResult === 'heads';  // Set player turn based on the result
                resolve();
            }, 1500);  // 1.5 seconds delay for the animation to complete
        });
    }

    function startPlayerTurn() {
        isPlayerTurn = true;
        playerPoints = 10; // Reset player points to 10 at the start of the turn
        updatePointsDisplay();
        resetTimer();
        enablePlayerActions();
        logMessage("Player's turn started.");
    }

    function startAITurn() {
        isPlayerTurn = false;
        aiPoints = 10; // Reset AI points to 10 at the start of the turn
        updatePointsDisplay();
        playAITurn();
    }

    function updatePointsDisplay() {
        document.getElementById("player-points").innerText = `Points: ${playerPoints}`;
        document.getElementById("ai-points").innerText = `Points: ${aiPoints}`;
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 30;
        updateTimerDisplay();

        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                endPlayerTurn();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}`;
    }

    function enablePlayerActions() {
        document.querySelectorAll("#player-hand .card").forEach(card => {
            card.addEventListener("click", playCard);
        });

        document.getElementById("end-turn-button").addEventListener("click", endPlayerTurn);
        document.getElementById("end-turn-button").disabled = false;
    }

    function disablePlayerActions() {
        document.querySelectorAll("#player-hand .card").forEach(card => {
            card.removeEventListener("click", playCard);
        });

        document.getElementById("end-turn-button").removeEventListener("click", endPlayerTurn);
        document.getElementById("end-turn-button").disabled = true;
    }

    function playCard(event) {
        if (!isPlayerTurn) return;

        let card = event.target;
        // If the user clicks on the image or text inside the button, find the parent button element
        if (card.tagName !== 'DIV') {
            card = card.closest('div');
        }
        let cardData = {
            id: card.dataset.id,
            name: card.dataset.name,
            attack: parseInt(card.dataset.attack),
            defense: parseInt(card.dataset.defense),
            cost: parseInt(card.dataset.cost),
            image: card.dataset.image
        };

        // Check if player has enough points to play the card
        if (playerPoints < cardData.cost) {
            logMessage(`Not enough points to play ${cardData.name}.`);
            return; // Don't play the card if not enough points
        }

        playerCards.push(cardData);
        playerDrawnCardIds.push(cardData.id);
        playerPoints -= cardData.cost; // Deduct points for playing the card
        updatePointsDisplay(); // Update points UI
        updateBoard("player-board", playerCards);
        logMessage(`Player played ${cardData.name} (ATK: ${cardData.attack}, DEF: ${cardData.defense}, COST: ${cardData.cost})`);
        card.remove(); // Remove the card from hand after it's played

        drawPlayerCard();
    }

    function drawPlayerCard() {
        fetch("/draw-card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ drawnCardIds: playerDrawnCardIds })
        })
            .then(response => response.json())
            .then(newCard => {
                if (newCard) {
                    let playerHand = document.getElementById("player-hand");
                    let newCardElement = createCardElement(newCard, true);
                    playerHand.appendChild(newCardElement);
                }
            });
    }

    function createCardElement(card, isPlayerCard) {
        let element = document.createElement("div");
        element.className = "card";
        if (isPlayerCard) {
            element.className = "card players-card";
            element.addEventListener("click", playCard);
        }
        element.dataset.id = card.id;
        element.dataset.name = card.name;
        element.dataset.attack = card.attack;
        element.dataset.defense = card.defense;
        element.dataset.cost = card.cost;
        element.dataset.image = card.image;
    
        // Create an image element
        let img = document.createElement("img");
        img.src = `./img/${card.image}`;
        img.alt = card.name;
        img.className = "card-image";
    
        // Create a text node for the card's name and stats
        let text = document.createElement("div");
        text.innerText = `${card.name} \n ATK: ${card.attack} \n DEF: ${card.defense} \n COST: ${card.cost}`;
    
        // Append the image and text to the button or div element
        element.appendChild(img);
        element.appendChild(text);
    
    
        return element;
    }
    

    function endPlayerTurn() {
        clearInterval(timer);
        disablePlayerActions();

        // Check if there is time left. If not, auto-play weakest cards.
        if (timeLeft <= 0) {
            autoPlayWeakestCards();
        }

        updateGameState();
        startAITurn(); // Move to AI's turn after player's turn ends
    }

    // Automatically play weakest cards based on available points
    // Automatically play weakest cards based on available points
    function autoPlayWeakestCards() {
        logMessage("Time's up! Automatically playing the weakest cards.");

        let playerHand = Array.from(document.querySelectorAll("#player-hand .card"));

        // Sort the hand by card cost in ascending order, then by attack power
        let sortedCards = playerHand.sort((a, b) => {
            let costDifference = parseInt(a.dataset.cost) - parseInt(b.dataset.cost);
            if (costDifference === 0) {
                return parseInt(a.dataset.attack) - parseInt(b.dataset.attack);
            }
            return costDifference;
        });

        // Play as many weakest cards as possible within available points
        for (let card of sortedCards) {
            let cardCost = parseInt(card.dataset.cost);

            if (playerPoints >= cardCost) {
                let cardData = {
                    id: card.dataset.id,
                    name: card.dataset.name,
                    attack: parseInt(card.dataset.attack),
                    defense: parseInt(card.dataset.defense),
                    cost: cardCost,
                    image: card.dataset.image
                };

                playerCards.push(cardData);
                playerDrawnCardIds.push(cardData.id);
                playerPoints -= cardCost; // Deduct points for playing the card
                updatePointsDisplay(); // Update points UI
                updateBoard("player-board", playerCards);
                logMessage(`Automatically played ${cardData.name} (ATK: ${cardData.attack}, DEF: ${cardData.defense}, COST: ${cardData.cost})`);

                // Remove the card from hand
                card.remove();

                // Draw a new card for each card played
                drawPlayerCard();

                // Check if enough points remain for the next card
                if (playerPoints <= 0) {
                    break;
                }
            }
        }
    }



    function playAITurn() {
        logMessage("AI's turn started.");

        // AI plays cards as long as it has enough points
        let aiHand = Array.from(document.querySelectorAll("#ai-hand .card"));

        while (aiPoints > 0 && aiHand.length > 0) {
            // Find a card the AI can afford to play
            let playableCards = aiHand.filter(card => parseInt(card.dataset.cost) <= aiPoints);

            // If no cards are playable due to cost, exit the loop
            if (playableCards.length === 0) {
                logMessage("AI does not have enough points to play any more cards.");
                break;
            }

            // Select a random playable card
            let randomIndex = Math.floor(Math.random() * playableCards.length);
            let selectedCard = playableCards[randomIndex];
            let cardData = {
                name: selectedCard.dataset.name,
                attack: parseInt(selectedCard.dataset.attack),
                defense: parseInt(selectedCard.dataset.defense),
                cost: parseInt(selectedCard.dataset.cost),
                image: selectedCard.dataset.image
            };

            // Play the card if AI has enough points
            aiCards.push(cardData);
            aiDrawnCardIds.push(selectedCard.dataset.id);
            aiPoints -= cardData.cost; // Deduct points for AI playing the card
            updatePointsDisplay(); // Update points UI
            updateBoard("ai-board", aiCards);
            logMessage(`AI played ${cardData.name} (ATK: ${cardData.attack}, DEF: ${cardData.defense}, COST: ${cardData.cost})`);
            selectedCard.remove(); // Remove the card from the AI's hand

            // Draw a new card for each card played
            drawAICard();

            // Update AI hand after playing a card
            aiHand = Array.from(document.querySelectorAll("#ai-hand .card"));
        }

        // After the AI finishes its turn, start the player's turn
        setTimeout(() => {
            updateGameState();
            startPlayerTurn();
        }, 1000);
    }



    function drawAICard() {
        fetch("/draw-ai-card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ drawnCardIds: aiDrawnCardIds })
        })
            .then(response => response.json())
            .then(newCard => {
                if (newCard) {
                    let aiHand = document.getElementById("ai-hand");
                    let newCardElement = createCardElement(newCard, false);
                    aiHand.appendChild(newCardElement);
                }
            });
    }

    function updateGameState() {
        if (aiCards.length > 0) {
            playerCards.forEach(card => {
                let damage = calculateDamage(card.attack, aiCards);
                logMessage(`${card.name} dealt ${damage} damage to AI's card`);
            });
            updateBoard("ai-board", aiCards);
        } else {
            playerCards.forEach(card => {
                aiHealth -= card.attack;
                logMessage(`${card.name} dealt ${card.attack} damage to AI's health`);
            });
            document.getElementById("ai-health").innerText = `AI Health: ${aiHealth}`;
        }

        if (playerCards.length > 0) {
            aiCards.forEach(card => {
                let damage = calculateDamage(card.attack, playerCards);
                logMessage(`${card.name} dealt ${damage} damage to Player's card`);
            });
            updateBoard("player-board", playerCards);
        } else {
            aiCards.forEach(card => {
                playerHealth -= card.attack;
                logMessage(`${card.name} dealt ${card.attack} damage to Player's health`);
            });
            document.getElementById("player-health").innerText = `Player Health: ${playerHealth}`;
        }

        checkGameOver();
    }

    function calculateDamage(attack, targetCards) {
        if (targetCards.length === 0) return 0;
        let weakestCardIndex = 0;
        for (let i = 1; i < targetCards.length; i++) {
            if (targetCards[i].defense < targetCards[weakestCardIndex].defense) {
                weakestCardIndex = i;
            }
        }
        let damage = Math.min(attack, targetCards[weakestCardIndex].defense);
        targetCards[weakestCardIndex].defense -= attack;
        if (targetCards[weakestCardIndex].defense <= 0) {
            logMessage(`${targetCards[weakestCardIndex].name} was destroyed`);
            targetCards.splice(weakestCardIndex, 1);
        }
        return damage;
    }

    function updateBoard(boardId, cards) {
        let board = document.getElementById(boardId);
        board.innerHTML = ""; // Clear the current board
    
        cards.forEach(card => {
            // Create a card element (similar to createCardElement)
            let cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.dataset.id = card.id;
            cardElement.dataset.name = card.name;
            cardElement.dataset.attack = card.attack;
            cardElement.dataset.defense = card.defense;
            cardElement.dataset.cost = card.cost;
            cardElement.dataset.image = card.image;
    
            // Create an image element
            let img = document.createElement("img");
            img.src = `./img/${card.image}`;
            img.alt = card.name;
            img.className = "card-image";
    
            // Create a text node for the card's name and stats
            let text = document.createElement("div");
            text.innerText = `${card.name} \n ATK: ${card.attack} \n DEF: ${card.defense} \n COST: ${card.cost}`;
    
            // Append the image and text to the card element
            cardElement.appendChild(img);
            cardElement.appendChild(text);
    
            // Append the card element to the board
            board.appendChild(cardElement);
        });
    }
    

    function logMessage(message) {
        let logMessages = document.getElementById("log-messages");
        let messageElement = document.createElement("div");
        messageElement.textContent = message;
        logMessages.appendChild(messageElement);
        logMessages.scrollTop = logMessages.scrollHeight;
    }

    function checkGameOver() {
        if (playerHealth <= 0) {
            endGame("AI");
        } else if (aiHealth <= 0) {
            endGame("Player");
        }
    }

    function endGame(winner) {
        clearInterval(timer);
        disablePlayerActions();
        logMessage(`Game Over! ${winner} wins!`);

        fetch("/gameover", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ winner: winner })
        }).then(() => {
            setTimeout(() => {
                window.location.href = `/result?winner=${winner}`;
            }, 2000);
        });
    }

    startGame();
});

(function(){
    'use strict';
   
    // Buttons
    const startNewGame = document.querySelector(".btn--new"),
          rollDice     = document.querySelector(".btn--roll"), 
          hold         = document.querySelector(".btn--hold");
    
    // dice img
    const diceImage     = document.querySelector(".dice");
        // hide the image in the game beginning
          diceImage.style.display = "none";

    // Generate random number between 1 and 6 for dice
    function generateDiceNumber() {
        return  Math.trunc(Math.random() * 6) + 1;
    };
 
    // Function to Switch Between Active Player And The Other Player
    function switchPlayers(currentPlayer, otherPlayer) {
        currentPlayer.classList.remove("player--active");
        otherPlayer.classList.add("player--active");
        currentPlayer.querySelector('.current-score').textContent = 0 ;
    }

    // Function To Update The Current Score "in the red box"
    function updateCurrentPlayerScore(currentPlayer, currentDiceNumber) {
        let currentPlayerScore = Number(currentPlayer.querySelector(".current-score").textContent);
        currentPlayerScore += currentDiceNumber;
        currentPlayer.querySelector('.current-score').textContent = currentPlayerScore;
    }

    // function to Sum total score and Show it
    function totalScore(currentPlayer) {
        let sum = 0;
        sum += Number(currentPlayer.querySelector('.current-score').textContent);
        sum += Number(currentPlayer.querySelector('.score').textContent);
        if(sum >= 100)
        {
            currentPlayer.querySelector('.score').textContent = "Winner";
            diceImage.style.display = 'none';
            currentPlayer.classList.remove("player--active");
            currentPlayer.classList.add("player--winner");
            return true;            
        }
        currentPlayer.querySelector('.score').textContent = sum;
        return false;            
    }

    //Handlers: 
    //  Rolldice Button Handler
    function rollDiceHandler() {
                
        let currentPlayer = document.querySelector(".player--active"),
            otherPlayer   = document.querySelector("section:not(.player--active)");

        const currentDiceNumber = generateDiceNumber();
        diceImage.style.display = 'inline';
        diceImage.src = `dice-${currentDiceNumber}.png`;

        if(currentDiceNumber === 1) 
           switchPlayers(currentPlayer, otherPlayer);              
        else 
            updateCurrentPlayerScore(currentPlayer,currentDiceNumber);
    } 
    
    // Hold Button Handler
    function holdHandler(){

        let currentPlayer = document.querySelector(".player--active"),
        otherPlayer       = document.querySelector("section:not(.player--active)");
        if(totalScore(currentPlayer)) {
            rollDice.disabled = true;
            hold.disabled     = true;
            return;
        }
        switchPlayers(currentPlayer, otherPlayer);  
    }

    // Start New game Handler
    function startNewGameHandler(){
        diceImage.style.display = 'none';
        rollDice.disabled = false;
        hold.disabled     = false;
        document.querySelectorAll(".player").forEach(e=>e.classList.remove("player--winner"));
        document.querySelector(".player--0").classList.add("player--active");
        document.querySelectorAll('.score').forEach(e => e.textContent=0);
        document.querySelectorAll('.current-score').forEach(e => e.textContent=0);
    }




    //Events
    // On roll dice button click
    rollDice.addEventListener("click",rollDiceHandler);

    // On hold button click
    hold.addEventListener("click",holdHandler);
    
    // On start new game
    startNewGame.addEventListener("click",startNewGameHandler);

})();

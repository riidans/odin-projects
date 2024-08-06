function getComputerChoice() {
    // Generate a random number
    let randomNum = Math.floor(Math.random() * 3)

    // Turn random number into shape
    let randomChoice;

    if (randomNum == 0) {
        randomChoice = "rock";
    }
    else if (randomNum == 1) {
        randomChoice = "paper";
    }
    else if (randomNum == 2) {
        randomChoice = "scissors";
    }

    // Return randomized shape
    return randomChoice;
}

function declareWinner() {

    // Create game outcome text
    const declaration = document.createElement("h4")
    declaration.classList.add("result")

    if (humanScore == computerScore) {
        declaration.textContent = `Draw! Both teams have ${humanScore} points!`;
    }
    else if (humanScore > computerScore) {
        declaration.textContent = `You win! You had ${humanScore} points, while the computer had ${computerScore} points!`;
    }
    else if (computerScore > humanScore) {
        declaration.textContent = `You lose! You had ${humanScore} points, while the computer had ${computerScore} points!`;
    }

    div.appendChild(declaration)

    // Disable buttons
    rockButton.removeEventListener("click", rockHandler)
    paperButton.removeEventListener("click", paperHandler)
    scissorsButton.removeEventListener("click", scissorsHandler)

}

function playRound(humanChoice, computerChoice) {

    // Create outcome text
    const outcome = document.createElement("p")
    outcome.classList.add("result")
    
    // Draw
    if (humanChoice == computerChoice) {
        outcome.textContent = `Draw! Both sides chose ${humanChoice}.`;
    }

    // User win
    else if (humanChoice == "rock" && computerChoice == "scissors") {
        outcome.textContent = "You win! Rock beats scissors.";
        humanScore += 1;
    }
    else if (humanChoice == "paper" && computerChoice == "rock") {
        outcome.textContent = "You win! Paper beats rock.";
        humanScore += 1;
    }
    else if (humanChoice == "scissors" && computerChoice == "paper") {
        outcome.textContent = "You win! Scissors beats paper.";
        humanScore += 1;
    }

    // User loss
    else if (humanChoice == "rock" && computerChoice == "paper") {
        outcome.textContent = "You lose! Paper beats rock.";
        computerScore += 1;
    }
    else if (humanChoice == "paper" && computerChoice == "scissors") {
        outcome.textContent = "You lose! Scissors beats paper."
        computerScore += 1;
    }
    
    else if (humanChoice == "scissors" && computerChoice == "rock") {
        outcome.textContent = "You lose! Rock beats scissors.";
        computerScore += 1;
    }

    // Create score text
    const score = document.createElement("p")
    score.classList.add("result")
    score.textContent = `Human: ${humanScore} | Computer: ${computerScore}`

    div.appendChild(outcome)
    div.appendChild(score)

    if (humanScore == 5 || computerScore == 5) {
        declareWinner()
    }
}

// Handler functions for EventListener
function rockHandler() { playRound("rock", getComputerChoice()) }
function paperHandler() { playRound("paper", getComputerChoice()) }
function scissorsHandler() {playRound("scissors", getComputerChoice()) }

function playGame() {
    humanScore = 0
    computerScore = 0

    // Enable buttons
    rockButton.addEventListener("click", rockHandler );
    paperButton.addEventListener("click", paperHandler );
    scissorsButton.addEventListener("click", scissorsHandler );

    // Clear results
    const results = document.querySelectorAll(".result")
    results.forEach((result) => {div.removeChild(result)})
}

// Declare score variables
let humanScore, computerScore;

// Get elements from index.html
const div = document.querySelector("#results")
const rockButton = document.querySelector("#rock")
const paperButton = document.querySelector("#paper")
const scissorsButton = document.querySelector("#scissors")
const resetButton = document.querySelector("#reset")

// Initialize reset button
resetButton.addEventListener("click", playGame)

// Play game
playGame()

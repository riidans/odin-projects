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

function getHumanChoice() {
    // Get user choice  
    let userChoice = prompt("Rock! Paper! Scissosrs! Shoot!");

    // Return choice
    return userChoice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
    // Draw
    if (humanChoice == computerChoice) {
        console.log(`Draw! Both sides chose ${humanChoice}.`);
    }

    // User win
    else if (humanChoice == "rock" && computerChoice == "scissors") {
        console.log("You win! Rock beats scissors.");
        humanScore += 1;
    }
    else if (humanChoice == "paper" && computerChoice == "rock") {
        console.log("You win! Paper beats rock.");
        humanScore += 1;
    }
    else if (humanChoice == "scissors" && computerChoice == "paper") {
        console.log("You win! Scissors beats paper.");
        humanScore += 1;
    }

    // User loss
    else if (humanChoice == "rock" && computerChoice == "paper") {
        console.log("You lose! Paper beats rock.");
        computerScore += 1;
    }
    else if (humanChoice == "paper" && computerChoice == "scissors") {
        console.log("You lose! Scissors beats paper.");
        computerScore += 1;
    }
    
    else if (humanChoice == "scissors" && computerChoice == "rock") {
        console.log("You lose! Rock beats scissors.");
        computerScore += 1;
    }
}

function playGame() {
    // Declare variables
    let humanChoice, computerChoice;

    // Play 5 times
    for (let i = 0; i < 5; i++) {
        humanChoice = getHumanChoice();
        computerChoice = getComputerChoice();

        playRound(humanChoice, computerChoice);
    }

    // Decide winner
    if (humanScore == computerScore) {
        console.log(`Draw! Both teams have ${humanScore} points!`);
    }
    else if (humanScore > computerScore) {
        console.log(`You win! You had ${humanScore} points, while the computer had ${computerScore} points!`);
    }
    else if (computerScore > humanScore) {
        console.log(`You lose! You had ${humanScore} points, while the computer had ${computerScore} points!`);
    }
}

// Declare score variables
let humanScore = 0;
let computerScore = 0;

// Play game
playGame();




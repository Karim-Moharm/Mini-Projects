/** project steps
 * [x] 1- deposit some money
 * [x] 2- determine number of lines to bet on
 * [x] 3- collect a bet amount
 * [x] 4- spin the slot machine
 * [] 5- check if user won
 * [] 6- give the user their winning
 * [] 7- play again
 */

const prompt = require("prompt-sync")();

// some constants
const ROWS = 3;
const COL = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 6,
  B: 5,
  C: 4,
  D: 3,
};

const deposit = () => {
  while (true) {
    let moneyAmount = prompt("Enter number of money you want to deposit: ");
    moneyAmount = parseFloat(moneyAmount);
    if (!isNaN(moneyAmount) && moneyAmount > 0) {
      return moneyAmount;
    } else {
      console.error("Please enter a valid amount of money");
    }
  }
};

const linesNumber = () => {
  while (true) {
    let numberOfLines = prompt("Enter number of lines to bet on (1-3): ");
    numberOfLines = parseInt(numberOfLines);
    if (isNaN(numberOfLines)) {
      console.error("Please enter a valid lines number");
    } else if (numberOfLines <= 0 || numberOfLines > 3) {
      console.error("Lines number should be between 1 and 3");
    } else {
      return numberOfLines;
    }
  }
};

const getBit = (playerDeposit, lines) => {
  while (true) {
    let betAmount = prompt(
      "Enter number of money per line you want to bet on: "
    );
    betAmount = parseFloat(betAmount);
    if (!isNaN(betAmount) && betAmount <= playerDeposit / lines) {
      return betAmount;
    } else {
      console.error("Please enter a valid amount of money");
    }
  }
};

const spin = () => {
  const symbols = [];

  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [[], [], []];
  for (let i = 0; i < COL; i++) {
    // creating a shallow copy of symbols array
    let reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIdx = Math.floor(Math.random() * reelSymbols.length);
      let randomValue = reelSymbols[randomIdx];
      reels[i].push(randomValue);
      // after adding the value to the reel array we need to remove it so we can't select it next spin
      reelSymbols.splice(randomIdx, 1);
    }
  }
  return reels;
};

// let playerDeposit = deposit();
// const numberOfLines = linesNumber();
// console.log(getBit(playerDeposit, numberOfLines));

const reelsNumbers = spin();
console.log(reelsNumbers);

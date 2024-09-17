const readline = require("readline");
const KeyGenerator = require("./classes/KeyGenerator");
const HMACGenerator = require("./classes/HMACGenerator");
const GameRules = require("./classes/GameRules");
const TableGenerator = require("./classes/TableGenerator");

const args = process.argv.slice(2);
const moves = args;

if (
  args.length < 3 ||
  args.length % 2 === 0 ||
  new Set(args).size !== args.length
) {
  console.error("Error: you must add an odd number of unique moves (≥ 3)");
  return;
}

const gameRules = new GameRules(moves);

function showTable() {
  const tableGenerator = new TableGenerator(gameRules);
  console.log(tableGenerator.generateTable());
}

function playGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const secureKey = KeyGenerator.generateKey();

  const computerIndex = Math.floor(Math.random() * moves.length);

  const computerMove = moves[computerIndex];

  const hmac = HMACGenerator.generateHMAC(secureKey, computerMove);

  console.log(`HMAC: ${hmac}`);
  console.log("Available moves:");
  moves.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });
  console.log("0 - Exit");
  console.log("? - Help");

  rl.question("Enter your move: ", (input) => {
    const playerIndex = parseInt(input, 10) - 1;

    if (input === "0") {
      console.log("Game exit");
      rl.close();
      return;
    } else if (input === "?") {
      showTable();
      rl.close();
      return;
    }

    if (isNaN(playerIndex) || playerIndex < 0 || playerIndex >= moves.length) {
      console.log("Invalid move, please try again");
      rl.close();
      return;
    }

    const playerMove = moves[playerIndex];
    const result = gameRules.getResult(playerMove, computerMove);

    console.log(`Your move: ${playerMove}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(`Result: ${result}`);
    console.log(`HMAC key: ${secureKey}`);
    rl.close();
  });
}

playGame();

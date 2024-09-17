class GameRules {
  constructor(moves) {
    this.moves = moves;
    this.rules = this.generateRules();
  }

  generateRules() {
    const n = this.moves.length;
    const rules = new Array(n).fill().map(() => new Array(n).fill("Draw"));
    const halfMove = Math.floor(n / 2);

    for (let i = 0; i < n; i++) {
      for (let j = 1; j <= halfMove; j++) {
        const indexWin = (i + j) % n;
        const indexLose = (i - j + n) % n;
        rules[i][indexWin] = "Win!";
        rules[i][indexLose] = "Lose:(";
      }
    }
    return rules;
  }

  getResult(move1, move2) {
    const index1 = this.moves.indexOf(move1);
    const index2 = this.moves.indexOf(move2);
    return this.rules[index1][index2];
  }
}

module.exports = GameRules;

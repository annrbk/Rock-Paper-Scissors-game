const Table = require("cli-table3");

class TableGenerator {
  constructor(rules) {
    this.rules = rules;
  }

  generateTable() {
    const table = new Table({
      head: ["v PC/User >", ...this.rules.moves],
      colWidths: [15, ...Array(this.rules.moves.length).fill(10)],
    });

    this.rules.moves.forEach((move, index) => {
      const row = [move];
      for (let j = 0; j < this.rules.moves.length; j++) {
        row.push(this.rules.getResult(move, this.rules.moves[j]));
      }
      table.push(row);
    });

    return table.toString();
  }
}

module.exports = TableGenerator;

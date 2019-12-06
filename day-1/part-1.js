const readline = require('readline');
const fs = require('fs');
const { dirname, join } = require('path');

const inputPath = join(dirname(__filename), 'input.txt');

const reader = readline.createInterface({
  input: fs.createReadStream(inputPath),
});

let fuel = 0;

reader.on('line', (line) => { fuel += Math.floor(parseInt(line, 10) / 3) - 2; });
reader.on('close', () => console.log(fuel));

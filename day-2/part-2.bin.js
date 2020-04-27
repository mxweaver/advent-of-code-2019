const readline = require('readline');
const fs = require('fs');
const { dirname, join } = require('path');
const { run, fix } = require('./part-1');

const inputPath = join(dirname(__filename), 'input.txt');

const reader = readline.createInterface({
  input: fs.createReadStream(inputPath),
});

const program = [];

reader.on('line', (line) => {
  line
    .split(',')
    .forEach((word) => program.push(parseInt(word, 10)));
});

reader.on('close', () => {
  console.log(run(fix(program))[0]);
});

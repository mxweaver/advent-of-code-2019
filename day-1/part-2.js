const readline = require('readline');
const fs = require('fs');
const { dirname, join } = require('path');

const inputPath = join(dirname(__filename), 'input.txt');

const reader = readline.createInterface({
  input: fs.createReadStream(inputPath),
});

let fuel = 0;

const fuelForModule = (mass) => Math.floor(mass / 3) - 2;

reader.on('line', (line) => {
  const moduleFuel = fuelForModule(parseInt(line, 10));
  fuel += moduleFuel;

  let fuelForFuelForModule = fuelForModule(moduleFuel);
  while (fuelForFuelForModule > 0) {
    fuel += fuelForFuelForModule;
    fuelForFuelForModule = fuelForModule(fuelForFuelForModule);
  }
});
reader.on('close', () => console.log(fuel));

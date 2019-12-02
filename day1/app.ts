// https://adventofcode.com/2019/day/1

import * as fs from 'fs';

const fuelbymass = (mass: number): number => {
  return Math.floor(mass / 3) - 2;
}

fs.readFile('./day1/data.txt', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const masses: Array<number> = data.toString().split('\n').filter(l => l).map(l => +l)
  const totalMass: number = masses.reduce((prev: number, curr: number): number => {
    return prev + fuelbymass(curr);
  }, 0)
  console.log(totalMass);
})

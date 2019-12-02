// https://adventofcode.com/2019/day/2

// import * as fs from 'fs';

const compute = (opcodes: Array<number>): Array<number> => {
  const newOpcodes = opcodes.slice();

  const addition = (inPos1: number, inPos2: number, outPos: number): void => {
    const res = newOpcodes[inPos1] + newOpcodes[inPos2];
    newOpcodes[outPos] = res;
  }

  const multiplication = (inPos1: number, inPos2: number, outPos: number): void => {
    const res = newOpcodes[inPos1] * newOpcodes[inPos2];
    newOpcodes[outPos] = res;
  }

  for (let i = 0; newOpcodes[i] !== 99; i = i + 4) {
    let opcode = newOpcodes[i];
    if (opcode === 1) {
      addition(i+1, i+2, i+3);
    } else if (opcode === 2) {
      multiplication(i+1, i+2, i+3);
    } else {
      console.error(`unknown opcode '${opcode}' at position ${i}`);
    }
  }
  return newOpcodes;
}

const res = compute([1, 0, 0, 0, 99]);
console.log(res);

// fs.readFile('./day2/data.txt', (err, data) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   let opcodes: Array<number> = data.toString().split(',').map(l => +l);
//   // the question wants us to do these replacements first to fix the 1202
//   opcodes[1] = 12;
//   opcodes[2] = 2;

//   opcodes = compute(opcodes);
//   console.log(opcodes[0]);
// });

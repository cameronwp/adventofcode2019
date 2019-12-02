// https://adventofcode.com/2019/day/2
// import * as fs from 'fs';
var compute = function (opcodes) {
    var newOpcodes = opcodes.slice();
    var addition = function (inPos1, inPos2, outPos) {
        var res = newOpcodes[inPos1] + newOpcodes[inPos2];
        console.log(inPos1, inPos2, newOpcodes[inPos1], newOpcodes[inPos2], res);
        newOpcodes[outPos] = res;
    };
    var multiplication = function (inPos1, inPos2, outPos) {
        var res = newOpcodes[inPos1] * newOpcodes[inPos2];
        newOpcodes[outPos] = res;
    };
    for (var i = 0; newOpcodes[i] !== 99; i = i + 4) {
        var opcode = newOpcodes[i];
        if (opcode === 1) {
            addition(i + 1, i + 2, i + 3);
        }
        else if (opcode === 2) {
            multiplication(i + 1, i + 2, i + 3);
        }
        else {
            console.error("unknown opcode '" + opcode + "' at position " + i);
        }
    }
    return newOpcodes;
};
var res = compute([1, 0, 0, 0, 99]);
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

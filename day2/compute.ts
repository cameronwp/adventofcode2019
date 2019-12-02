const compute = (opcodes: Array<number>): Array<number> => {
  const newOpcodes = opcodes.slice();

  const addition = (inPos1: number, inPos2: number, outPos: number): void => {
    const res = newOpcodes[inPos1] + newOpcodes[inPos2];
    newOpcodes[outPos] = res;
  };

  const multiplication = (
    inPos1: number,
    inPos2: number,
    outPos: number
  ): void => {
    const res = newOpcodes[inPos1] * newOpcodes[inPos2];
    newOpcodes[outPos] = res;
  };

  for (let i = 0; newOpcodes[i] !== 99; i = i + 4) {
    let opcode = newOpcodes[i];
    if (opcode === 1) {
      addition(i + 1, i + 2, i + 3);
    } else if (opcode === 2) {
      multiplication(i + 1, i + 2, i + 3);
    } else {
      console.error(`unknown opcode '${opcode}' at position ${i}`);
    }
  }
  return newOpcodes;
};

export default compute;

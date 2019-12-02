// https://adventofcode.com/2019/day/2

import * as fs from "fs";
import compute from "./compute";

fs.readFile("./day2/data.txt", (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  let opcodes: Array<number> = data
    .toString()
    .split(",")
    .map(l => +l);
  // the question wants us to do these replacements first to fix the 1202
  opcodes[1] = 12;
  opcodes[2] = 2;

  opcodes = compute(opcodes);
  console.log(opcodes[0]);
});

"use strict";
// https://adventofcode.com/2019/day/2
exports.__esModule = true;
var fs = require("fs");
var compute_1 = require("./compute");
fs.readFile("./day2/data.txt", function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    var opcodes = data
        .toString()
        .split(",")
        .map(function (l) { return +l; });
    // the question wants us to do these replacements first to fix the 1202
    opcodes[1] = 12;
    opcodes[2] = 2;
    opcodes = compute_1["default"](opcodes);
    console.log(opcodes[0]);
});

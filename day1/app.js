"use strict";
// https://adventofcode.com/2019/day/1
exports.__esModule = true;
var fs = require("fs");
var fuelbymass = function (mass) {
    return Math.floor(mass / 3) - 2;
};
fs.readFile('./day1/data.txt', function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    var masses = data.toString().split('\n').filter(function (l) { return l; }).map(function (l) { return +l; });
    console.log(masses.length);
    var totalMass = masses.reduce(function (prev, curr) {
        return prev + fuelbymass(curr);
    }, 0);
    console.log(totalMass);
});

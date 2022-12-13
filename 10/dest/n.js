"use strict";
const checkCycles = [20, 60, 100, 140, 180, 220];
/**
 * It takes an array of arrays, each of which has a string and a number, and an array of numbers, and
 * returns the sum of the products of the numbers in the second array with the numbers in the first
 * array
 * @param {string[][]} input - an array of arrays, each sub-array is a line of the input file.
 * @returns The sum of the signal strengths at the check cycles.
 */
function checkSignalStrength(input, checkCycles) {
    let x = 1;
    let cycle = 1;
    let signalStrengths = [];
    for (let line of input) {
        if (line[0] === "noop") {
            if (checkCycles.includes(cycle)) {
                signalStrengths.push(x * cycle);
            }
            cycle++;
        }
        else if (line[1]) {
            if (checkCycles.includes(cycle)) {
                signalStrengths.push(x * cycle);
            }
            cycle++;
            if (checkCycles.includes(cycle)) {
                signalStrengths.push(x * cycle);
            }
            cycle++;
            x += parseInt(line[1]);
        }
    }
    return signalStrengths.reduce((x, y) => x + y);
}

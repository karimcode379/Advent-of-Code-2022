import { readFileSync } from "node:fs";
const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(Number);
//part 01
let sums = [];
let sum = 0;
input.forEach((n) => {
    if (n === 0) {
        sums.push(sum);
        sum = 0;
    }
    else {
        sum += n;
    }
});
let biggest = sums[0];
sums.forEach((n) => {
    if (n > biggest)
        biggest = n;
});
console.log(biggest);
//part 02
sums.sort();
sums.reverse();
console.log(sums[0] + sums[1] + sums[2]);

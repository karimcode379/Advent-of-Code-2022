import { readFileSync } from "node:fs";
const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n");
//part 01
// Create an Array for each stack by iterating through the string of every line
//find the number of stacks
let stackNumber = 0;
for (let x of input) {
    if (x[x.length - 1] === " ")
        stackNumber = Number(x[x.length - 2]);
}
// create an array with nested arrays
let stackArray = [];
for (let i = 0; i < stackNumber; i++) {
    let newArr = [];
    stackArray.push(newArr);
}
// Make a crazy nested iteration to assign the staple alphabet characters to each nested array correctly
let stackPosition = stackNumber - 1;
for (let x of input) {
    if (x[x.length - 1] === " ")
        break;
    for (let i = x.length - 1; i >= 0; i--) {
        if (x[i] === " ") {
            if (x[i - 1] === " ") {
                i -= 3;
                stackPosition--;
                continue;
            }
            stackPosition--;
            continue;
        }
        if (x[i] !== "]" && x[i] !== "[") {
            stackArray[stackPosition].push(x[i]);
        }
    }
    stackPosition = stackNumber - 1;
}
// push only the numbers of the move operations into an array
let operationsArray = [];
for (let x of input) {
    if (x.startsWith("move")) {
        let newArr = [];
        newArr = x.split(" ");
        newArr = newArr.filter((y) => parseInt(y));
        operationsArray.push(newArr);
    }
}
//perform the operations
for (let x of operationsArray) {
    const amount = x[0];
    const from = x[1] - 1;
    const to = x[2] - 1;
    stackArray[to].unshift(...stackArray[from].splice(0, amount).reverse()); //for part 02 it is enough to remove the reverse() here!
}
let result = "";
stackArray.forEach((x) => (result += x[0]));
console.log(result);

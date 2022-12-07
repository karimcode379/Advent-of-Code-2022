import { readFileSync } from "node:fs";
const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((x) => x.split(",").flatMap((y) => y.split("-"))) //format the input to a 2-dimensional nested array
    .map((x) => x.map((y) => parseInt(y))); //parse to number type
//part 01
//check the following:
//[0] >= [2] && [1] <= [3] first is in range of second
//[2] >= [0] && [3] <= [1] second is in range of first
function countInRange(arr) {
    let count = 0;
    arr.forEach((x) => {
        if ((x[0] >= x[2] && x[1] <= x[3]) || (x[2] >= x[0] && x[3] <= x[1]))
            count++;
    });
    return count;
}
console.log(countInRange(input));
//part 02
//check same from above and additionally:
//[0] >= [2] && [0] <= [3] first overlaps second
//[2] >= [0] && [2] <= [1] second overlaps first
function countOverlap(arr) {
    let count = 0;
    arr.forEach((x) => {
        if ((x[0] >= x[2] && x[1] <= x[3]) ||
            (x[2] >= x[0] && x[3] <= x[1]) ||
            (x[0] >= x[2] && x[0] <= x[3]) ||
            (x[2] >= x[0] && x[2] <= x[1]))
            count++;
    });
    return count;
}
console.log(countOverlap(input));

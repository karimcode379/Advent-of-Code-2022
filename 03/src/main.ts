import { readFileSync } from "node:fs";

const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
	.replace(/\r/g, "")
	.trim()
	.split("\n");

const twoHalfs = input.map((x) => [
	x.slice(0, x.length / 2),
	x.slice(x.length / 2),
]); //create an array with both halfs (compartments) for each line (bag)

// part 01

//create an alphabet map with the respective priority values from the task
const charPriorityMap = new Map();

const a = 97; //ASCII value
for (let i = 0; i < 26; i++) {
	charPriorityMap.set(String.fromCharCode(a + i), i + 1);
}

const A = 65; //ASCII value
for (let i = 0; i < 26; i++) {
	charPriorityMap.set(String.fromCharCode(A + i), 27 + i);
}

//compare every char of one half with any char of the other. There is only one char that is exactly the same which will be pushed to a new array
function charsInBoth(arr: Array<Array<string>>): Array<string> {
	let charArray: Array<string> = [];
	arr.forEach((ar) => {
		for (let a of ar[0]) {
			for (let b of ar[1]) {
				if (a === b) {
					charArray.push(a);
					return; //aborting second loop after finding duplicate for the first time
				}
			}
		}
	});
	return charArray;
}

//get the priority score for every char and add it to the sum
function sumOfPriorities(arr: Array<string>): number {
	let sum = 0;
	arr.forEach((x) => (sum += charPriorityMap.get(x)));
	return sum;
}

console.log(sumOfPriorities(charsInBoth(twoHalfs)));

//part 02

//Create an array with a nested array of every 3 lines
const groupOfThreeArr = [];
for (let i = 0; i < input.length; i += 3) {
	groupOfThreeArr.push(input.slice(i, i + 3));
}

//check for the char that is available in all three lines each group and push them to a new array
function charsInAllThree(arr: Array<Array<string>>): Array<string> {
	let charArray: Array<string> = [];
	arr.forEach((ar) => {
		for (let a of ar[0]) {
			for (let b of ar[1]) {
				if (a === b) {
					for (let c of ar[2]) {
						if (b === c) {
							charArray.push(c);
							return; //aborting second loop after finding duplicate for the first time
						}
					}
				}
			}
		}
	});
	return charArray;
}

//use counting function from part 01
console.log(sumOfPriorities(charsInAllThree(groupOfThreeArr)));

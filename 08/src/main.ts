import { constants, readFileSync } from "node:fs";
import { arrayBuffer } from "stream/consumers";

const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
	.replace(/\r/g, "")
	.trim()
	.split("\n");

//part 01

/**
 * For each number in the array, check if it's the largest number in its row and column. If it is,
 * increment the count.
 * @param arr - an array of strings, each string is a row of the forest
 * @returns The number of trees that are visible from the top left corner of the forest.
 */
function countVisibleTrees(arr: Array<string>) {
	let count = 0;
	for (let i = 1; i < arr.length - 1; i++) {
		const line = arr[i];
		for (let j = 1; j < line.length - 1; j++) {
			const number = line[j];
			const leftSide = line
				.slice(0, j)
				.split("")
				.some((x) => x >= number);
			const rightSide = line
				.slice(j + 1, line.length)
				.split("")
				.some((x) => x >= number);
			const topSide = arr
				.map((x) => x[j])
				.slice(0, i)
				.some((x) => x >= number);
			const downSide = arr
				.map((x) => x[j])
				.slice(i + 1, line.length)
				.some((x) => x >= number);
			if (!(leftSide && rightSide && topSide && downSide)) count++;
		}
	}
	return count;
}

//Add the outer lines to the result
//console.log(countVisibleTrees(input) + input.length * 2 + input[0].length * 2 - 4);

//part 02

/**
 * For each number in the array, find the distance to the next highest number in each direction, then
 * multiply those distances together to get the score for that number.
 * @param arr - an array of strings, each string is a row of the grid
 * @returns The highest scenic score of the given array.
 */
function highestScenicScore(arr: Array<string>) {
	let highscore = 0;
	for (let i = 1; i < arr.length - 1; i++) {
		let line = arr[i];
		for (let j = 1; j < line.length - 1; j++) {
			let number = line[j];

			let leftDistance = 0;
			let rightDistance = 0;
			let topDistance = 0;
			let downDistance = 0;

			const leftSide = line.slice(0, j).split("").reverse();
			const leftIndex = leftSide.findIndex((x) => x >= number);
			leftDistance = leftIndex === -1 ? leftSide.length : leftIndex + 1;

			const rightSide = line.slice(j + 1, line.length).split("");
			const rightIndex = rightSide.findIndex((x) => x >= number);
			rightDistance =
				rightIndex === -1 ? rightSide.length : rightIndex + 1;

			const topSide = arr
				.map((x) => x[j])
				.slice(0, i)
				.reverse();
			const topIndex = topSide.findIndex((x) => x >= number);
			topDistance = topIndex === -1 ? topSide.length : topIndex + 1;

			const downSide = arr.map((x) => x[j]).slice(i + 1, line.length);
			const downIndex = downSide.findIndex((x) => x >= number);
			downDistance = downIndex === -1 ? downSide.length : downIndex + 1;

			const currentScore =
				leftDistance * rightDistance * topDistance * downDistance;
			if (currentScore > highscore) highscore = currentScore;
		}
	}
	return highscore;
}

console.log(highestScenicScore(input));

import { constants, readFileSync } from "node:fs";
import { arrayBuffer } from "stream/consumers";

const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
	.replace(/\r/g, "")
	.trim()
	.split("\n")
	.map((x) => x.split(" "));

//part 01

//noop 	--> 1 cycle
//addx 3 --> 2 cycles; x += 3

let checkCycles = [20, 60, 100, 140, 180, 220];

/**
 * It takes an array of arrays, each of which has a string and a number, and an array of numbers, and
 * returns the sum of the products of the numbers in the second array with the numbers in the first
 * array
 * @param {string[][]} input - an array of arrays, each sub-array is a line of the input file.
 * @returns The sum of the signal strengths at the check cycles.
 */
function checkSignalSrength(input: string[][], checkCycles: number[]) {
	let x = 1;
	let cycle = 1;
	let signalStrengths: number[] = [];

	for (let line of input) {
		if (line[0] === "noop") {
			if (checkCycles.includes(cycle)) {
				signalStrengths.push(x * cycle);
			}
			cycle++;
		}
		if (line[1]) {
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

console.log(checkSignalSrength(input, checkCycles));

//part 02

/**
 * It takes an array of arrays, where each sub-array is either a "noop" or a "noop" and a number, and
 * returns a string of #'s and .'s that represents the image
 * @param {string[][]} input - The input array of strings.
 * @returns The image that is being returned is a 40x6 grid of # and . characters.
 */
function renderImage(input: string[][]) {
	let x = 1;
	let cycle = 0;
	let imageStr = "";

	for (let line of input) {
		if (line[0] === "noop") {
			// Add "#" if we are at the current position or at one of the adjacent positions of x, else add "."
			imageStr +=
				cycle === x || cycle === x - 1 || cycle === x + 1 ? "#" : ".";

			//We reach a new line after 40 pixels
			if ((cycle + 1) % 40 === 0) {
				imageStr += "\n";
				x += 40;
			}

			//after plotting, go to next cycle
			cycle++;
		} else {
			//step 01 repeats above
			imageStr +=
				cycle === x || cycle === x - 1 || cycle === x + 1 ? "#" : ".";

			if ((cycle + 1) % 40 === 0) {
				imageStr += "\n";
				x += 40;
			}

			cycle++;

			//step 02 1 repeats above
			imageStr +=
				cycle === x || cycle === x - 1 || cycle === x + 1 ? "#" : ".";

			if ((cycle + 1) % 40 === 0) {
				imageStr += "\n";
				x += 40;
			}

			cycle++;

			//here we change the position of x
			x += parseInt(line[1]);
		}
	}

	return imageStr;
}

console.log(renderImage(input));

//My program plotted the following output:

//###...##..#..#.####..##..#....#..#..##..
//#..#.#..#.#..#.#....#..#.#....#..#.#..#.
//#..#.#....####.###..#....#....#..#.#....
//###..#.##.#..#.#....#.##.#....#..#.#.##.
//#....#..#.#..#.#....#..#.#....#..#.#..#.
//#.....###.#..#.#.....###.####..##...###.

//Which reads PGHFGLUG

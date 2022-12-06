import { readFileSync } from "node:fs";

const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
	.replace(/\r/g, "")
	.trim()
	.split("\n")
	.map((x) => x.split(" "));

// part 01
let score = 0;

input.forEach((ar) => {
	if (ar[1] === "X") {
		score += 1;
		if (ar[0] === "A") {
			score += 3;
		}
		if (ar[0] === "C") {
			score += 6;
		}
	} else if (ar[1] === "Y") {
		score += 2;
		if (ar[0] === "B") {
			score += 3;
		}
		if (ar[0] === "A") {
			score += 6;
		}
	} else {
		score += 3;
		if (ar[0] === "C") {
			score += 3;
		}
		if (ar[0] === "B") {
			score += 6;
		}
	}
});

console.log(score);

//part 02

let score2 = 0;
const a = 1;
const b = 2;
const c = 3;

input.forEach((ar) => {
	if (ar[1] === "X") {
		if (ar[0] === "A") {
			score2 += c;
		}
		if (ar[0] === "B") {
			score2 += a;
		}
		if (ar[0] === "C") {
			score2 += b;
		}
	} else if (ar[1] === "Y") {
		score2 += 3;
		if (ar[0] === "A") {
			score2 += a;
		}
		if (ar[0] === "B") {
			score2 += b;
		}
		if (ar[0] === "C") {
			score2 += c;
		}
	} else {
		score2 += 6;
		if (ar[0] === "A") {
			score2 += b;
		}
		if (ar[0] === "B") {
			score2 += c;
		}
		if (ar[0] === "C") {
			score2 += a;
		}
	}
});

console.log(score2);

import { readFileSync } from "node:fs";

const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
	.replace(/\r/g, "")
	.trim();

//part 01
//Iterate over the string to find the first 4 characters that are different and return the last added character position
function findMarker(str: string) {
	let charsArray = [str[0], str[1], str[2], str[3]];
	let index = 4;
	for (let i = 0; i < str.length - 4; i++) {
		const charSet = new Set(charsArray);
		if (charSet.size > 3) {
			console.log(charSet);
			return index;
		}
		charsArray.shift();
		charsArray.push(str[index]);
		index++;
	}
}

console.log(findMarker(input));

//part 02
//Perform same fuinction as above with an array of 14 values and a set.size check of above 13

function findMessageMarker(str: string) {
	let charsArray = [...input].slice(0, 14);
	let index = 14;
	for (let i = 0; i < str.length - 14; i++) {
		const charSet = new Set(charsArray);
		if (charSet.size > 13) {
			console.log(charSet);
			return index;
		}
		charsArray.shift();
		charsArray.push(str[index]);
		index++;
	}
}

console.log(findMessageMarker(input));

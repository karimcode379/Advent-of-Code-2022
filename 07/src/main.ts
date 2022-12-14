import { readFileSync } from "node:fs";

const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
	.replace(/\r/g, "")
	.trim()
	.split("\n")
	.map((e) => e.split(" ").filter((e) => e !== "$")); //remove the $ sign because we don't need it

//part 01

//Create a class to navigate through the directories more easily
class Directory {
	public name: string;
	public parentDir: Directory | null;
	public childDirsArray: Array<Directory>;
	public filesArray: Array<number>;

	constructor(
		name: string,
		parentDir: Directory | null,
		childDirsArray: Array<Directory>,
		filesArray: Array<number>
	) {
		this.name = name;
		this.parentDir = parentDir;
		this.childDirsArray = childDirsArray;
		this.filesArray = filesArray;
	}

	// A recursive method that sums up all files in a directory and all subdirectories.
	getRecursiveFilesSizeSum(dir: Directory = this): number {
		if (dir.childDirsArray.length === 0) {
			return dir.filesArray.reduce((acc, curr) => acc + curr);
		} else {
			let result = 0;
			for (let d of dir.childDirsArray) {
				result += this.getRecursiveFilesSizeSum(d);
			}
			return dir.filesArray.length === 0
				? result
				: result + dir.filesArray.reduce((acc, curr) => acc + curr);
		}
	}
}

let dirArray: Array<Directory> = [];
//WTF AM I DOING HERE
/**
 * The function iterates through the input array, and creates a new directory object for each
 * directory, and pushes it to the dirArray. 
 * 
 * The function also pushes each file to the filesArray of the current directory. 
 * 
 * The function also keeps track of the current directory, and the parent directory. 
 * 
 * The function returns the root directory.
 * @param input - Array<Array<string>>
 * @returns The root directory.
 */
function iterate(input: Array<Array<string>>) {
	let rootDir = new Directory("rootDir", null, [], []);
	let currentDir: Directory = rootDir;
	let switchDir: Directory;

	dirArray.push(rootDir);

	for (let line of input) {
		if (line[0] === "cd") {
			if (line[1] === "/") {
				currentDir = rootDir;
			} else if (line[1] === "..") {
				switchDir = currentDir.parentDir!;
				currentDir = switchDir;
			} else if (
				currentDir.childDirsArray.find(
					(childDir) => childDir.name === line[1]
				)
			) {
				switchDir = currentDir.childDirsArray.find(
					(childDir) => childDir.name === line[1]
				)!;
				currentDir = switchDir;
			}
		}
		if (line[0] === "dir") {
			const newDir = new Directory(line[1], currentDir, [], []);
			dirArray.push(newDir);
			currentDir.childDirsArray.push(newDir);
		}
		if (parseInt(line[0])) {
			currentDir.filesArray.push(parseInt(line[0]));
		}
	}

	return rootDir;
}

//object structure is created as a side effect I don't even know if this is legit coding I suppose not
iterate(input);

//function that sums up all files of directories and subdirectories with size  <= 100k
function sumOfAllDirFilesBelow100k(dirArray: Array<Directory>) {
	return dirArray
		.map((dir) => dir.getRecursiveFilesSizeSum())
		.filter((dir) => dir <= 100000)
		.sort((a, b) => {
			return a - b;
		})
		.reduce((acc, curr) => acc + curr);
}

console.log(sumOfAllDirFilesBelow100k(dirArray));

//OMG WHAT HAVE I DONE THE ANSWER IS CORRECT

//part 02

/**
 * It returns the size of the largest file in the directory tree that can be deleted to free up enough
 * space to meet the minimum free space requirement.
 * @param dirArray - Array of Directory objects

 */

const totalSpace = 70000000;
const minimumFreeSpace = 30000000;
let usedSpace = dirArray[0].getRecursiveFilesSizeSum();
const freeSpace = totalSpace - usedSpace;

/**
 * It takes an array of directories, maps each directory to its recursive files size sum, and then
 * sorts the resulting array of numbers
 * @param dirArray - Array<Directory>
 * @returns An array of numbers.
 */
function sumOfAllDirFilesSorted(dirArray: Array<Directory>) {
	return dirArray
		.map((dir) => dir.getRecursiveFilesSizeSum())
		.sort((a, b) => {
			return a - b;
		});
}

const allDirFilesSizesSorted = sumOfAllDirFilesSorted(dirArray);

for (let filesize of allDirFilesSizesSorted) {
	if (freeSpace + filesize >= minimumFreeSpace) {
		console.log(filesize); //The smallest file size that can be deleted to free up enough space.
		break;
	}
}

import { readFileSync } from "node:fs";
const input = readFileSync("./src/input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((x) => x.split(" "));
//part 01
//console.log(input);
// .......
// .....H.
// ...T...
// .......
// .......
// .......
// .H.....
// ...T...
// .......
// .......
// .......
// .......
// ...T...
// .H.....
// .......
// .......
// .......
// ...T...
// .....H.
// .......
//as T always follows H, for above that means:
// hy - ty = 1 && hx - tx = 2   	--> tx++, ty++
// hy - ty = 1 && hx - tx = -2   	--> tx--, ty++
// hy - ty = -1 && hx - tx = -2  	--> tx--, ty--
// hy - ty = -1 && hx - tx = 2   	--> tx++, ty--
// therefore also:
// hy - ty = 2 && hx - tx = 1    	--> tx++, ty++
// hy - ty = 2 && hx - tx = -1   	--> tx--, ty++
// hy - ty = -2 && hx - tx = -1  	--> tx--, ty--
// hy - ty = -2 && hx - tx = 1   	--> tx++, ty--
// and the non-diagonal movements:
// hy - ty = 2   								 	--> ty++
// hy - ty = -2   								--> ty--
// hx - tx = 2   								 	--> tx++
// hx - tx = -2   								--> tx--
// (hy - ty) determines x movements of T, (hx -tx) determines y movements of T
function HeadTailMoving(input) {
    let hx = 0;
    let hy = 0;
    let tx = 0;
    let ty = 0;
    let tailVisited = ["00"];
    let currentTailPosition = "";
    for (let move of input) {
        const steps = parseInt(move[1]);
        const direction = move[0];
        for (let i = 0; i < steps; i++) {
            switch (direction) {
                case "R":
                    hx++;
                    break;
                case "L":
                    hx--;
                    break;
                case "U":
                    hy++;
                    break;
                case "D":
                    hy--;
                    break;
            }
            const distance = Math.max(Math.abs(hx - tx), Math.abs(hy - ty));
            if (distance > 1) {
                const directionX = hx - tx;
                tx += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
                const directionY = hy - ty;
                ty += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
            }
            currentTailPosition = "" + tx + ty;
            if (!tailVisited.find((x) => x === currentTailPosition)) {
                tailVisited.push(currentTailPosition);
            }
        }
    }
    return tailVisited.length;
}
console.log(HeadTailMoving(input));
function headmovement(direction, currentHeadPosition) {
    let [hx, hy] = currentHeadPosition;
    switch (direction) {
        case "R":
            hx++;
            break;
        case "L":
            hx--;
            break;
        case "U":
            hy++;
            break;
        case "D":
            hy--;
            break;
    }
    return [hx, hy];
}
function knotMovement(currentFirstKnotPosition, currentSecondKnotPosition) {
    let [hx, hy] = currentFirstKnotPosition;
    let [tx, ty] = currentSecondKnotPosition;
    const distance = Math.max(Math.abs(hx - tx), Math.abs(hy - ty));
    if (distance > 1) {
        const directionX = hx - tx;
        tx += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
        const directionY = hy - ty;
        ty += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
    return [tx, ty];
}
function getTheRope(input) {
    let positionArray = new Array(10).fill(0).map((_) => [0, 0]); //head is at index 0;
    let tailVisited = ["00"];
    let currentTailPosition = "00";
    for (let move of input) {
        const steps = parseInt(move[1]);
        const direction = move[0];
        for (let i = 0; i < steps; i++) {
            let currentHeadPosition = headmovement(direction, positionArray[0]);
            positionArray[0] = currentHeadPosition;
            for (let j = 0; j < positionArray.length - 1; j++) {
                let currentKnotPosition = knotMovement(positionArray[j], positionArray[j + 1]);
                positionArray[j + 1] = currentKnotPosition;
            }
            currentTailPosition =
                "" +
                    positionArray[positionArray.length - 1][0] +
                    positionArray[positionArray.length - 1][1];
            if (!tailVisited.find((x) => x === currentTailPosition)) {
                tailVisited.push(currentTailPosition);
            }
        }
    }
    return tailVisited.length;
}
console.log(getTheRope(input));

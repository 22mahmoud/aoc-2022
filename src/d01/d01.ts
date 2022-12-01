import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.resolve(__dirname, "d01-input.txt"), {
    encoding: "utf-8",
  })
  .split(/\n\n/)
  .map((xs) => xs.split(/\n/).reduce((a, b) => Number(a) + Number(b), 0))
  .sort((a, b) => b - a);

const maxElf = data.at(0);

const maxThreeElves = data.slice(0, 3).reduce((x, y) => x + y, 0);

console.log("[day 01 -> part 1]: top elf", maxElf);
console.log("[day 02 -> part 2]: top three elves", maxThreeElves);

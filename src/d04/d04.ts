import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.resolve(__dirname, "d04-input.txt"), {
    encoding: "utf-8",
  })
  .trim()
  .split(/\n/);

const _data = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
];

const parsed = data.map((pair) =>
  pair.split(",").map((range) => {
    const [start, end] = range.split("-");
    return { start: parseInt(start, 10), end: parseInt(end, 10) };
  })
);

const p1 = parsed
  .map(([e1, e2]) => {
    if (
      (e1.start <= e2.start && e1.end >= e2.end) ||
      (e1.start >= e2.start && e1.end <= e2.end)
    )
      return 1;

    return 0;
  })
  .reduce((x, y) => x + y, 0);

const p2 = parsed
  .map(([e1, e2]) => {
    if (e1.end < e2.start || e2.end < e1.start) return 0;

    return 1;
  })
  .reduce((x, y) => x + y, 0);

console.log("[day 04 -> part 1]: ", p1);
console.log("[day 04 -> part 2]: ", p2);

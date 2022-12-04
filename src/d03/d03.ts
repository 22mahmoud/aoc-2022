import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.resolve(__dirname, "d03-input.txt"), {
    encoding: "utf-8",
  })
  .trim()
  .split(/\n/);

const range = <X extends number, Y extends number>(start: X, end: Y) => {
  const length = end - start + 1;
  return Array.from({ length }).map((_, index) => start + index);
};

const charCodes = range(65, 90);

const priorities = charCodes.reduce(
  (acc, code, index) => ({
    ...acc,
    [String.fromCharCode(code).toLowerCase()]: 1 + index,
  }),
  {}
);

const p1 = data
  .map((line) => {
    const middle = line.length / 2;
    const first = line.slice(0, middle);
    const second = line.slice(middle);

    const common = [
      ...new Set(first.split("").filter((x) => second.includes(x))),
    ];

    return common.reduce(
      (acc, curr) =>
        acc + (priorities[curr] ?? priorities[curr.toLowerCase()] + 26),
      0
    );
  })
  .reduce((x, y) => x + y, 0);

const p2 = data
  .reduce((acc, line) => {
    const prev = acc.at(-1);

    if (prev?.length < 3) {
      return [...acc.slice(0, acc.length - 1), [...prev, line]];
    }

    return [...acc, [line]];
  }, [])
  .map(([first, second, third]: [string, string, string]) => {
    const common = [
      ...new Set(
        first
          .split("")
          .filter((x) => second.includes(x))
          .filter((x) => third.includes(x))
      ),
    ];

    return common.reduce(
      (acc, curr) =>
        acc + (priorities[curr] ?? priorities[curr.toLowerCase()] + 26),
      0
    );
  })
  .reduce((x, y) => x + y, 0);

console.log("[day 03 -> part 1]: ", p1);
console.log("[day 03 -> part 2]: ", p2);

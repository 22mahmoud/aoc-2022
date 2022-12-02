import fs from "fs";
import path from "path";

enum Shape {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}

enum Status {
  LOST = "LOST",
  DRAW = "DRAW",
  WON = "WON",
}

const shapeScore: Record<Shape, number> = {
  [Shape.ROCK]: 1,
  [Shape.PAPER]: 2,
  [Shape.SCISSORS]: 3,
};

const roundScore: Record<Status, number> = {
  [Status.LOST]: 0,
  [Status.DRAW]: 3,
  [Status.WON]: 6,
};

const shape = {
  A: Shape.ROCK,
  X: Shape.ROCK,

  B: Shape.PAPER,
  Y: Shape.PAPER,

  C: Shape.SCISSORS,
  Z: Shape.SCISSORS,
};

const status = {
  X: Status.LOST,
  Y: Status.DRAW,
  Z: Status.WON,
};

const winMap: Record<Shape, Record<Shape, Status>> = {
  [Shape.PAPER]: {
    [Shape.PAPER]: Status.DRAW,
    [Shape.ROCK]: Status.LOST,
    [Shape.SCISSORS]: Status.WON,
  },

  [Shape.ROCK]: {
    PAPER: Status.WON,
    ROCK: Status.DRAW,
    SCISSORS: Status.LOST,
  },

  [Shape.SCISSORS]: {
    PAPER: Status.LOST,
    ROCK: Status.WON,
    SCISSORS: Status.DRAW,
  },
};

const flip = <T extends string, P extends string>(
  o: Record<T, P>
): Record<P, T> =>
  Object.fromEntries(Object.entries(o).map(([key, value]) => [value, key]));

const data = fs
  .readFileSync(path.resolve(__dirname, "d02-input.txt"), {
    encoding: "utf-8",
  })
  .split(/\n/)
  .map((x) => x.split(" "));

const part1 = data
  .map((data) => {
    if (!data?.at(0)) return 0;

    const [a, b] = data as [a: "A" | "B" | "C", b: "X" | "Y" | "Z"];
    const x = shape[a];
    const y = shape[b];
    const state = winMap[x][y];
    return roundScore[state] + shapeScore[y];
  })
  .reduce((x, y) => x + y, 0);

const part2 = data
  .map((data) => {
    if (!data?.at(0)) return 0;

    const [a, b] = data as [a: "A" | "B" | "C", b: "X" | "Y" | "Z"];
    const x = shape[a];
    const y = flip(winMap[x])[status[b]];
    const state = winMap[x][y];

    return roundScore[state] + shapeScore[y];
  })
  .reduce((x, y) => x + y, 0);

console.log("[day 02 -> part 1]: ", part1);
console.log("[day 02 -> part 2]: ", part2);

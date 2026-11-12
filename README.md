# TypeScript Three-Way Merge

A small TypeScript project that implements the requested function:

```text
merge(int[] collection_1, int[] collection_2, int[] collection_3): int[]
```

In TypeScript, integer arrays are represented using `number[]` because TypeScript does not define a separate `int` type.

## Requirements

- Node.js 20 or later
- npm (comes with Node.js)

## Problem constraints

- `collection_1` and `collection_2` are already sorted **ascending**.
- `collection_3` is already sorted **descending**.
- The result must be sorted **ascending**.
- **Do not use any sorting function** (`sort`, etc.).
- Input arrays are not modified.

## Setup

```bash
npm install
```

## Run example

```bash
npm run dev
```

Expected output includes:

```text
Merged result (ascending): [
  0, 1, 2, 3, 4,
  5, 6, 7, 8, 9
]
```

Or build and run separately:

```bash
npm run build
npm start
```

## Run unit tests

```bash
npm test
```

This compiles the TypeScript and runs **10 unit tests** using Node.js's built-in test runner (`node:test`). No separate test framework is required.

Test cases include regular merges, duplicates, empty collections, each array individually, unequal lengths, negative integers, immutability, and a large input.

## Implementation

The code uses three pointers:

- `i` starts at index `0` in `collection_1`.
- `j` starts at index `0` in `collection_2`.
- `k` starts at the **last index** in `collection_3`.

All three pointers therefore face the next smallest remaining number. On each iteration, append the smallest number to the result and advance only its pointer. Stop when all pointers are exhausted.

**Complexity** for total input length `N = n1 + n2 + n3`:

- Time: **O(N)**. Every number is processed exactly once.
- Space: **O(N)** for the output, with **O(1)** extra working space.

The solution does not call any sorting function.

## Example

```typescript
import { merge } from "./src/merge.js";

const result = merge([1, 4, 7], [2, 5, 8], [9, 6, 3, 0]);
console.log(result); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Project structure

```text
typescript-three-way-merge/
├── src/
│   ├── merge.ts            # O(N) merge implementation
│   └── index.ts            # Runnable demonstration
├── tests/
│   └── merge.test.ts       # 10 unit tests
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

This implementation assumes the inputs are already ordered as described. It does not re-order or validate the inputs. Negative integer inputs also work, despite the original problem's nonnegative assumption.

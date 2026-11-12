import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { merge } from "../src/merge.js";

describe("merge", () => {
  it("combines three pre-ordered arrays in ascending order", () => {
    assert.deepEqual(
      merge([1, 4, 7], [2, 5, 8], [9, 6, 3, 0]),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    );
  });

  it("preserves duplicate values across and within collections", () => {
    assert.deepEqual(
      merge([1, 2, 2], [1, 2, 5], [5, 2, 1]),
      [1, 1, 1, 2, 2, 2, 2, 5, 5],
    );
  });

  it("handles all three collections being empty", () => {
    assert.deepEqual(merge([], [], []), []);
  });

  it("handles a nonempty first collection alone", () => {
    assert.deepEqual(merge([0, 4, 10], [], []), [0, 4, 10]);
  });

  it("handles a nonempty second collection alone", () => {
    assert.deepEqual(merge([], [0, 4, 10], []), [0, 4, 10]);
  });

  it("reverses the descending third collection through traversal", () => {
    assert.deepEqual(merge([], [], [10, 4, 4, 0]), [0, 4, 4, 10]);
  });

  it("handles unequal lengths and zero", () => {
    assert.deepEqual(
      merge([0], [1, 3, 5, 7], [8, 6, 4, 2, 0]),
      [0, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    );
  });

  it("also works with negative integers", () => {
    assert.deepEqual(
      merge([-5, -1], [-4, 2], [3, 0, -3]),
      [-5, -4, -3, -1, 0, 2, 3],
    );
  });

  it("does not mutate any input collection", () => {
    const first = Object.freeze([1, 4, 7]);
    const second = Object.freeze([2, 5, 8]);
    const third = Object.freeze([9, 6, 3, 0]);
    assert.deepEqual(
      merge(first, second, third),
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    );
    assert.deepEqual(first, [1, 4, 7]);
    assert.deepEqual(second, [2, 5, 8]);
    assert.deepEqual(third, [9, 6, 3, 0]);
  });

  it("handles large inputs with one pass through each collection", () => {
    const n = 10_000;
    const first = Array.from({ length: n }, (_, i) => 3 * i);
    const second = Array.from({ length: n }, (_, i) => 3 * i + 1);
    const third = Array.from({ length: n }, (_, i) => 3 * (n - 1 - i) + 2);
    const result = merge(first, second, third);

    assert.equal(result.length, 3 * n);
    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i], i);
    }
  });
});

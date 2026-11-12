/**
 * Combines three pre-ordered integer arrays into one ascending array.
 *
 * Preconditions:
 * - collection_1 and collection_2 are sorted in ascending order.
 * - collection_3 is sorted in descending order.
 *
 * No input is modified, and no sorting function is called.
 *
 * Time: O(n1 + n2 + n3)
 * Extra space: O(n1 + n2 + n3) for the returned array; O(1) otherwise.
 */
export function merge(
  collection_1: readonly number[],
  collection_2: readonly number[],
  collection_3: readonly number[],
): number[] {
  const result: number[] = [];

  let i = 0; // Traverse collection_1 from left to right.
  let j = 0; // Traverse collection_2 from left to right.
  let k = collection_3.length - 1; // Traverse collection_3 from right to left.

  while (i < collection_1.length || j < collection_2.length || k >= 0) {
    // All values are finite integers as specified by the function contract.
    // Infinity marks a cursor that has reached the end of its collection.
    const a = i < collection_1.length ? collection_1[i]! : Infinity;
    const b = j < collection_2.length ? collection_2[j]! : Infinity;
    const c = k >= 0 ? collection_3[k]! : Infinity;

    if (a <= b && a <= c) {
      result.push(a);
      i++;
    } else if (b <= a && b <= c) {
      result.push(b);
      j++;
    } else {
      result.push(c);
      k--;
    }
  }

  return result;
}

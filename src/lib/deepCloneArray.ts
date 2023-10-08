/**
 * deepCloneArray() : a recursive deep clone function.
 *
 * This function is apparently superior in both its functionality
 * and its performace to the other options:
 *
 * const shallowClone = [...original]; // only the first level gets cloned.
 * const cloneOfLimitedTypes = JSON.parse(JSON.stringify(original)); // does not work on Date, Function, etc.
 * const cloneOfStructuredClonableTypes = structuredClone(original); // does not work on Symbol
 */

export function deepCloneArray<T>(arr: T): T {
  if (!Array.isArray(arr)) return arr;
  return arr.map(item => Array.isArray(item) ? deepCloneArray(item) : item) as T;
}

/**
 * Recursively traverses an object and removes all stack properties in-place.
 * @param obj The error or object to be stripped of stacks
 */
export declare function stripStacks<T extends any>(obj: T): T;

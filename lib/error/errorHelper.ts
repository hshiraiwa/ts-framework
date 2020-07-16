const STACK_PROPERTY_NAME = "stack";

export function stripStacks<T extends Error>(obj: T): T {
  return obj;
}

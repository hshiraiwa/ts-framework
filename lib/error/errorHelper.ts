import fclone from "fclone";

const STACK_PROPERTY_NAME = "stack";

// tslint:disable-next-line
function _stripStacksInternal(obj: any, clone: boolean): any {
  const output = clone ? fclone(obj) : obj;

  for (const prop of Object.getOwnPropertyNames(output)) {
    const value = output[prop];

    if (prop === STACK_PROPERTY_NAME) {
      delete output[STACK_PROPERTY_NAME];
    } else if (typeof value === "object" && value !== null) {
      _stripStacksInternal(output[prop], false);
    }
  }

  return output;
}

/**
 * Recursively traverses an object and removes all stack properties in-place.
 * @param obj The error or object to be stripped of stacks
 */
export function stripStacks<T extends any>(obj: T): T {
  /*
   * The second parameter controls wheter we return a new object or mutate the object in-place.
   * If we choose to return a new object (which we should, since mutating parameters may lead to unpredictable
   * consequences as the parameter object may live on and be passed to other places, and is generally frowned upon)
   * we deep-clone the input object using fclone and mutate our clone, but fclone is intended for POJOs and does not
   * preserve the prototype chain, so while this function was designed with the intention of not mutating its
   * parameters, we are more scared of breaking the error prototype chain, so we mutate the object in place.
   */
  return _stripStacksInternal(obj, false);
}

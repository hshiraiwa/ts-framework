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

export function stripStacks<T extends any>(obj: T): T {
  return _stripStacksInternal(obj, false);
}

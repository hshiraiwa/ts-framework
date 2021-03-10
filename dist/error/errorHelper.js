"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripStacks = void 0;
const fclone_1 = require("fclone");
const STACK_PROPERTY_NAME = "stack";
// tslint:disable-next-line
function _stripStacksInternal(obj, clone) {
    const output = clone ? fclone_1.default(obj) : obj;
    for (const prop of Object.getOwnPropertyNames(output)) {
        const value = output[prop];
        if (prop === STACK_PROPERTY_NAME) {
            delete output[STACK_PROPERTY_NAME];
        }
        else if (typeof value === "object" && value !== null) {
            _stripStacksInternal(output[prop], false);
        }
    }
    return output;
}
/**
 * Recursively traverses an object and removes all stack properties in-place.
 * @param obj The error or object to be stripped of stacks
 */
function stripStacks(obj) {
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
exports.stripStacks = stripStacks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZXJyb3IvZXJyb3JIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQTRCO0FBRTVCLE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDO0FBRXBDLDJCQUEyQjtBQUMzQixTQUFTLG9CQUFvQixDQUFDLEdBQVEsRUFBRSxLQUFjO0lBQ3BELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBRXpDLEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3JELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixJQUFJLElBQUksS0FBSyxtQkFBbUIsRUFBRTtZQUNoQyxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUN0RCxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0M7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixXQUFXLENBQWdCLEdBQU07SUFDL0M7Ozs7Ozs7T0FPRztJQUNILE9BQU8sb0JBQW9CLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFWRCxrQ0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmY2xvbmUgZnJvbSBcImZjbG9uZVwiO1xuXG5jb25zdCBTVEFDS19QUk9QRVJUWV9OQU1FID0gXCJzdGFja1wiO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbmZ1bmN0aW9uIF9zdHJpcFN0YWNrc0ludGVybmFsKG9iajogYW55LCBjbG9uZTogYm9vbGVhbik6IGFueSB7XG4gIGNvbnN0IG91dHB1dCA9IGNsb25lID8gZmNsb25lKG9iaikgOiBvYmo7XG5cbiAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG91dHB1dCkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG91dHB1dFtwcm9wXTtcblxuICAgIGlmIChwcm9wID09PSBTVEFDS19QUk9QRVJUWV9OQU1FKSB7XG4gICAgICBkZWxldGUgb3V0cHV0W1NUQUNLX1BST1BFUlRZX05BTUVdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICBfc3RyaXBTdGFja3NJbnRlcm5hbChvdXRwdXRbcHJvcF0sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlcyBhbiBvYmplY3QgYW5kIHJlbW92ZXMgYWxsIHN0YWNrIHByb3BlcnRpZXMgaW4tcGxhY2UuXG4gKiBAcGFyYW0gb2JqIFRoZSBlcnJvciBvciBvYmplY3QgdG8gYmUgc3RyaXBwZWQgb2Ygc3RhY2tzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFN0YWNrczxUIGV4dGVuZHMgYW55PihvYmo6IFQpOiBUIHtcbiAgLypcbiAgICogVGhlIHNlY29uZCBwYXJhbWV0ZXIgY29udHJvbHMgd2hldGVyIHdlIHJldHVybiBhIG5ldyBvYmplY3Qgb3IgbXV0YXRlIHRoZSBvYmplY3QgaW4tcGxhY2UuXG4gICAqIElmIHdlIGNob29zZSB0byByZXR1cm4gYSBuZXcgb2JqZWN0ICh3aGljaCB3ZSBzaG91bGQsIHNpbmNlIG11dGF0aW5nIHBhcmFtZXRlcnMgbWF5IGxlYWQgdG8gdW5wcmVkaWN0YWJsZVxuICAgKiBjb25zZXF1ZW5jZXMgYXMgdGhlIHBhcmFtZXRlciBvYmplY3QgbWF5IGxpdmUgb24gYW5kIGJlIHBhc3NlZCB0byBvdGhlciBwbGFjZXMsIGFuZCBpcyBnZW5lcmFsbHkgZnJvd25lZCB1cG9uKVxuICAgKiB3ZSBkZWVwLWNsb25lIHRoZSBpbnB1dCBvYmplY3QgdXNpbmcgZmNsb25lIGFuZCBtdXRhdGUgb3VyIGNsb25lLCBidXQgZmNsb25lIGlzIGludGVuZGVkIGZvciBQT0pPcyBhbmQgZG9lcyBub3RcbiAgICogcHJlc2VydmUgdGhlIHByb3RvdHlwZSBjaGFpbiwgc28gd2hpbGUgdGhpcyBmdW5jdGlvbiB3YXMgZGVzaWduZWQgd2l0aCB0aGUgaW50ZW50aW9uIG9mIG5vdCBtdXRhdGluZyBpdHNcbiAgICogcGFyYW1ldGVycywgd2UgYXJlIG1vcmUgc2NhcmVkIG9mIGJyZWFraW5nIHRoZSBlcnJvciBwcm90b3R5cGUgY2hhaW4sIHNvIHdlIG11dGF0ZSB0aGUgb2JqZWN0IGluIHBsYWNlLlxuICAgKi9cbiAgcmV0dXJuIF9zdHJpcFN0YWNrc0ludGVybmFsKG9iaiwgZmFsc2UpO1xufVxuIl19
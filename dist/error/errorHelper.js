"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZXJyb3IvZXJyb3JIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBNEI7QUFFNUIsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUM7QUFFcEMsMkJBQTJCO0FBQzNCLFNBQVMsb0JBQW9CLENBQUMsR0FBUSxFQUFFLEtBQWM7SUFDcEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFFekMsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCLElBQUksSUFBSSxLQUFLLG1CQUFtQixFQUFFO1lBQ2hDLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3RELG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMzQztLQUNGO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLFdBQVcsQ0FBZ0IsR0FBTTtJQUMvQzs7Ozs7OztPQU9HO0lBQ0gsT0FBTyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQVZELGtDQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZjbG9uZSBmcm9tIFwiZmNsb25lXCI7XG5cbmNvbnN0IFNUQUNLX1BST1BFUlRZX05BTUUgPSBcInN0YWNrXCI7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuZnVuY3Rpb24gX3N0cmlwU3RhY2tzSW50ZXJuYWwob2JqOiBhbnksIGNsb25lOiBib29sZWFuKTogYW55IHtcbiAgY29uc3Qgb3V0cHV0ID0gY2xvbmUgPyBmY2xvbmUob2JqKSA6IG9iajtcblxuICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob3V0cHV0KSkge1xuICAgIGNvbnN0IHZhbHVlID0gb3V0cHV0W3Byb3BdO1xuXG4gICAgaWYgKHByb3AgPT09IFNUQUNLX1BST1BFUlRZX05BTUUpIHtcbiAgICAgIGRlbGV0ZSBvdXRwdXRbU1RBQ0tfUFJPUEVSVFlfTkFNRV07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIF9zdHJpcFN0YWNrc0ludGVybmFsKG91dHB1dFtwcm9wXSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgdHJhdmVyc2VzIGFuIG9iamVjdCBhbmQgcmVtb3ZlcyBhbGwgc3RhY2sgcHJvcGVydGllcyBpbi1wbGFjZS5cbiAqIEBwYXJhbSBvYmogVGhlIGVycm9yIG9yIG9iamVjdCB0byBiZSBzdHJpcHBlZCBvZiBzdGFja3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwU3RhY2tzPFQgZXh0ZW5kcyBhbnk+KG9iajogVCk6IFQge1xuICAvKlxuICAgKiBUaGUgc2Vjb25kIHBhcmFtZXRlciBjb250cm9scyB3aGV0ZXIgd2UgcmV0dXJuIGEgbmV3IG9iamVjdCBvciBtdXRhdGUgdGhlIG9iamVjdCBpbi1wbGFjZS5cbiAgICogSWYgd2UgY2hvb3NlIHRvIHJldHVybiBhIG5ldyBvYmplY3QgKHdoaWNoIHdlIHNob3VsZCwgc2luY2UgbXV0YXRpbmcgcGFyYW1ldGVycyBtYXkgbGVhZCB0byB1bnByZWRpY3RhYmxlXG4gICAqIGNvbnNlcXVlbmNlcyBhcyB0aGUgcGFyYW1ldGVyIG9iamVjdCBtYXkgbGl2ZSBvbiBhbmQgYmUgcGFzc2VkIHRvIG90aGVyIHBsYWNlcywgYW5kIGlzIGdlbmVyYWxseSBmcm93bmVkIHVwb24pXG4gICAqIHdlIGRlZXAtY2xvbmUgdGhlIGlucHV0IG9iamVjdCB1c2luZyBmY2xvbmUgYW5kIG11dGF0ZSBvdXIgY2xvbmUsIGJ1dCBmY2xvbmUgaXMgaW50ZW5kZWQgZm9yIFBPSk9zIGFuZCBkb2VzIG5vdFxuICAgKiBwcmVzZXJ2ZSB0aGUgcHJvdG90eXBlIGNoYWluLCBzbyB3aGlsZSB0aGlzIGZ1bmN0aW9uIHdhcyBkZXNpZ25lZCB3aXRoIHRoZSBpbnRlbnRpb24gb2Ygbm90IG11dGF0aW5nIGl0c1xuICAgKiBwYXJhbWV0ZXJzLCB3ZSBhcmUgbW9yZSBzY2FyZWQgb2YgYnJlYWtpbmcgdGhlIGVycm9yIHByb3RvdHlwZSBjaGFpbiwgc28gd2UgbXV0YXRlIHRoZSBvYmplY3QgaW4gcGxhY2UuXG4gICAqL1xuICByZXR1cm4gX3N0cmlwU3RhY2tzSW50ZXJuYWwob2JqLCBmYWxzZSk7XG59XG4iXX0=
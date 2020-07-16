import { stripStacks } from "../../lib/error/errorHelper";
import { HttpError } from "../../lib";

describe("lib.errors.errorHelper", () => {
  describe("stripStacks", () => {
    it("Removes the stack property from an error", () => {
      const error = new Error("TEST_ERROR");
      const errorWithNoStack = stripStacks(error);

      expect(errorWithNoStack).not.toHaveProperty("stack");
    });

    it("Removes the stack property from an HttpError", () => {
      const error = new HttpError("TEST_ERROR", 500);
      const errorWithNoStack = stripStacks(error);

      expect(errorWithNoStack).not.toHaveProperty("stack");
    });

    it("Removes stack properties from non-standard error fields", () => {
      class MyError extends Error {
        public details: any;

        constructor(msg: string, details: any) {
          super(msg);
          this.details = details;
        }
      }

      const myError = new MyError("TEST_ERROR", { stack: "foo" });
      const errorWithNoStack = stripStacks(myError);

      expect(errorWithNoStack).not.toHaveProperty("stack");
      expect(errorWithNoStack.details).not.toHaveProperty("stack");
    });

    it("Removes stack properties in an HttpError's details", () => {
      const httpError = new HttpError("TEST_ERROR", 500, { stack: "foo" });
      const errorWithNoStack = stripStacks(httpError);

      expect(errorWithNoStack).not.toHaveProperty("stack");
      expect(errorWithNoStack.details).not.toHaveProperty("stack");
    });

    it("Removes deeply nested stacks.", () => {
      const httpError = new HttpError("TEST_ERROR", 500, { stack: "foo", bar: { stack: "baz" } });
      const errorWithNoStack = stripStacks(httpError);

      expect(errorWithNoStack).not.toHaveProperty("stack");
      expect(errorWithNoStack.details).not.toHaveProperty("stack");
      expect(errorWithNoStack.details.bar).not.toHaveProperty("stack");
    });
  });
});

import { HttpError, HttpCode } from "../../../lib";

describe("HttpError", () => {
  it("should instantiate a simple error", () => {
    const error = new HttpError("Test error", HttpCode.Client.FORBIDDEN, { test: "ok" });

    // Basic error attributes
    expect(error).toHaveProperty("message");
    expect(error).toHaveProperty("stackId");
    expect(error).toHaveProperty("stack");
    expect(error.message).toMatch(new RegExp(error.stackId));

    // Http error details
    expect(error).toHaveProperty("details");
    expect(error).toHaveProperty("status", 403);
    expect(error.details).toHaveProperty("test", "ok");
  });
});

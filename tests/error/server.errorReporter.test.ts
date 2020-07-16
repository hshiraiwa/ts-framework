import * as request from "supertest";
import Server, { HttpError } from "../../lib";

describe("lib.server.errors.errorReporter", () => {
  it("GET /unknown_error (500)", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      security: {
        cors: false
      },
      router: {
        routes: {
          get: {
            "/": (req, res) => {
              throw new Error("TEST_ERROR");
            }
          }
        }
      }
    });

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response: any) => {
        expect(response.body.status).toBe(500);
        expect(response.body.stackId).toBeDefined();
        expect(response.body.message).toMatch(/TEST_ERROR/);
      });

    await server.close();
  });

  it("GET /http_error (400)", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      security: {
        cors: false
      },
      router: {
        routes: {
          get: {
            "/": (req, res) => {
              throw new HttpError("BAD_PARAMS", 400);
            }
          }
        }
      }
    });

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response: any) => {
        expect(response.body.status).toBe(400);
        expect(response.body.stackId).toBeDefined();
        expect(response.body.message).toMatch(/BAD_PARAMS/);
      });

    await server.close();
  });

  it("GET /unknown_error (500) with stack omited", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      security: {
        cors: false
      },
      router: {
        omitStack: true,
        routes: {
          get: {
            "/": (req, res) => {
              throw new Error("TEST_ERROR");
            }
          }
        }
      }
    });

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response: any) => {
        expect(response.body.status).toBe(500);
        expect(response.body.stack).not.toBeDefined();
        expect(response.body.stackId).toBeDefined();
        expect(response.body.message).toMatch(/TEST_ERROR/);
      });

    await server.close();
  });

  it("should remove deeply nested stacks on an error 500 if configured to omitStack", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      security: {
        cors: false
      },
      router: {
        omitStack: true,
        routes: {
          get: {
            "/": (req, res) => {
              const internalError = new Error("INTERNAL_ERROR");
              throw new HttpError("TEST_ERROR", 500, {
                message: internalError.message,
                stack: internalError.stack
              });
            }
          }
        }
      }
    });

    // Perform a simple request to get a 500 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response: any) => {
        expect(response.body.status).toBe(500);
        expect(response.body.stack).not.toBeDefined();
        expect(response.body.stackId).toBeDefined();
        expect(response.body.message).toMatch(/TEST_ERROR/);
        expect(response.body.details.message).toMatch(/INTERNAL_ERROR/);
        expect(response.body.details.stack).toBeUndefined();
      });

    await server.close();
  });

  it("should remove deeply nested stacks on an error 404 if configured to omitStack", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      security: {
        cors: false
      },
      router: {
        omitStack: true,
        routes: {
          get: {
            "/": (req, res) => {
              const internalError = new Error("INTERNAL_ERROR");
              throw new HttpError("TEST_ERROR", 404, {
                message: internalError.message,
                stack: internalError.stack
              });
            }
          }
        }
      }
    });

    // Perform a simple request to get a 500 response
    await request(server.app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response: any) => {
        expect(response.body.status).toBe(500);
        expect(response.body.stack).not.toBeDefined();
        expect(response.body.stackId).toBeDefined();
        expect(response.body.message).toMatch(/TEST_ERROR/);
        expect(response.body.details.message).toMatch(/INTERNAL_ERROR/);
        expect(response.body.details.stack).toBeUndefined();
      });

    await server.close();
  });
});

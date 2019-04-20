import * as request from "supertest";
import Server from "../../../lib";

describe("lib.server.middlewares.legacyParams", () => {
  it("GET /:test (200)", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      security: {
        cors: false
      },
      router: {
        routes: {
          get: {
            "/:test": (req, res) =>
              res.json({
                test: "ok",
                param: req.param("test"),
                unknown: req.param("unknown")
              })
          }
        }
      }
    });

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/test")
      .expect("Content-Type", /json/)
      .expect(200, { test: "ok", param: "test" });

    await server.close();
  });

  it("GET /?param=test (200)", async () => {
    // Initialize a simple server
    const server = new Server({
      port: 3333,
      security: {
        cors: false
      },
      router: {
        routes: {
          get: {
            "/": (req, res) =>
              res.json({
                test: "ok",
                param: req.param("test"),
                unknown: req.param("unknown")
              })
          }
        }
      }
    });

    // Perform a simple request to get a 200 response
    await request(server.app)
      .get("/")
      .query({ test: "test" })
      .expect("Content-Type", /json/)
      .expect(200, { test: "ok", param: "test" });

    await server.close();
  });
});

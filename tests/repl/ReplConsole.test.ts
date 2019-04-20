import Server, { ReplConsole } from "../../lib";

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

class MockRepl {
  context = {};
  start() {
    return this;
  }
  close() {
    return this;
  }
  on(event, cb) {
    cb();
  }
}

describe("lib.ReplConsole", () => {
  let repl;

  beforeAll(async () => {
    const noop = () => undefined;
    repl = new MockRepl();
  });

  it("should listen properly on specified port", async () => {
    const console = new ReplConsole({ repl, exit: false });

    // Initialize a simple server
    const server = new Server({
      port: 3333,
      repl: console,
      router: {
        routes: {
          get: { "/": (req, res) => res.success({ test: "ok" }) }
        }
      }
    });

    expect(() => console.clear()).not.toThrow();
    await server.listen();
    await server.close();
  });

  it("should initialize properly without listening to port", async () => {
    const console = new ReplConsole({ repl, exit: false });

    // Initialize a simple server
    const server = new Server({
      port: 3333,
      repl: console,
      router: {
        routes: {
          get: { "/": (req, res) => res.success({ test: "ok" }) }
        }
      }
    });

    expect(() => console.clear()).not.toThrow();
    await server.onInit();
    await server.close();
  });
});

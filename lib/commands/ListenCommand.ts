import RunCommand from "./RunCommand";

export default class ListenCommand extends RunCommand {
  command = {
    // Override specific configiurations
    syntax: "listen [entrypoint]",
    description: "Starts the standalone server",
    options: [
      ["-d, --development", "starts server without production flags"],
      ["-p, --port", "the PORT to listen to, can be overriden with PORT env variable."]
    ]
  };

  public async run(entrypoint = this.options.entrypoint, options) {
    const env = options.env || this.options.env;
    const port = options.port || this.options.port;

    const distributionFile = await this.prepare({ entrypoint, env });
    this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Force production environment
      process.env.NODE_ENV = "production";
    }

    const instance = await this.load(distributionFile, { ...options, env, port });
    await instance.listen();
  }
}

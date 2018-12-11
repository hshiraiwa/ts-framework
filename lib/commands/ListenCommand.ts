import RunCommand from "./RunCommand";

export default class ListenCommand extends RunCommand {
  command = {
    // Override specific configiurations
    syntax: "listen [entrypoint]",
    description: "Starts the server",
    options: [
      ["-d, --development", "Starts server without production flags"],
      ["-p, --port", "The PORT to listen to, can be overriden with PORT env variable."]
    ]
  };

  public async run(entrypoint, { port, env }) {
    const distributionFile = await this.prepare({ entrypoint, env });
    this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Force production environment
      process.env.NODE_ENV = "production";
    }

    const options = { port: process.env.PORT || port || 3000 };
    const instance = await this.load(distributionFile, {
      ...options
    });

    await instance.listen();
  }
}

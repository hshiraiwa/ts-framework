import RunCommand from "./RunCommand";

export default class ListenCommand extends RunCommand {
  public async run({ entrypoint, env }) {
    const distributionFile = await this.prepare({ entrypoint, env });
    this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Force production environment
      process.env.NODE_ENV = "production";
    }

    const options = { port: process.env.PORT || 3000 };
    const instance = await this.load(distributionFile, {
      ...options
    });

    await instance.listen();
  }
}

import * as Package from "pjson";
import * as Nodemon from "nodemon";
import BaseCommand from "../base/BaseCommand";

export default class WatchCommandCommand extends BaseCommand<{ entrypoint: string }> {
  public async run({ entrypoint }) {
    this.logger.debug(`[ts-framework] ${Package.version}`);
    this.logger.debug(`[ts-framework] starting server from \`start.ts\´`);
    this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\``);

    Nodemon({
      delay: "1000",
      debug: true,
      ext: "ts js",
      watch: ["./**/*"],
      exec: `node -r ts-node/register ${entrypoint || "start.ts"}`,
      ignore: ["dist/*", "./tests/*"]
    });

    Nodemon.on("restart", files => {
      this.logger.debug("[ts-framework] restarting due to changes...", { files });
    });

    Nodemon.on("quit", () => {
      this.logger.debug("[ts-framework] terminating...");
      process.exit(1);
    });

    Nodemon.on("crash", () => {
      this.logger.warn("[ts-framework] instance crashed unexpectedly");
      this.logger.debug("[ts-framework] waiting for files changes before restarting...");
    });
  }
}

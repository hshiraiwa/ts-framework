import { BaseError, Job, JobOptions } from "ts-framework-common";
import MainServer from '../server';

export default class WelcomeJob extends Job {
  public async run(server: MainServer): Promise<void> {
    this.logger.info('Welcome, my friend!');
  }
}
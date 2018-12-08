export default abstract class BaseCommand {
  constructor() {
    this.run = this.run.bind(this);
  }

  public abstract async run(): Promise<void>;
}

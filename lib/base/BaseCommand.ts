export default abstract class BaseCommand<Options> {
  constructor() {
    this.run = this.run.bind(this);
  }

  public abstract async run(options: Options): Promise<void>;
}

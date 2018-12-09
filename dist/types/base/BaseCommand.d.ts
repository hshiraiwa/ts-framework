export default abstract class BaseCommand<Options> {
    constructor();
    abstract run(options: Options): Promise<void>;
}

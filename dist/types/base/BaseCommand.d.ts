export default abstract class BaseCommand {
    constructor();
    abstract run(): Promise<void>;
}

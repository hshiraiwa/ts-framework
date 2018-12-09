import RunCommand from "./RunCommand";
export default class ListenCommand extends RunCommand {
    run({ entrypoint, env }: {
        entrypoint: any;
        env: any;
    }): Promise<void>;
}

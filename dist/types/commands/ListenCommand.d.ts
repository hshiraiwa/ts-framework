import RunCommand from "./RunCommand";
export default class ListenCommand extends RunCommand {
    command: {
        syntax: string;
        description: string;
        options: string[][];
    };
    run(entrypoint: any, { port, env }: {
        port: any;
        env: any;
    }): Promise<void>;
}

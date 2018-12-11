import RunCommand from "./RunCommand";
export default class ListenCommand extends RunCommand {
    command: {
        syntax: string;
        description: string;
        options: string[][];
    };
    run(entrypoint: string, options: any): Promise<void>;
}

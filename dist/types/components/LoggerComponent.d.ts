import { Logger, ComponentOptions, Component, ComponentType } from "ts-framework-common";
import Server from "../server";
export interface LoggerComponentOptions extends ComponentOptions {
    logger?: Logger;
    sentry?: {
        dsn: string;
    };
}
export default class LoggerComponent implements Component {
    options: LoggerComponentOptions;
    type: ComponentType;
    protected logger: Logger;
    constructor(options?: LoggerComponentOptions);
    describe(): {
        name: string;
    };
    onMount(server: Server): void;
    onInit(): Promise<void>;
    onUnmount(): void;
}

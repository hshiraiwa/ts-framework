import { Component, ComponentOptions, ComponentType, LoggerInstance } from "ts-framework-common";
import Server from "../server";
export interface LoggerComponentOptions extends ComponentOptions {
    logger?: LoggerInstance;
    sentry?: {
        dsn: string;
    };
}
export default class LoggerComponent implements Component {
    options: LoggerComponentOptions;
    type: ComponentType;
    logger: LoggerInstance;
    constructor(options?: LoggerComponentOptions);
    describe(): {
        name: string;
        context: {
            transports: any[];
        };
    };
    onMount(server: Server): void;
    onInit(): Promise<void>;
    onUnmount(): void;
}

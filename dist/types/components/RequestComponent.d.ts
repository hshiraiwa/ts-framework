import * as Multer from "multer";
import { Component, ComponentType, ComponentOptions, LoggerInstance } from "ts-framework-common";
import Server from "../server";
export interface RequestComponentOptions extends ComponentOptions {
    logger?: LoggerInstance;
    bodyLimit?: string;
    inflate?: boolean;
    secret?: string;
    multer?: {
        single?: string;
        array?: {
            name: string;
            maxCount: number;
        };
        fields?: {
            name: string;
            maxCount: number;
        }[];
        options?: Multer.Options;
    };
}
export default class RequestComponent implements Component {
    options: RequestComponentOptions;
    type: ComponentType.MIDDLEWARE;
    logger: LoggerInstance;
    constructor(options?: RequestComponentOptions);
    describe(): {
        name: string;
    };
    onMount(server: Server): void;
    onInit(): Promise<void>;
    onUnmount(): void;
}

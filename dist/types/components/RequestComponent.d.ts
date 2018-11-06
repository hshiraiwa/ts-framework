import * as Multer from "multer";
import { Logger, Component, ComponentType, ComponentOptions } from "ts-framework-common";
import Server from "../server";
export interface RequestComponentOptions extends ComponentOptions {
    logger?: Logger;
    bodyLimit?: string;
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
    protected logger: Logger;
    constructor(options?: RequestComponentOptions);
    describe(): {
        name: string;
    };
    onMount(server: Server): void;
    onInit(): Promise<void>;
    onUnmount(): void;
}

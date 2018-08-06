import * as cors from "cors";
import * as Helmet from "helmet";
import { Logger, ComponentType, Component } from "ts-framework-common";
import Server from "../index";
export interface SecurityComponentOptions {
    logger?: Logger;
    helmet?: Helmet.IHelmetConfiguration | false;
    userAgent?: boolean;
    cors?: boolean | cors.CorsOptions;
    trustProxy?: boolean;
}
export default class SecurityComponent implements Component {
    options: SecurityComponentOptions;
    type: ComponentType.MIDDLEWARE;
    protected logger: Logger;
    constructor(options?: SecurityComponentOptions);
    describe(): {
        name: string;
    };
    onMount(server: Server): void;
    onInit(server: Server): Promise<void>;
    onUnmount(server: Server): void;
}

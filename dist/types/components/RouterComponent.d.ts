import { Logger, ComponentType, Component, ComponentOptions } from "ts-framework-common";
import { ErrorDefinitions } from "../error/ErrorReporter";
import { RouteMap } from "./router";
import { BaseController } from "./router/controller";
import Server from "../server";
export interface RouterComponentOptions extends ComponentOptions {
    logger?: Logger;
    routes?: RouteMap;
    sentry?: {
        dsn: string;
    };
    controllers?: {
        [controllerName: string]: BaseController;
    };
    path?: {
        filters?: string;
        controllers?: string;
    };
    errors?: ErrorDefinitions;
    oauth?: {
        model: any;
        authorize?: any;
        useErrorHandler?: boolean;
        continueMiddleware?: boolean;
        allowExtendedTokenAttributes?: boolean;
        token?: {
            extendedGrantTypes?: {
                [name: string]: any;
            };
            accessTokenLifetime?: number;
            refreshTokenLifetime?: number;
            requireClientAuthentication?: boolean;
            allowExtendedTokenAttributes?: boolean;
        };
    };
}
export default class RouterComponent implements Component {
    options: RouterComponentOptions;
    type: ComponentType.MIDDLEWARE;
    protected logger: Logger;
    constructor(options?: RouterComponentOptions);
    describe(): {
        name: string;
    };
    onMount(server: Server): void;
    onInit(): Promise<void>;
    onUnmount(): void;
}

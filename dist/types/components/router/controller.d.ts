export interface BaseControllerRoute {
    filters?: Function[];
    controller?: {
        target: any;
        key: string;
    };
}
export interface BaseController {
    baseRoute?: string;
    baseFilters?: Function[];
    routes?: {
        [key: string]: BaseControllerRoute;
    };
    new (...args: any[]): {};
}

import * as express from "express";
import { LoggerInstance } from "ts-framework-common";
import { BaseRequest } from "../..";
import { BaseResponse } from "../helpers/response";
export interface RouterOptions {
    logger?: LoggerInstance;
    app?: express.Application;
    path: {
        controllers?: string;
        filters?: string;
    };
}
export declare type Route = ((req: BaseRequest, res: BaseResponse) => any | Promise<any>);
export declare type Filter = ((req: BaseRequest, res: BaseResponse, next: Function) => any | Promise<any>);
export declare type RouteDefs = {
    controller: string | Route;
    filters?: (string | Filter)[];
};
export interface RouteMap {
    get?: {
        [path: string]: string | Route | RouteDefs;
    };
    post?: {
        [path: string]: string | Route | RouteDefs;
    };
    put?: {
        [path: string]: string | Route | RouteDefs;
    };
    delete?: {
        [path: string]: string | Route | RouteDefs;
    };
}
export default class ServerRouter {
    app: any;
    routes: any;
    logger: LoggerInstance;
    options: RouterOptions;
    constructor(controllers: any, routes: RouteMap, options?: RouterOptions);
    /**
     * Prepare the controller methods to being bound.
     * @param method
     * @param ctrl
     * @returns {{}}
     */
    prepareControllerMethods(method: any, ctrl: any): {};
    /**
     * Prepare the decorated routes for being merged into the routes map.
     *
     * @param controllers The controllers map
     *
     * @returns {Object}
     */
    decoratedRoutes(controllers: any): {
        get: {};
        post: {};
        put: {};
        delete: {};
    };
    init(): void;
    /**
     * Binds all routes registered in the method supplied
     *
     * @param method The http method to bind
     * @param routes The routes map
     *
     * @returns {boolean}
     */
    bindMethod(method: any, routes: any): boolean;
    /**
     * Register the controller defined by the route supplied.
     *
     * @param routes The routes map
     * @param r The route to register
     *
     * @returns {any}
     */
    registerController(routes: any, r: any): any;
    /**
     * Binds the controller to the express application or creates a new one.
     *
     * @param {express.Application} [app] The express application
     *
     * @returns {express.Application}
     */
    register(app?: express.Application): any;
    /**
     * Build a router using the supplied routes map and options.
     *
     * @param {Object | string} controllers The map of controller classes to bind to
     * @param {Object | string} routes The map of route files ot bind to
     *
     * @param {RouterOptions} options
     */
    static build(controllers: object | string, routes: RouteMap | string, options?: RouterOptions): any;
}

import { Request, Response } from "express";
declare const asyncMiddleware: (method: string, route: string, functions: Function | Function[]) => ((req: Request, res: Response, next: any) => Promise<any>)[];
export default asyncMiddleware;

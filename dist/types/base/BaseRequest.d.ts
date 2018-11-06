import { Request } from 'express';
import { LoggerInstance } from 'winston';
export interface BaseRequest extends Request {
    user?: any;
    logger: LoggerInstance;
    param(name: string, defaultValue?: any): any;
}

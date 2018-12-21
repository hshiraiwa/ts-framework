import { BaseError } from 'ts-framework-common';
import { HttpCode } from './HttpCode';
export default class HttpError extends BaseError {
    status: HttpCode;
    constructor(message: any, status: HttpCode, details?: object);
    toObject(): any;
}

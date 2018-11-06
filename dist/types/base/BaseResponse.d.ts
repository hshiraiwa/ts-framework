import { Response } from 'express';
import { BaseError } from 'ts-framework-common';
import HttpError from '../error/http/HttpError';
export interface BaseResponse extends Response {
    error(status: number, error: Error): void;
    error(status: number, error: BaseError): void;
    error(status: number, errorMessage: string): void;
    error(error: HttpError): void;
    success(data?: any): void;
}

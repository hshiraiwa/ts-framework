import { Request } from "express";
import { LoggerInstance } from "ts-framework-common";

export interface BaseRequest extends Request {
  user?: any;
  logger: LoggerInstance;
  param(name: string, defaultValue?: any);
}

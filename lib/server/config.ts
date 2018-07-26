import { CorsOptions } from 'cors';
import { IHelmetConfiguration } from 'helmet';
import BaseJob from '../jobs/BaseJob';
import { LoggerInstance } from 'winston';
import { ErrorDefinitions } from './error/ErrorReporter';

export interface ServerOptions {
  port: number;
  secret?: string;
  routes?: any;
  cors?: boolean | CorsOptions;
  userAgent?: boolean;
  controllers?: object;
  bodyLimit?: string;
  path?: {
    filters?: string;
    controllers?: string;
  };
  sentry?: {
    dsn: string;
  };
  helmet?: IHelmetConfiguration | false;
  startup?: {
    pipeline: BaseJob[];
    [key: string]: any;
  };
  multer?: any; // TODO: Specify the signature
  oauth?: {
    model: any; // TODO: Specify the signature
    authorize?: any, // TODO: Specify the signature
    useErrorHandler?: boolean;
    continueMiddleware?: boolean;
    allowExtendedTokenAttributes?: boolean;
    token?: {
      extendedGrantTypes?: { [name: string]: any };
      accessTokenLifetime?: number;
      refreshTokenLifetime?: number;
      requireClientAuthentication?: boolean;
      allowExtendedTokenAttributes?: boolean;
    }
  };
  logger?: LoggerInstance;
  errors?: ErrorDefinitions;
}

# ts-framework

Configuration guide for the ts-framework.


### Configuring the Server

Start by extending the base Server. It's easy to control its behaviour by passing
a configuration object or importing it from a config file.

```typescript
import { Server, ServerOptions } from 'ts-framework';
import { StatusController } from './controllers';

export default class MainServer extends Server {
  constructor(options?: ServerOptions) {
    super({
      // Recommended: Start with the SimpleLogger to ease the debug process
      logger: Logger,
      port: process.env.PORT || 3000,
      router: {
        controllers: { status: StatusController },
      },
      ...options
    });
  }
} 
```

The main entrypoint for your application should be a **Server** instance exported as 
default. This enables the Server to be managed by the command line interface.

```bash
# Starts the development server
$ ts-framework watch ./api/server.ts
```



### Configuring the Database

The framework comes with a thin abstraction layer over some great database libraries:

#### [TypeORM](https://npmjs.org/package/typeorm)

```typescript
import Config from '../config';
import { Database } from 'ts-framework-sql';

export default class MainDatabase extends Database {
  constructor() {
    super({
      type: "postgres",
      logging: ["error"],
      host: process.env.DATABASE_HOST || "localhost",
      port: process.env.DATABASE_PORT || "5432",
      username: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASSWORD || "postgres",
      database: process.env.DATABASE_NAME || "test",

      // IMPORTANT: Path should be relative to root
      entities: ["./api/models/**/*.ts"],
      migrations: ["./api/migrations/**/*.ts"],
      cli: {
        // IMPORTANT: Path should be relative to root
        entitiesDir: "./api/models",
        migrationsDir: "./api/migrations"
      }
    })
  }
}
```

Now, you can bind the database initialization to the MainServer instance.

```typescript
import { Server, ServerOptions, Logger } from 'ts-framework/server';
import { StatusController } from './controllers/StatusController'
import MainDatabase from './database';

// Prepare the database to be connected later
const database = new MainDatabase();

export default class MainServer extends Server {
  constructor(options: ServerOptions) {
    super({
      // Recommended: Start with the SimpleLogger to ease the debug process
      logger: Logger,
      port: process.env.PORT || 3000,
      controllers: { status: StatusController },
      // Database will be initialized in the Server lifecycle
      children: [database],
      ...options
    });
  }
} 
```

<br />

#### [Mongoose ODM](https://npmjs.org/package/mongoose)

The goal of this layer is to provide a simple and consistent base class, that can be 
extended in the same way  as the **Server** was done in the last section. 

```typescript
import { Database } from 'ts-framework-mongo';

export default class MainDatabase extends Database {
  constructor() {
    super({ url: process.env.MONGO_URL || 'mongodb://localhost:27017/example' });
  }
}
```

Now, you can bind the database initialization to the MainServer instance.

```typescript
import { Server, ServerOptions, Logger } from 'ts-framework/server';
import { StatusController } from './controllers/StatusController'
import MainDatabase from './database';

// Prepare the database to be connected later
const database = new MainDatabase();

export default class MainServer extends Server {
  database: MainDatabase;

  constructor(options: ServerOptions) {
    super({
      // Recommended: Start with the SimpleLogger to ease the debug process
      logger: Logger,
      port: process.env.PORT || 3000,
      controllers: { status: StatusController },
      // Database will be initialized in the Server lifecycle
      children: [database],
      ...options
    });
  }
} 
```

<br />

## Writing your Application

### Controllers

A controller is a class that handles HTTP calls. This is achieved in the **Server**
using [express](https://npmjs.org/package/express), and is fully configurable using
experimental decorators.

```typescript
import * as Package from 'pjson';
import { Controller, Get } from "ts-framework";

@Controller('/status')
export default class StatusController {
  static STARTED_AT = Date.now();

  @Get('/')
  static getStatus(req, res) {
    res.success({
      name: Package.name,
      version: Package.version,
      environment: process.env.NODE_ENV || 'development',
      uptime: Date.now() - StatusController.STARTED_AT
    });
  }

}
```

This status controller example would produce this response when requested:

```
GET /status

{
  "name": "example",
  "version": "0.0.1",
  "environment": "production",
  "uptime": 1445563
}
```

### Middlewares

All requests can be intercepted using plain old Express middlewares. It provides
access to the application's request-response cycle.

```typescript
const requestLogger = (req: BaseRequest, res: BaseResponse, next: Function) => {
  // Logs a simple message every request
  console.log('New request!');
  console.log(req.originalUrl);

  // Continues with the request pipeline
  return next();
}
```

You can apply it in the controllers methods individually.

```typescript
import * as Package from 'pjson';
import { Controller, Get } from "ts-framework";

@Controller('/status')
export default class StatusController {
  static STARTED_AT = Date.now();

  // A list of middlewares for this method
  @Get('/', [requestLogger])
  static getStatus(req, res) {
    res.success({
      name: Package.name,
      version: Package.version,
      environment: process.env.NODE_ENV || 'development',
      uptime: Date.now() - StatusController.STARTED_AT
    });
  }

}
```

It can also be applied globally to the controller.

```typescript
import * as Package from 'pjson';
import { Controller, Get } from "ts-framework";

// A list of middlewares for this controller
@Controller('/status', [requestLogger])
export default class StatusController {
  static STARTED_AT = Date.now();

  @Get('/')
  static getStatus(req, res) {
    res.success({
      name: Package.name,
      version: Package.version,
      environment: process.env.NODE_ENV || 'development',
      uptime: Date.now() - StatusController.STARTED_AT
    });
  }

}
```

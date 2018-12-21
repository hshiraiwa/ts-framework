# ts-framework

Configuration guide for the ts-framework.


### Configuring the Server

The main entrypoint of your application is the **Server** instance. It wraps all other components
and exposes APIs for other modules to connect into it. The server is an abstration layer above the
Express server, to bind all the framework together in the Express initialization routine.


Start by extending the base Server. It's easy to control its behaviour by passing a configuration object 
or importing it from a config file.


```typescript
import { Server, ServerOptions } from 'ts-framework';
import { StatusController } from './controllers';

export default class MainServer extends Server {
  constructor(options?: ServerOptions) {
    super({
      port: process.env.PORT || 3000,
      router: {
        controllers: { StatusController },
      },
      ...options
    });
  }
} 
```

It's important to export the **Server** class as default, as the command line
tools expects it as default in the building, listening and console tools.


```bash
# Starts the server in development mode
$ ts-framework watch "./api/server.ts"

# Starts server and binds to its console
$ ts-framework console "./api/server.ts"

# Starts server in production mode with fewer logs
$ ts-framework listen "./api/server.ts"
```

**Running in Debug**

Start the development server in debug mode using the command line:

```bash
# The debugger will listen on localhost:9229
ts-framework --inspect="0.0.0.0:9229" watch "./api/server.ts"
```

Then, you can attach to the debugger using your favorite IDE. For example, using VSCode:

```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach",
  "port": 9229,
  "restart": true,
  "sourceMaps": true,
}
```


### Configuring the Database

The framework comes with a thin abstraction layer over some great database libraries:

#### [TypeORM](https://github.com/nxtep-io/ts-framework-sql)

```typescript
import Config from '../config';
import { Database } from 'ts-framework-sql';
import { User } from './models';

export default class MainDatabase extends Database {
  constructor() {
    super({
      connectionOptions: {
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
      port: process.env.PORT || 3000,
      controllers: { status: StatusController },
      // Database will be initialized in the Server lifecycle
      children: [database],
      ...options
    });
  }
} 
```

For more information, check the [nxtep-io/ts-framework-sql](https://github.com/nxtep-io/ts-framework-sql).

<br />

#### [Mongoose ODM](https://github.com/nxtep-io/ts-framework-mongo)

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

For more information, check the [nxtep-io/ts-framework-mongo](https://github.com/nxtep-io/ts-framework-mongo).

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

This status controller example would produce a simple health check response.

<details><summary>View response</summary>
<p>
  
```
GET /status

{
  "name": "example",
  "version": "0.0.1",
  "environment": "production",
  "uptime": 1445563
}
```

</p>
</details>


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

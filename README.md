ts-framework
============

[![Build Status](https://travis-ci.org/nxtep-io/ts-framework.svg?branch=master)](https://travis-ci.org/nxtep-io/ts-framework) &nbsp; [![Coverage Status](https://coveralls.io/repos/github/nxtep-io/ts-framework/badge.svg?branch=master)](https://coveralls.io/github/nxtep-io/ts-framework?branch=master)

A minimalistic framework for typescript based applications, with async/await and decorators support.


## Getting Started

### Beta Disclaimer

The current API is considered to be a "Beta Release" of the v2 branch. That means that small potentially breaking 
changes may still occur. Be sure to use a specific GIT_REV_HASH and a lock file in your project, so you won't be 
immediately affected by such a change.

For example:

```bash
# Install using Yarn
yarn add git+https://github.com/nxtep-io/ts-framework.git#GIT_REV_HASH 

# Install using NPM
npm install --save git+https://github.com/nxtep-io/ts-framework.git#GIT_REV_HASH 
``` 

### TL;DR - Using the command line generator

Configure a new Server instance and start listening on desired port. 

```bash
# Install command line tools from Github
$ yarn global add "nxtep-io/ts-framework-cli"

# Generate a new project
$ ts-framework new app "example/"

# Start project
$ cd example/
$ yarn start
```

You can also check a full project seed in the [Examples directory](./example) of this repository.

### Usage Guide

Follow the [Usage Guide](./GUIDE.md) for the basic boilerplate and a sample project configuration with
Database and user authentication samples.

Internal components:

- Router (backed by [Express](https://npmjs.org/package/express))
  - **Controllers:** Classes for handling API calls with decorators and async/await support
  - **Filters:** Middlewares for body validation, permission handling and other interception routines
  - **Responses:**: Simple wrappers over `res.status(code).json(result)` for success and error responses.
- Enhanced error handling in controllers, filters and middlewares
- Logger (backed by [winston](https://npmjs.org/package/winston))


External components available as built-in middlewares: 

- OAuth 2.0 (express-oauth2-server)
- Sentry (RavenJS)
- CORS (express/cors)
- Multipart (express/multer)
- User Agent (express-useragent and request-ip)
- Body Parser (express/body-parser)
- Method Override (express/method-override)
- Cookie Parser (express/cookie-parser)


Database providers (as external plugins):

- **[ts-framework-mongo](https://github.com/nxtep-io/ts-framework-mongo)**

    MongoDB database mapping layer based on MongooseJS.

- **[ts-framework-sql](https://github.com/nxtep-io/ts-framework-sql)**

    MySQL / Postgres database mapping layer based on Typeorm.


Database Utilities (as external plugins):

- **[ts-framework-migration](https://github.com/nxtep-io/ts-framework-migration)**

    Agnostic plugin for handling database migrations safely within production environments.
   

Other external plugins and middlewares for this framework:

- **[ts-framework-validation](https://github.com/nxtep-io/ts-framework-validation)**

    Minimalistic request body and param validator framework.

- **[ts-framework-notification](https://github.com/nxtep-io/ts-framework-notification)**

    Handles transactional notifications using SMTP (email templates), SMS (Twilio) and Firebase Messaging (push notifications).

- **[ts-framework-maintenance](https://github.com/nxtep-io/ts-framework-maintenance)**

    Maintenance mode middleware for blocking API requests temporarily.

- **[ts-framework-versioning](https://github.com/nxtep-io/ts-framework-versioning)**

    Handles API versioning using HTTP Headers.
 
- **[ts-framework-signing](https://github.com/nxtep-io/ts-framework-signing)**

    Handles API request signing based on HMAC SHA256 using HTTP Headers.

- **[ts-framework-sockets](https://github.com/nxtep-io/ts-framework-sockets)**

    Socket.io layer over the TS-Framework. Currently in public BETA.

- **[ts-framework-queue](https://github.com/nxtep-io/ts-framework-queue)**

    RabbitMQ based queue worker services based on RabbitMQ. Currently in public alpha.

- **ts-framework-cache (coming soon)**

    Redis based cache services for performance. Currently in closed alpha.


## Documentation

Start by our [Usage Guide](./GUIDE.md), to create your first project and components.

For the full reference, refer to the rendered TypeDocs: [https://nxtep-io.github.io/ts-framework/](https://nxtep-io.github.io/ts-framework/)

To generate the Typedoc reference of the available modules directly from source, run the following command:

```sh
yarn run docs
```

Then check the documentation at `./docs/index.html`.

## Command Line

The framework provides a set of command line tools for a enhanced development experience.

**Process manager**

Start the development server based on Nodemon with typescript support and live reload.

```bash
$ ts-framework watch
```

Start the workers without exposing the server port.

```bash
$ ts-framework run
```

Start the server in production mode

```bash
$ ts-framework listen
```

**REPL Console**

Start the interactive console in the current folder.

```bash
$ ts-framework console
```

**Generator**

Built upon a Yeoman generator, it helps scaffoldling new project directories and single components (controllers, jobs, services etc).

```bash
# Generates a new Application interactively
$ ts-framework new app

# Generates a new application in a new ./example folder
$ ts-framework new app "example"

# Generates a new TestController in ./api/controllers/TestController.ts
$ ts-framework new controller "test"

# Generates a new UptimeService in ./api/services/UptimeService.ts
$ ts-framework new service "uptime"
```

For more information, check the command line reference by running `ts-framework --help`.


## License

The project is licensed under the [MIT License](./LICENSE.md).

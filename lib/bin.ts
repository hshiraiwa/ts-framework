#!/usr/bin/env node --experimental-repl-await

/*
 * @deprecated The command line has moved to its own package.
 */
const { Logger } = require("ts-framework-common");
const logger = Logger.getInstance();
logger.error("The command line has moved to its own package");
logger.warn("Install it using Yarn or NPM: \n\n  $ yarn global add 'nxtep-io/ts-framework-cli'\n");

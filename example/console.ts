require('source-map-support').install();
require('reflect-metadata');

// Initialize new relic if enabled
if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

import MainServer from './api/MainServer';
import { ReplConsole } from '../lib';

const server = new MainServer({
  port: process.env.PORT || 3000,
  repl: new ReplConsole({}),
});

// Start listening for requests...
server.listen().catch((error) => {
  console.error(error);
  process.exit(1);
});

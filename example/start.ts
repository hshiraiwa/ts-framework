require('source-map-support').install();

import MainServer from "./api/MainServer";

new MainServer().listen().catch(error => {
  console.error(error);
  process.exit(-1);
});

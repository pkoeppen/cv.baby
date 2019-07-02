const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// Import and set config.
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV === 'local';

async function start() {
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;

  // Build only for local development.
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Trust NGINX.
  app.set('trust proxy', true);
  app.use(nuxt.render);

  // Start listening.
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();

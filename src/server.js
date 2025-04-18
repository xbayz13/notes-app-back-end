const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const startServer = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.events.on('log', (event, tags) => {
    if (tags.error) {
      console.error(
        `Server error: ${event.error ? event.error.message : 'unknown'}`
      );
    }
  });

  server.events.on('request', (request, event, tags) => {
    if (tags.error) {
      console.error(
        `Request error: ${event.error ? event.error.message : 'unknown'}`
      );
    }
  });

  server.route(routes);

  try {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (err) {
    console.error('Terjadi kesalahan saat memulai server: ', err);
    process.exit(1);
  }
};

startServer();

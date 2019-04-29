module.exports = ({ app, envVariables, logger, middleware, routes, bodyParser }) => {
  let server;

  return {
    start: () => {
      try {
        // not sure what benefit
        middleware.init();
        //move this out to middlewar
        app.use(bodyParser.json());
        routes.setupEndpoints(app);
        server = app.listen(envVariables.PORT, () => {
          logger.info(`Application listening on port ${server.address().port}`);
        });
        //add routes 
      } catch (error) {
        logger.error(error, 'Failed to start the server')
        process.exit(1);
      }
      return server;
    },
    stop: () => {
      try {
        server.close();
        logger.info('Shutting down the service gracefully');
      } catch (error) {
        logger.error(error, 'Forcing server to shut down');
        process.exit(1);
      }
    },
  };
};

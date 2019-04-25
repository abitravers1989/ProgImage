module.exports = ({ app, envVariables, logger, middleware }) => {
  let server;

  return {
    start: () => {
      try {
        // not sure what benefit
        middleware.init();
        server = app.listen(envVariables.PORT, () => {
          logger.info(`Application listening on port ${server.address().port}`);
        });
      } catch (error) {
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

module.exports = ({app, envVariables, logger, middleware}) => {
  let server;

  return {
    start: async () => {
      try {
        await middleware.init();

        server = app.listen(envVariables.PORT, () => {
          logger.info(`Application listening on ${server.address().port}`)
        })
      } catch (error) {
        process.exit(1)
      }
      return server
    }
  }
}
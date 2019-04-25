const serverFactory = require('./server');

describe('server', () => {
  const sandbox = sinon.createSandbox();

  const dependencies = {
    app: {
      listen: sandbox.stub(),
    },
    envVariables: {
      PORT: 3000,
    },
    logger: {
      info: sinon.spy(),
      error: sinon.spy(),
    },
    middleware: {
      init: sandbox.stub().resolves({}),
    },
  };

  const { app, middleware, envVariables, logger } = dependencies;
  const server = serverFactory(dependencies);

  before(() => sandbox.stub(process, 'exit'));

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('start', () => {
    let actualServer;
    const mockExpress = {
      address: () => ({
        PORT: envVariables.PORT,
      }),
    };

    beforeEach(() => {
      server.start();
    });

    it('initialises middleware', async () => {
      expect(middleware.init).to.have.been.called;
    });

    it('creates an express server on the correct port', async () => {
      expect(app.listen).to.have.been.calledWith(envVariables.PORT);
    });

    it('returns a server object', async () => {
      app.listen.returns(mockExpress);
      actualServer = server.start();
      expect(actualServer).to.equal(mockExpress);
    });

    it('logs the port the server has been started on', () => {
      app.listen.returns(mockExpress);
      server.start();
      app.listen.yield();

      expect(logger.info).to.have.been.called;
    });

    describe('when server creation fails', () => {
      beforeEach(async () => {
        app.listen.throws();
        server.start();
        expect(process.exit).to.have.been.calledWith(1);
        expect(logger.error).to.have.been.called;
      });
    });
  });

  describe('stop', () => {
    const mockExpress = {
      close: sandbox.stub().returns(null),
    };

    describe('when the server can be closed successfully', () => {
      it('closes the server', () => {
        app.listen.returns(mockExpress);
        server.start();
        server.stop();
        expect(mockExpress.close).to.have.been.called;
        expect(logger.info).to.have.been.called;
      });

      describe('when the server cannot be closed successfully', () => {
        it('exits the process', () => {
          const error = new Error('error');
          mockExpress.close.returns(error);
          server.start();
          server.stop();
          expect(process.exit).to.have.been.calledWith(1);
          expect(logger.error).to.have.been.called;
        });
      });
    });
  });
});

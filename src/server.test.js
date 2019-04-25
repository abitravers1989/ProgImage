const serverFactory = require('./server')

describe('server', () => {
  const sandbox = sinon.createSandbox();

  const dependencies = {
    app: {
      listen: sandbox.stub(),
      get: sandbox.stub(),
    },
    envVariables: {
      PORT: 3000
    },
    logger: {
      fatal: () => {},
      info: () => {},
      error: () => {},
    },
    middleware: { 
      init: sandbox.stub().resolves({}),
    }
  }

  const {app, middleware, envVariables} = dependencies
  const server = serverFactory(dependencies)

  before(() => sandbox.stub(process, 'exit'))

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('start', () => {
    let actualServer;
    const mockExpress = {
      address: () => ({
        PORT: dependencies.envVariables.PORT,
      })
    }

    it('initialises middleware', async () => {
      await server.start();
      expect(middleware.init).to.have.been.called
    })

    it('creates an express server on the correct port', async () => {
      app.listen.returns(mockExpress)
      actualServer = await server.start()
      expect(app.listen).to.have.been.calledWith(envVariables.PORT)
    })

    it('returns a server object', async () => {
      app.listen.returns(mockExpress)
      actualServer = await server.start()

    })

    describe('when server creation fails', () => {
      beforeEach(async () => {
        app.listen.throws()
        await server.start()
      })
    })
  })
})
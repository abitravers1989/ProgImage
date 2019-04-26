const { createSandbox } = require('sinon');
const { uniqueIDGenerator } = require('../container');
const imagesRoutesFactory = require('./images')

describe('routes/images', () => {
  const sandbox = createSandbox();

  const dependencies = {
    logger: {
      info: () => {},
      error: () => {},
    },
    imageManager: {
      getImage: {
        imageRetriever: {
          getImage: sandbox.stub(),
        }
      },
    },
  }

  const imagesRoute = imagesRoutesFactory(dependencies)
  const {imageManager} = dependencies

  const res = {
    status: sandbox.stub(),
    json: sandbox.stub()
  }

  afterEach(() => {
    sandbox.reset()
  })

  describe('/images', () => {
    describe('when :imageID is matched to a valid image', () => {
      it('returns a 200 and the valid image', () => {
        const imageID = uniqueIDGenerator()
        const expectedImage = '�.j�a/���K������-�KO>�W��&���aa�'

        imageManager.getImage.imageRetriever.getImage.resolves(expectedImage)

        imagesRoute.getImage(imageID, res, next)  
        
        expect(res.status).to.have.been.calledWithExactly(200)
        expect(res.json).to.have.been.calledWithExactly(expectedImage)
      })
    })
  })
})
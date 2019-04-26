const imageManagerFactory = require('./imageManager');
const { uniqueIDGenerator } = require('../container');

describe('image manager', () => {
  const sandbox = sinon.createSandbox();

  const dependencies = {
    imagePersister: {
      saveImage: sandbox.spy(),
    },
    imageRetriever: {
      getImage: sandbox.spy(),
    },
  };

  const { imagePersister, imageRetriever } = dependencies;
  const imageManager = imageManagerFactory(dependencies);

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('save image', () => {
    it('calls save functionality on the provided image persister', () => {
      const imageData = '�.j�a/���K������-�KO>�W��&���aa��@�,�+��E�.���U�b';

      imageManager.saveImage(imageData);

      expect(imagePersister.saveImage).to.have.been.calledWith(imageData);
    });
  });

  describe('get image', () => {
    it('calls get functionality on the provided image retriever', () => {
      const imageId = uniqueIDGenerator();

      imageManager.getImage(imageId);

      expect(imageRetriever.getImage).to.have.been.calledWith(imageId);
    });
  });
});

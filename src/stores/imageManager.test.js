const imageManagerFactory = require('./imageManager');
const { uniqueIDGenerator } = require('../container');

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

describe('image manager', () => {
  describe('save image', () => {
    it('calls save functionality on the provided persister', () => {
      const imageData = '�.j�a/���K������-�KO>�W��&���aa��@�,�+��E�.���U�b';

      imageManager.saveImage(imageData);

      expect(imagePersister.saveImage).to.have.been.calledWith(imageData);
    });
  });

  describe('get image', () => {
    it('calls save functionality on the provided persister', () => {
      const imageId = uniqueIDGenerator();

      imageManager.getImage(imageId);

      expect(imageRetriever.getImage).to.have.been.calledWith(imageId);
    });
  });
});

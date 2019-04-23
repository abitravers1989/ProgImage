const constants = require('../constants');
const { uniqueIDGenerator } = require('../../src/container');
// Factory pattern
const FileSystemImageRetrieverFactory = require('./fileSystemImagePesister');

const sandbox = sinon.createSandbox();

const dependencies = {
  fileSystem: {
    readFileSync: sandbox.spy(),
  },
  constants,
};

const { fileSystem } = dependencies;
const imageRetriever = FileSystemImageRetrieverFactory(dependencies);

describe('File system image Retriever', () => {
  describe('retrieveImage', () => {
    describe('when it retrieves the image successfully', () => {
      it('returns the image data which is stored under the provided ID', () => {
        const imageID = uniqueIDGenerator();
        
        imageRetriever.retrieveImage(imageID);

        expect(fileSystem.readFileSync).to.have.been.calledWith(imageID);
      });
    });
  });
});

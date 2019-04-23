const constants = require('../constants');
const { uniqueIDGenerator } = require('../../src/container');
// Factory pattern
const FileSystemImageRetrieverFactory = require('./fileSystemImageRetriever');

const sandbox = sinon.createSandbox();

const dependencies = {
  fileSystem: {
    readFileSync: sandbox.stub().returns('�.j�a/���K������-�KO>�W��&���aa�'),
  },
  constants,
};

const { fileSystem } = dependencies;
const imageRetriever = FileSystemImageRetrieverFactory(dependencies);

describe('File system image Retriever', () => {
  describe('retrieveImage', () => {
    describe('when it retrieves the image successfully', () => {
      it('reads the image data which is stored under the provided ID', () => {
        const imageID = uniqueIDGenerator();
        
        imageRetriever.retrieveImage(imageID);

        expect(fileSystem.readFileSync).to.have.been.calledWith(`${constants.IMAGESTOREPATH}/${imageID}`);
      });

      it('returns the image data which is stored under the provided ID', () => {
        const imageID = uniqueIDGenerator();
        
        const imageData = imageRetriever.retrieveImage(imageID);

        expect(imageData).to.equal('�.j�a/���K������-�KO>�W��&���aa�');
      });

    });
  });
});

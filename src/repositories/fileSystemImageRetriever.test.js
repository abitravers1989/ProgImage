const { uniqueIDGenerator, envVariables } = require('../container');
// Factory pattern
const FileSystemImageRetrieverFactory = require('./fileSystemImageRetriever');

const sandbox = sinon.createSandbox();

const dependencies = {
  fileSystem: {
    readFileSync: sandbox.stub().returns('�.j�a/���K������-�KO>�W��&���aa�'),
  },
  envVariables,
};

const { fileSystem } = dependencies;
const imageRetriever = FileSystemImageRetrieverFactory(dependencies);

describe('File system image retriever', () => {
  describe('getImage', () => {
    describe('when it retrieves the image successfully', () => {
      it('reads the image data which is stored under the provided ID', () => {
        const imageID = uniqueIDGenerator();

        imageRetriever.getImage(imageID);

        expect(fileSystem.readFileSync).to.have.been.calledWith(
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
        );
      });

      it('returns the image data which is stored under the provided ID', () => {
        const imageID = uniqueIDGenerator();

        const imageData = imageRetriever.getImage(imageID);

        expect(imageData).to.equal('�.j�a/���K������-�KO>�W��&���aa�');
      });
    });
  });
});


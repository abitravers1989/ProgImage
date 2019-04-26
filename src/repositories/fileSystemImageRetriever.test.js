const { uniqueIDGenerator, envVariables } = require('../container');
const FileSystemImageRetrieverFactory = require('./fileSystemImageRetriever');

describe('File system image retriever', () => {
  const sandbox = sinon.createSandbox();

  const dependencies = {
    fileSystem: {
      readFileSync: sandbox.stub().returns('�.j�a/���K������-�KO>�W��&���aa�'),
    },
    envVariables,
    validator: {
      isUUID: sandbox.stub().returns(true),
    },
  };

  const { fileSystem } = dependencies;
  const imageRetriever = FileSystemImageRetrieverFactory(dependencies);

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('getImage', () => {
    describe('when it retrieves the image successfully', () => {
      const imageID = uniqueIDGenerator();
      const imageData = imageRetriever.getImage(imageID);

      it('reads the image data which is stored under the provided ID', () => {
        expect(fileSystem.readFileSync).to.have.been.calledWith(
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
        );
      });

      it('returns the image data which is stored under the provided ID', () => {
        expect(imageData).to.equal('�.j�a/���K������-�KO>�W��&���aa�');
      });
    });

    describe('when an imageID is not valid', () => {
      it('throws an error if no image ID is provided', () => {
        expect(() => imageRetriever.getImage()).to.throw(
          'No image ID has been provided',
        );
      });

      it('throws an error if the image ID parameter passed is not a uuid', () => {
        const newDependencies = {
          ...dependencies,
          validator: {
            isUUID: sandbox.stub().returns(false),
          },
        };

        FileSystemImageRetrieverFactory(newDependencies);
        const incorrectImageID = '33333';
        expect(() => imageRetriever.getImage(incorrectImageID)).to.throw(
          'A valid image ID must be provided',
        );
      });
    });
  });
});

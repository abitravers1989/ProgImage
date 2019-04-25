const { envVariables } = require('../container');
// Factory pattern
const fileSystemImagePesisterFactory = require('./fileSystemImagePesister');

describe('File system image pesister', () => {
  const sandbox = sinon.createSandbox();
  const uuid = 'c2028c2f-178e-4b8c-8c24-02d94e32d17f';

  const dependencies = {
    fileSystem: {
      writeFileSync: sandbox.spy(),
    },
    uniqueIDGenerator: sandbox.stub().returns(uuid),
    envVariables,
  };

  const { fileSystem, uniqueIDGenerator } = dependencies;
  const imagePesister = fileSystemImagePesisterFactory(dependencies);

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('saveImage', () => {
    describe('when it saves the image successfully', () => {
      const imageData =
        '�.j�a/���K������-�KO>�W��&���aa��@�,�+��E�.���U�b��!�$X';
      const imageId = imagePesister.saveImage(imageData);

      it('writes the data to the supplied folder labeling it with a unique id', () => {
        expect(fileSystem.writeFileSync).to.have.been.calledWith(
          `${envVariables.IMAGESTOREPATH}/${uuid}`,
          imageData,
        );
      });

      it('returns the unique identifier the images is saved as', () => {
        expect(uniqueIDGenerator).to.have.been.called;
        expect(imageId).to.equal(uuid);
      });
    });

    describe('when an image is not valid', () => {
      it('throws an error if no image is provided', () => {
        expect(() => imagePesister.saveImage()).to.throw(
          'No image is provided',
        );
      });

      xit('throws an error if image input is not an image', () => {
        const image = 'image';

        expect(() => imagePesister.saveImage(image)).to.throw(
          'Not type of image',
        );
      });
    });
  });
});

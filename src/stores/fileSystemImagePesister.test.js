const sandbox = sinon.createSandbox();
const constants = require('../constants');
const uuid = 'c2028c2f-178e-4b8c-8c24-02d94e32d17f';

// Factory pattern
const imagePesisterFactory = require('./fileSystemImagePesister');

const dependencies = {
  fileSystem: {
    writeFileSync: sandbox.spy(),
  },
  uniqueIDGenerator: sandbox.stub().returns(uuid),
  constants,
};

const { fileSystem, uniqueIDGenerator } = dependencies;
const imagePesister = imagePesisterFactory(dependencies);

describe('Image Pesister', () => {
  describe('saveImage', () => {
    describe('when it saves the image successfully', () => {
      const imageData =
        '�.j�a/���K������-�KO>�W��&���aa��@�,�+��E�.���U�b��!�$X';
      const imageId = imagePesister.saveImage(imageData);

      it('saves the image data to the supplied folder within the local file system', () => {
        expect(fileSystem.writeFileSync).to.have.been.calledWith(
          `${constants.IMAGESTOREPATH + uuid}`,
          imageData,
        );
      });

      it('saves the image with a unique identifier', () => {});

      it('returns the unique identifier the images is saved under', () => {
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

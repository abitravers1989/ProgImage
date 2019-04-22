const { uniqueIDGenerator } = require('../../src/container');
const { fileSystem } = require('../../src/container');
const constants = require('../../src/constants');

const dependencies = {
  fileSystem,
  uniqueIDGenerator,
  constants,
};

const imagePesisterFactory = require('../../src/stores/fileSystemImagePesister');

const imagePesister = imagePesisterFactory(dependencies);

describe('File system image pesister', () => {
  describe('saving an image', () => {
    describe('when given an image to save with a jpeg file extension', () => {
      it('saves the image data as provided', () => {
        const imagePath = `${__dirname}/testObjects/testImagejpeg.jpeg`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = imagePesister.saveImage(imageData);

        const savedImage = fileSystem.readFileSync(
          `${constants.IMAGESTOREPATH}/${imageID}`,
        );
        expect(savedImage).to.be.instanceof(Buffer);
      });
    });

    describe('when given an image to save with a png file extension', () => {
      it('saves the image data as provided', () => {
        const imagePath = `${__dirname}/testObjects/testImagepng.png`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = imagePesister.saveImage(imageData);

        const savedImage = fileSystem.readFileSync(
          `${constants.IMAGESTOREPATH}/${imageID}`,
        );
        expect(savedImage).to.be.instanceof(Buffer);
      });
    });

    describe('when given an image to save with a pdf file extension', () => {
      it('saves the image data as provided', () => {
        const imagePath = `${__dirname}/testObjects/testImagepdf.pdf`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = imagePesister.saveImage(imageData);

        const savedImage = fileSystem.readFileSync(
          `${constants.IMAGESTOREPATH}/${imageID}`,
        );
        expect(savedImage).to.be.instanceof(Buffer);
      });
    });

    describe('when given an image to save with no file extension', () => {
      it('saves the data as provided', () => {
        const imagePath = `${__dirname}/testObjects/testImageData`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = imagePesister.saveImage(imageData);

        const savedImage = fileSystem.readFileSync(
          `${constants.IMAGESTOREPATH}/${imageID}`,
        );
        expect(savedImage).to.be.instanceof(Buffer);
      });
    });
  });
});

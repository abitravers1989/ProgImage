const { uniqueIDGenerator } = require('../../src/container');
const { fileSystem } = require('../../src/container');
const constants = require('../../src/constants');

describe('File system image pesister', () => {
  const dependencies = {
    fileSystem,
    uniqueIDGenerator,
    constants,
  };
  const fileSystemImagePesisterFactory = require('../../src/stores/fileSystemImagePesister');
  const imagePesister = fileSystemImagePesisterFactory(dependencies);

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

describe('File system image retriever', () => {
  const dependencies = {
    fileSystem,
    constants,
  };
  const fileSystemImageRetriverFactory = require('../../src/stores/fileSystemImageRetriver');
  const imageRetriever = fileSystemImageRetriverFactory(dependencies);

  it('returns the image stored at the given id', () => {
    const imageID = '0a8d5e31-af5c-49ad-9284-706946f74dcd';

    const retrievedImage = imageRetriever.retrieveImage(imageID);

    //to exist?
    //toBeDefined 
    expect(retrievedImage).to.be.true;
  })
})

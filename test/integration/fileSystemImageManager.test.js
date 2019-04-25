const { uniqueIDGenerator } = require('../../src/container');
const {
  fileSystem,
  fileSystemImagePesister,
  fileSystemImageRetriever,
  envVariables,
} = require('../../src/container');

describe('File system image pesister', () => {
  const dependencies = {
    fileSystem,
    uniqueIDGenerator,
    envVariables,
  };

  const imagePesister = fileSystemImagePesister(dependencies);

  describe('saving an image', () => {
    describe('when given an image to save with a jpeg file extension', () => {
      it('saves the image data as provided', () => {
        const imagePath = `${__dirname}/testObjects/testImagejpeg.jpeg`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = imagePesister.saveImage(imageData);
        const savedImage = fileSystem.readFileSync(
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
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
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
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
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
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
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
        );

        expect(savedImage).to.be.instanceof(Buffer);
      });
    });
  });
});

describe('File system image retriever', () => {
  const dependencies = {
    fileSystem,
    envVariables,
  };

  const imageRetriever = fileSystemImageRetriever(dependencies);

  it('returns the image stored at the given id', () => {
    const imageID = '0a8d5e31-af5c-49ad-9284-706946f74dcd';

    const retrievedImage = imageRetriever.getImage(imageID);

    expect(retrievedImage).to.be.instanceof(Buffer);
  });
});

const {
  fileSystem,
  uniqueIDGenerator,
  envVariables,
  validator,
  fileSystemImagePesister,
  fileSystemImageRetriever,
  imageManager,
} = require('../../src/container');

describe('file system image manager', () => {
  const imagePesisterDependencies = {
    fileSystem,
    uniqueIDGenerator,
    envVariables,
  };
  const imagePesister = fileSystemImagePesister(imagePesisterDependencies);

  const ImageRetrieverDependencies = {
    fileSystem,
    envVariables,
    validator,
  };

  const imageRetriever = fileSystemImageRetriever(ImageRetrieverDependencies);
  // try one also with the dependencies going in the wrong way
  const fileSystemImageManager = imageManager({
    imagePesister,
    imageRetriever,
  });

  describe('saving an image to local file system', () => {
    describe('when given an image to save with a jpeg file extension', () => {
      it('saves the image data as provided and returns a the uuid it is saved under', () => {
        const imagePath = `${__dirname}/testObjects/testImagejpeg.jpeg`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = fileSystemImageManager.saveImage(imageData);
        const savedImage = fileSystem.readFileSync(
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
        );

        expect(savedImage).to.be.instanceof(Buffer);
        expect(imageID).to.be.uuid('v4');
      });
    });

    describe('when given an image to save with a png file extension', () => {
      it('saves the image data as provided and returns a the uuid it is saved under', () => {
        const imagePath = `${__dirname}/testObjects/testImagepng.png`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = fileSystemImageManager.saveImage(imageData);
        const savedImage = fileSystem.readFileSync(
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
        );

        expect(savedImage).to.be.instanceof(Buffer);
        expect(imageID).to.be.uuid('v4');
      });
    });

    describe('when given an image to save with a pdf file extension', () => {
      it('saves the image data as provided and returns a the uuid it is saved under', () => {
        const imagePath = `${__dirname}/testObjects/testImagepdf.pdf`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = fileSystemImageManager.saveImage(imageData);
        const savedImage = fileSystem.readFileSync(
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
        );

        expect(savedImage).to.be.instanceof(Buffer);
        expect(imageID).to.be.uuid('v4');
      });
    });

    describe('when given an image to save with no file extension', () => {
      it('saves the data as provided', () => {
        const imagePath = `${__dirname}/testObjects/testImageData`;
        const imageData = fileSystem.readFileSync(imagePath);

        const imageID = fileSystemImageManager.saveImage(imageData);
        const savedImage = fileSystem.readFileSync(
          `${envVariables.IMAGESTOREPATH}/${imageID}`,
        );

        expect(savedImage).to.be.instanceof(Buffer);
        expect(imageID).to.be.uuid('v4');
      });

      describe('when no image is provided', () => {
        it('throws an error and does not save anything', () => {
          // need to handle this error in image manager 
          expect(() => fileSystemImageManager.saveImage(imageData)).to.throw('imageData is not defined')
        })
      })
    });    
  });

  describe('retrieving an image from the local file system', () => {
    describe('when a valid image ID is provided', () => {
      it('returns the image stored at the given id', () => {
        const imageID = '0a8d5e31-af5c-49ad-9284-706946f74dcd';
        const retrievedImage = fileSystemImageManager.getImage(imageID);
    
        expect(retrievedImage).to.be.instanceof(Buffer);
      });
    })

    describe('when an invalid image ID is provided', () => {
      it('throws an error if image ID is not a uuid', () => {
        const invalidImageID = '0a8d5e';
  
        expect(() => imageRetriever.getImage(invalidImageID)).to.throw(
          'A valid image ID must be provided',
        );
      });
    });

  })
});

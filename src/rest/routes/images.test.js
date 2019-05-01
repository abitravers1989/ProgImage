const { createSandbox } = require('sinon');
const { uniqueIDGenerator } = require('../../container');
const imagesRoutesFactory = require('./images');

describe('routes/images', () => {
  const sandbox = createSandbox();

  const dependencies = {
    logger: {
      error: sandbox.spy(),
    },
    fileSystemImageRetriever: {
      getImage: sandbox.stub(),
    },
    // fileSystemImagePersister: {},
  };

  const imagesRoute = imagesRoutesFactory(dependencies);
  const { fileSystemImageRetriever, logger } = dependencies;

  const res = {
    status: sandbox.stub(),
    json: sandbox.stub(),
    send: sandbox.stub(),
  };

  afterEach(() => {
    sandbox.reset();
  });

  beforeEach(() => {
    res.status.returnsThis();
  });

  describe('when the given imageID is matched to a valid stored image', () => {
    // eg http://localhost:3000/getImage?imageID=dd301786-9b3a-4972-8be6-e77f2763eaf2
    it('returns a 200 and the valid image', () => {
      const imageID = uniqueIDGenerator();
      const req = {
        query: {
          imageID,
        },
      };
      const expectedImage = '�.j�a/���K������-�KO>�W��&���aa�';

      fileSystemImageRetriever.getImage.returns(expectedImage);

      imagesRoute.getImage(req, res);

      expect(fileSystemImageRetriever.getImage).to.have.been.calledWithExactly(
        imageID,
      );
      expect(res.status).to.have.been.calledWithExactly(200);
      expect(res.json).to.have.been.calledWithExactly(expectedImage);
    });
  });

  describe('when the call to the file system fails', () => {
    describe('when no imageID is provided', () => {
      // e.g, http://localhost:3000/getImage?imageID=
      it('returns a 400 with an error message', () => {
        const req = {
          query: {
            imageID: '',
          },
        };

        const error = new Error('No image ID has been provided.');

        fileSystemImageRetriever.getImage.throws(error);
        imagesRoute.getImage(req, res);

        expect(
          fileSystemImageRetriever.getImage,
        ).to.have.been.calledWithExactly(req.query.imageID);
        expect(logger.error).to.have.been.calledWithExactly(
          'No image ID has been provided.',
        );
        expect(res.status).to.have.been.calledWithExactly(400);
        expect(res.send).to.have.been.calledWithExactly(
          'No image ID has been provided.',
        );
      });
    });

    describe('when the given imageID does not match a stored image', () => {
      // eg. http://localhost:3000/getImage?imageID=dd301786-9b3a-4972-89e6-e77f2763eaf2
      it('returns a 400 and an error message', () => {
        const imageID = uniqueIDGenerator();
        const req = {
          query: {
            imageID,
          },
        };

        const error = new Error(
          'There is no image at the provided ID, please ensure it is correct.',
        );

        fileSystemImageRetriever.getImage.throws(error);
        imagesRoute.getImage(req, res);

        expect(
          fileSystemImageRetriever.getImage,
        ).to.have.been.calledWithExactly(req.query.imageID);
        expect(logger.error).to.have.been.calledWithExactly(
          'There is no image at the provided ID, please ensure it is correct.',
        );
        expect(res.status).to.have.been.calledWithExactly(400);
        expect(res.send).to.have.been.calledWithExactly(
          'There is no image at the provided ID, please ensure it is correct.',
        );
      });
    });

    describe('when the given imageID is not a uuid', () => {
      // eg. http://localhost:3000/getImage?imageID=randomstring
      it('returns a 400 and an error message', () => {
        const imageID = 'randomString';
        const req = {
          query: {
            imageID,
          },
        };

        const error = new Error('A valid image ID must be provided.');
        fileSystemImageRetriever.getImage.throws(error);
        imagesRoute.getImage(req, res);

        expect(
          fileSystemImageRetriever.getImage,
        ).to.have.been.calledWithExactly(req.query.imageID);
        // returns There is no image at the provided ID, please ensure it is correct
        expect(logger.error).to.have.been.calledWithExactly(
          'A valid image ID must be provided.',
        );
        expect(res.status).to.have.been.calledWithExactly(400);
        expect(res.send).to.have.been.calledWithExactly(
          'A valid image ID must be provided.',
        );
      });
    });
  });
});

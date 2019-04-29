const { createSandbox } = require('sinon');
const { uniqueIDGenerator } = require('../../container');
const imagesRoutesFactory = require('./images');

describe.only('routes/images', () => {
  const sandbox = createSandbox();

  const dependencies = {
    logger: {
      // info: () => {},
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

  describe.only('/images', () => {
    beforeEach(() => {
      res.status.returnsThis();
    });
    describe('when the given imageID is matched to a valid stored image', () => {
      // beforeEach(() => {
      //   res.status.returnsThis();
      // });

      it('returns a 200 and the valid image', async () => {
        const imageID = uniqueIDGenerator();
        const req = {
          query: {
            imageID,
          },
        };
        const expectedImage = '�.j�a/���K������-�KO>�W��&���aa�';

        fileSystemImageRetriever.getImage.resolves(expectedImage);

        await imagesRoute.getImage(req, res);

        expect(
          fileSystemImageRetriever.getImage,
        ).to.have.been.calledWithExactly(imageID);
        expect(res.status).to.have.been.calledWithExactly(200);
        expect(res.json).to.have.been.calledWithExactly({
          returnImage: expectedImage,
        });
      });
    });
    describe('when no imageID is provided', () => {
      // e.g, http://localhost:3000/getImage?imageID=
      it.only('returns a 404 with an error message', async () => {
        const req = {
          query: {
            imageID: '',
          },
        };

        const error = new Error('No image ID has been provided');

        //how to stop this error throwing within the file????
        fileSystemImageRetriever.getImage.throws(error);
        await imagesRoute.getImage(req, res);

        expect(
          fileSystemImageRetriever.getImage,
        ).to.have.been.calledWithExactly(req.query.imageID);
        expect(logger.error).to.have.been.calledWithExactly(
          'No image ID has been provided',
        );
        expect(res.status).to.have.been.calledWithExactly(404);
        expect(res.send).to.have.been.calledWithExactly(
          'No image ID has been provided',
        );
      });
    });

    // eg. http://localhost:3000/getImage?imageID=dd301786-9b3a-4972-89e6-e77f2763eaf2
    describe('when the given imageID does not match a stored image', () => {
      it('returns a 404 and an error message', () => {
        fileSystemImageRetriever.getImage.resolves('');

        // returns There is no image at the provided ID, please ensure it is correct
      });
    });
    describe('when the call to the file system fails', () => {
      // describe('when the image ID is invalid', () => {
      it('logs the error', () => {});
      // ???
      it('passes the error to next....', () => {});

      // })
    });
  });
});

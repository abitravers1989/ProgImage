const transformImageFactory = require('./transformImage');

describe('Image transformer', () => {
  const sandbox = sinon.createSandbox();
  const dependencies = {
    sharp: sandbox.stub().returns({
      toFormat: sandbox.stub().returns({
        toBuffer: sinon.spy(),
      }),
    }),
  };

  const transformImage = transformImageFactory(dependencies);
  const { sharp } = dependencies;

  afterEach(() => sandbox.reset());

  after(() => sandbox.restore());

  describe('convertImage', () => {
    it('formats the image to the desired image extension', async () => {
      const desiredImageExtension = 'jpeg';
      const imageToBeTransformed = '[37, 2666, 78, 00, 33]';

      await transformImage.convertImage(
        imageToBeTransformed,
        desiredImageExtension,
      );

      expect(sharp).to.have.been.calledWithExactly(imageToBeTransformed);
      // TODO change this to yields and make sharp return these functions.. testing an expression
      const { toFormat } = sharp();
      expect(toFormat).to.have.been.calledWithExactly(desiredImageExtension);
      const { toBuffer } = sharp().toFormat();
      expect(toBuffer).to.have.been.called;
    });

    describe('when no image is provided', () => {
      it('throws an error', async () => {
        const desiredImageExtension = 'jpeg';
        const imageToBeTransformed = undefined;

        await expect(transformImage.convertImage(
            imageToBeTransformed,
            desiredImageExtension,
          )).to.be.rejected;
      });
      describe('when the wrong desired image extension is given', () => {
        it('throws an error', async () => {
          const desiredImageExtension = 'svg';
          const imageToBeTransformed = '[37, 2666, 78, 00, 33]';

          await expect(transformImage.convertImage(
            imageToBeTransformed,
            desiredImageExtension,
          )).to.be.rejected;
        });
      });
    });
  });
});

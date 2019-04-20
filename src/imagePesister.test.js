const sandbox = sinon.createSandbox();

//Factory pattern
const imagePesisterFactory = require('./imagePesister');

const uuid = 'c2028c2f-178e-4b8c-8c24-02d94e32d17f';

const dependencies = {
  fileSystem: {
    writeFileSync: sandbox.spy()
  },
  uuidv4: sandbox.stub().returns(uuid),
}
const imagePesister = imagePesisterFactory(dependencies);

describe('Image Pesister', () => {
  describe('saveImage', () => {
    describe('when it saves the image successfully', () => {
      const imageData = '�.j�a/���K������-�KO>�W��&�\��aa��@�,�+��E�.���U�b��!�$X��%���(DR�;�gf�bQgd�O��';
      const imageUuid = imagePesister.saveImage(imageData);

      it('reads the image from the path provided', () => { 
        expect(dependencies.fileSystem.writeFileSync).to.have.been.calledWith('savedImage', imageData);
      });

      it('saves the image with a unique identifier', () => {});

      it('returns a unique ID', () => {
        expect(dependencies.uuidv4).to.have.been.called;
        expect(imageUuid).to.equal(uuid);
      });
    });

    describe('when an image is not valid', () => {
      it('throws an error if no image is provided', () => {
        expect(() => imagePesister.saveImage()).to.throw('No image is provided');
      });
  
      xit('throws an error if image input is not an image', () => {
        const image = 'image';
        expect(() => imagePesister.saveImage(image)).to.throw('Not type of image');
      });
    });
  });
});
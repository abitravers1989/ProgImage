//const uuidv4 = require('uuid/v4');

const sandbox = sinon.createSandbox();

//Factory pattern
const imagePesisterFactory = require('./imagePesister');
const dependencies = {
  uuidv4: sandbox.spy(),
}
const imagePesister = imagePesisterFactory(dependencies);

describe('Image Pesister', () => {
  describe('saveImage', () => {
    it('throws an error if no image is provided', () => {

      expect(() => imagePesister.saveImage()).to.throw('No image is provided');
    });

    xit('throws an error if image input is not an image', () => {
      const image = 'image';
      expect(() => imagePesister.saveImage()).to.throw('Not type of image');
    });

    it('saves the image successfully', () => {

    });

    it('returns a unique ID, even when saving the same image twice', () => {
      const image = 'image';
      imagePesister.saveImage(image);
    
      expect(dependencies.uuidv4).to.have.been.called;
      //integration test?
      // const firsSave = imagePesister.saveImage(image);
      // const secondSave = imagePesister.saveImage(image);
      // expect(firsSave).to.be.a.uuid('v4');
      // expect(firsSave).to.not.equal(secondSave);
      
    });
  });
});
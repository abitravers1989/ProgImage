const chai = require('chai');
const uuidv4 = require('uuid/v4');

const expect = chai.expect
chai.use(require('chai-uuid'));

//Factory pattern
const imagePesisterFactory = require('./imagePesister');
const dependencies = {
  uuidv4
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
      const firsSave = imagePesister.saveImage(image);
      const secondSave = imagePesister.saveImage(image);

      expect(firsSave).to.be.a.uuid('v4');
      expect(firsSave).to.not.equal(secondSave);
    });
  });
});
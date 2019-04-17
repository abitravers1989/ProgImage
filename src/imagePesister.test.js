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

    it('throws an error if image input is not an image', () => {
      const image = 'image';
      expect(() => imagePesister.saveImage()).to.throw('Not type of image');
    });

    it('saves the image successfully', () => {

    });

    it('returns a unique ID', () => {
      // expect it returns a typeOf uuid 
      const image = 'image';
      expect(imagePesister.saveImage(image)).to.be.a.uuid('v4');

      // does not return the same ID twice
    });
  });
});
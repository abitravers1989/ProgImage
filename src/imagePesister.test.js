const chai = require('chai');
const uuidv4 = require('uuid/v4');
const expect = chai.expect

//Factory pattern
const imagePesisterFactory = require('./imagePesister');
const dependencies = {
  uuidv4
}
const imagePesister = imagePesisterFactory(dependencies);

describe('Image Pesister', () => {
  describe('saveImage', () => {
    it('saves the image successfully', () => {

    });
    it('returns a unique ID', () => {
      // expect it returns a typeOf uuid 
      expect(imagePesister.saveImage()).to.equal()

      // does not return the same ID twice
    });
  });
});
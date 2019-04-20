//const { uuidv4 } = require('../../src/container');
const { fileSystem } = require('../../src/container');
//console.log('----->fsTEST', fileSystem.readFile)
const sandbox = sinon.createSandbox();

const uuid = 'c2028c2f-178e-4b8c-8c24-02d94e32d17f';

const dependencies = {
  fileSystem,
  uuidv4: sandbox.stub().returns(uuid)
}

const imagePesisterFactory = require('../../src/stores/fileSystemImagePesister');
const imagePesister = imagePesisterFactory(dependencies);


describe('image pesister', () => {
  describe('saveImage', () => {
    xit('saves the given image data to the local file system', () => {
      const imagePath = __dirname + '/testObjects/testImageData';
      const imageData = fileSystem.readFileSync(imagePath);

      const imageUUID = imagePesister.saveImage(imageData); 

      console.log('----->imageUUID', imagePesister.saveImage(imageData))
      
      //expect it to return a bytes array which can be viewed as the orginal image when correct extension added
     
    });
  
    it('returns a unique identifier upon successful completion of the image', () => {
      const imagePath = __dirname + '/testObjects/testImageData';
      const imageData = fileSystem.readFileSync(imagePath);

      const imageUUID = imagePesister.saveImage(imageData); 

      console.log('----->imageUUID', imagePesister.saveImage(imageData))
      expect(imageUUID).to.equal(uuid)
    });

    it('saves the image at a path the same as the unique identifier', () => {});
  });
})
//pass in constants file / config which has fold path name for where to save images
module.exports = ({fileSystem, uuidv4}) => ({
  saveImage: (imageData) => {
    //add some image validation and refactor this out
    if(!imageData) throw new Error('No image is provided')
  // benefits of making this a promise?
    try {
      fileSystem.writeFileSync('savedImage', imageData);   
    } catch(error) {
      console.log('Issue saving file', error)
    }
    return uuidv4();  
  },
 
});
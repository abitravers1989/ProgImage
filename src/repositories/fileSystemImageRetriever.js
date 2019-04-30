module.exports = ({ fileSystem, envVariables, validator }) => ({
  getImage: imageID => {
    console.log('----->1')
    console.log('----->imageID', imageID)
    if (!imageID) throw new Error('No image ID has been provided.');
    if (!validator.isUUID(imageID))
      throw new Error('A valid image ID must be provided.');
    console.log('----->2') 
    // const desiredImage = fileSystem.readFileSync(`${envVariables.IMAGESTOREPATH}/${imageID}`);
    // if(!desiredImage) throw new Error('There is no image at the provided ID, please ensure it is correct.');
    return fileSystem.readFileSync(`${envVariables.IMAGESTOREPATH}/${imageID}`);
  },
});

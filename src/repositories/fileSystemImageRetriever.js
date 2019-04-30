module.exports = ({ fileSystem, envVariables, validator }) => ({
  getImage: imageID => {
    console.log('----->1')
    console.log('----->imageID', imageID)
    if (!imageID) throw new Error('No image ID has been provided.');
    if (!validator.isUUID(imageID))
      throw new Error('A valid image ID must be provided.');
    console.log('----->2') 
    return fileSystem.readFileSync(`${envVariables.IMAGESTOREPATH}/${imageID}`);
  },
});

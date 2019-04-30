module.exports = ({ fileSystem, envVariables, validator }) => ({
  getImage: imageID => {
    if (!imageID) throw new Error('No image ID has been provided.');
    if (!validator.isUUID(imageID))
      throw new Error('A valid image ID must be provided.'); 
    return fileSystem.readFileSync(`${envVariables.IMAGESTOREPATH}/${imageID}`);
  },
});

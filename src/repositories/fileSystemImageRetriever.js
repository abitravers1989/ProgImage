module.exports = ({ fileSystem, envVariables, validator }) => ({
  getImage: imageID => {
    if (!imageID) throw new Error('No image ID has been provided.');
    if (!validator.isUUID(imageID))
      throw new Error('A valid image ID must be provided.');
    let desiredImage;
    try {
      desiredImage = fileSystem.readFileSync(`${envVariables.IMAGE_STORE_PATH}/${imageID}`);
    } catch (error) {
      throw new Error('There is no image at the provided ID, please ensure it is correct.');
    }
    return desiredImage;
  },
});

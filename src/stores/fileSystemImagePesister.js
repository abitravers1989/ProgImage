module.exports = ({ fileSystem, uniqueIDGenerator, constants }) => ({
  saveImage: imageData => {
    // add some image validation and refactor this out
    // this is an uncaught error
    if (!imageData) throw new Error('No image is provided');
    // benefits of making this a promise?
    const imageID = uniqueIDGenerator();
    // if(!constants.IMAGESTOREPATH) throw new Error('Folder for image to be saved to must be provided')
    try {
      if (!constants.IMAGESTOREPATH)
        throw new Error('Folder for image to be saved to must be provided');
      fileSystem.writeFileSync(
        `${constants.IMAGESTOREPATH}/${imageID}`,
        imageData,
      );
    } catch (error) {
      console.error('Error', error);
    }
    return imageID;
  },
});

// how to get the file extension:
// .split('.').pop().toLowerCase()
module.exports = ({ fileSystem, uniqueIDGenerator, constants }) => ({
  saveImage: imageData => {
    // add some image validation and refactor this out
    if (!imageData) throw new Error('No image is provided');
    // benefits of making this a promise?
    const imageID = uniqueIDGenerator();
    try {
      fileSystem.writeFileSync(
        `${constants.IMAGESTOREPATH}/${imageID}`,
        imageData,
      );
    } catch (error) {
      console.log('Issue saving file', error);
    }
    return imageID;
  },
});

// how to get the file extension:
// .split('.').pop().toLowerCase()
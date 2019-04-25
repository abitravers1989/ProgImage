module.exports = ({ fileSystem, uniqueIDGenerator, envVariables }) => {
  return {
  saveImage: imageData => {
    // add some image validation and refactor this out
    // this is an uncaught error
    if (!imageData) throw new Error('No image is provided');
    // this error needs to be handled by the image manager
    
    // benefits of making this a promise?
    const imageID = uniqueIDGenerator();
    // try {
    // this error should instead be handled in image manager
    fileSystem.writeFileSync(
      `${envVariables.IMAGESTOREPATH}/${imageID}`,
      imageData,
    );
    // } catch (error) {
    //   console.error('Error', error);
    // }
    return imageID;
  },
}
};

// how to get the file extension:
// .split('.').pop().toLowerCase()

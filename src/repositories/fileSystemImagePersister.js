module.exports = ({ fileSystem, uniqueIDGenerator, envVariables }) => ({
  saveImage: imageData => {
    // add some image validation and refactor this out
    // this is an uncaught error at the min .. need to catch this error in route and return it
    if (!imageData) throw new Error('No image is provided');
    // benefits of making this a promise?
    const imageID = uniqueIDGenerator();
    // try {
    // this error should instead be handled in ROUTE so can return error?
    fileSystem.writeFileSync(
      `${envVariables.IMAGESTOREPATH}/${imageID}`,
      imageData,
    );
    // } catch (error) {
    //   console.error('Error', error);
    // }
    return imageID;
  },
});

// how to get the file extension:
// .split('.').pop().toLowerCase()

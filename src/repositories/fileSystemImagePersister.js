module.exports = ({ fileSystem, uniqueIDGenerator, envVariables }) => ({
  saveImage: imageData => {
    // add some image validation and refactor this out
    // this is an uncaught error at the min .. need to catch this error in route and return it
    if (!imageData) throw new Error('No image is provided');
    const imageID = uniqueIDGenerator();
    fileSystem.writeFileSync(
      `${envVariables.IMAGE_STORE_PATH}/${imageID}`,
      imageData,
    );
    return imageID;
  },
});
module.exports = ({ logger, fileSystemImageRetriever, imageTransformer }) => ({
  getImage: async (req, res) => {
    const requestedImageId = req.query.imageID;
    const desiredImageExtension = requestedImageId.split('.')[1];
    const imageId = requestedImageId.split('.')[0];
    let requestedImage;
    try {
      requestedImage = fileSystemImageRetriever.getImage(imageId);
      if (desiredImageExtension) {
        requestedImage = await imageTransformer.convertImage(
          requestedImage,
          desiredImageExtension,
        );
      }
      res.status(200).json(requestedImage);
    } catch (error) {
      logger.error(error.message);
      // TODO pass this error to next(error) and handle it in index;
      // chang this so it calculates the status 
      res.status(400).send(error.message);
    }
  },
});

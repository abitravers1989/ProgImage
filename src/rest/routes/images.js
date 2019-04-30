module.exports = ({
  logger,
  fileSystemImageRetriever,
  sharp,
  fileSystem,
  envVariables,
}) => ({
  getImage: (req, res) => {
    const requestedImage = req.query.imageID;
    const desiredImageExtension = requestedImage.split('.')[1];
    const imageId = requestedImage.split('.')[0];
    try {
      const returnImage = fileSystemImageRetriever.getImage(imageId);
      if (!desiredImageExtension) {
        return res.status(200).json(returnImage);
      }
      else {
        sharp(returnImage)
        .toFormat(desiredImageExtension)
        .toBuffer()
        .then(data => { 
          res.status(200).json(data)
        })
      }
    } catch (error) {
      logger.error(error.message);
      if (error.message.includes('ENOENT')) {
        return res
          .status(404)
          .send(
            'There is no image at the provided ID, please ensure it is correct.',
          );
      }
      return res.status(404).send(error.message);
      // return next(error);
    }
  },
});
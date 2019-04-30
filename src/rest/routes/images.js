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

    // let returnImage;
    let transformedImage;
    try {
      const returnImage = fileSystemImageRetriever.getImage(imageId);
      if (!desiredImageExtension) {
        return res.status(200).json(returnImage);
      }
      transformedImage = sharp(returnImage)
        .toFormat(desiredImageExtension)
        .toBuffer((error, data) => {
          if (error) logger.error(error);
          return data; // .options.input.buffer.data
        });
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
    fileSystem.writeFileSync(
      `${envVariables.IMAGESTOREPATH}/${imageId}.${desiredImageExtension}`,
      JSON.stringify(transformedImage.options.input.buffer),
    );
    // logger.info('Successfully returned image from ID:', imageID)
    return res.status(200).json(transformedImage.options.input.buffer);
  },
});

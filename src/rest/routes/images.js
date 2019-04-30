module.exports = ({ logger, fileSystemImageRetriever }) => ({
  getImage: async (req, res) => {
    const { imageID } = req.query;
    let returnImage;
    try {
      returnImage = await fileSystemImageRetriever.getImage(imageID);
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
    // logger.info('Successfully returned image from ID:', imageID)
    return res.status(200).json({ returnImage });
  },
});